"use client";

import {
  ModalContextType,
  ModalProps,
  useModal,
} from "@/components/client/Modal/ModalContext";
import { addClassAction } from "@/lib/data/classes/classes.data";
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
          content: <ModalBody />,
          confirmButtonText: "Crea",
          action: async (formData) => {
            const className = formData.get("class_name")!.toString();
            const initialCredits = formData.get("initial_credits")!.toString();
            if (className !== "" && initialCredits !== "") {
              addClassAction({
                class_name: className,
                initial_credits: parseInt(initialCredits),
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
const ModalBody = () => {
  return (
    <fieldset className="d-fieldset">
      <div>
        <legend className="d-fieldset-legend">Nome classe</legend>
        <input
          type="text"
          className="d-input w-full peer d-validator"
          placeholder="Es. 3BINF"
          name="class_name"
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
          name="initial_credits"
          required
        />
        <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
          Crediti non validi
        </div>
      </div>
    </fieldset>
  );
};
