"use client";

import {
  ModalContextType,
  ModalProps,
  useModal,
} from "@/components/client/Modal/ModalContext";
import { getQueryClient, queryKeys } from "@/lib/getQueryClient";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { RefObject, useEffect, useRef, useState } from "react";

// Type for form data used in class creation
type FormClassData = {
  class_name: string;
  initial_credits: number;
};

// Get a query client instance for cache invalidation
const query = getQueryClient();

export default function AddClassButton() {
  // Modal context, provides methods to open/close modals
  const modal = useModal();

  // Get auth token and loading state from a custom hook
  const { token, loading } = useIdToken();

  // Refs for input fields inside the modal
  const classNameRef = useRef<HTMLInputElement | null>(null);
  const initialCreditsRef = useRef<HTMLInputElement | null>(null);

  // Clears inputs in the modal when called
  const clearInput = () => {
    if (classNameRef.current) classNameRef.current.value = "";
    if (initialCreditsRef.current) initialCreditsRef.current.value = "";
  };

  // Function to create a new class by calling the API
  const createClass = async (classData: FormClassData) => {
    modal.setConfirmButtonDisabled(true);
    try {
      // Simple validation: class name can't be empty, credits must not be -1 (invalid)
      if (classData.class_name === "" || classData.initial_credits === -1) {
        return false;
      }

      // POST request to create class
      const res = await fetch("/api/protected/classes", {
        method: "POST",
        cache: "no-store", // No cache to always get fresh data
        headers: {
          Authorization: `Bearer ${token!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });

      if (!res.ok) {
        // If server returns error, throw to trigger catch block
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      // On error, show modal with retry option
      modal.setModal(true, {
        title: "Errore",
        content: "Errore durante la creazione della classe.",
        confirmButtonText: "Riprova",
        onConfirm: () => createClass(classData),
      });
    } finally {
      // Always clear inputs and invalidate related queries to refresh data
      clearInput();
      await Promise.all([
        query.invalidateQueries({ queryKey: [queryKeys.classes] }),
        query.invalidateQueries({ queryKey: [queryKeys.globalStats] }),
        query.invalidateQueries({ queryKey: [queryKeys.members] }),
      ]);
    }
    modal.setConfirmButtonDisabled(false);
  };

  // While loading token, show disabled button with loading animation
  if (loading) {
    return (
      <button
        type="button"
        className="d-btn d-btn-primary sm:space-x-1 animate-pulse"
        disabled
        aria-disabled
      >
        <i className="bi bi-plus-circle" aria-hidden></i>
        <p className="w-max sm:block hidden">Crea classe</p>
      </button>
    );
  }

  // If no token (not logged in), show disabled button
  if (!token) {
    return (
      <button
        type="button"
        className="d-btn d-btn-primary sm:space-x-1"
        disabled
        aria-disabled
      >
        <i className="bi bi-plus-circle" aria-hidden></i>
        <p className="w-max sm:block hidden">Crea classe</p>
      </button>
    );
  }

  // If user is logged in and token is available, show active button
  return (
    <button
      type="button"
      className="d-btn d-btn-primary sm:space-x-1"
      onClick={() => {
        // Open modal on button click
        modal.setModal(true, {
          title: "Crea classe",
          // Modal content is a separate component declared below
          content: (
            <ModalBody
              classNameRef={classNameRef}
              initialCreditsRef={initialCreditsRef}
            />
          ),
          confirmButtonText: "Crea",
          onConfirm: () => {
            // On confirm, read values from refs and call createClass
            if (classNameRef.current && initialCreditsRef.current) {
              createClass({
                class_name: classNameRef.current.value.trim(),
                initial_credits: parseInt(
                  initialCreditsRef.current.value === ""
                    ? "-1"
                    : initialCreditsRef.current.value
                ),
              });
            }
          },
        });
      }}
    >
      <i className="bi bi-plus-circle" aria-hidden></i>
      <p className="w-max sm:block hidden">Crea classe</p>
    </button>
  );
}

// Separate component for the modal's content form fields
const ModalBody = ({
  classNameRef,
  initialCreditsRef,
}: {
  classNameRef: RefObject<HTMLInputElement | null>;
  initialCreditsRef: RefObject<HTMLInputElement | null>;
}) => {
  // Reset input values whenever this component mounts or updates
  useEffect(() => {
    if (classNameRef.current) classNameRef.current.value = "";
    if (initialCreditsRef.current) initialCreditsRef.current.value = "";
  });

  return (
    <div>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            className="d-input w-full peer d-validator"
            placeholder="Es. 3BINF"
            ref={classNameRef}
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Nome non valido
          </div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Crediti iniziali</legend>
          <input
            type="number"
            className="d-input w-full peer d-validator"
            placeholder="10"
            ref={initialCreditsRef}
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Crediti non validi
          </div>
        </div>
      </fieldset>
    </div>
  );
};
