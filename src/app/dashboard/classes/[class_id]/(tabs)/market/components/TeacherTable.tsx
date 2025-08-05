"use client";

import {
  getClassTeachers,
  getStudentEnrollmentData,
} from "@/lib/data/handlers";
import TeacherCard from "./TeacherCard";
import { getQueryClient, queryKeys } from "@/lib/getQueryClient";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useEffect, useRef } from "react";
import { useModal } from "@/components/client/Modal/ModalContext";
import TeacherTableSkeleton from "./TeacherTableSkeleton";

const queryClient = getQueryClient();

export default function TeacherTable({ class_id }: { class_id: string }) {
  const { token, loading: tokenLoading } = useIdToken();
  const modal = useModal();
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const {
    data: rows,
    isLoading: rowsLoading,
    isFetching: rowsFetching,
    isError: rowsError,
  } = useQuery({
    queryKey: [queryKeys.classTeachers, class_id],
    enabled: token !== null,
    queryFn: async () => await getClassTeachers(token!, class_id),
  });

  const clearInput = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (surnameRef.current) surnameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
  };

  const { data: enrollmentData, isLoading: enrollmentLoading } = useQuery({
    queryKey: [queryKeys.studentEnrollment, class_id],
    enabled: token !== null,
    queryFn: async () => await getStudentEnrollmentData(token!, class_id),
  });

  if (
    rowsLoading ||
    tokenLoading ||
    rowsFetching ||
    !enrollmentData ||
    enrollmentLoading
  ) {
    return <TeacherTableSkeleton />;
  }

  if (rowsError) {
    return <div>Error</div>;
  }

  const addTeacher = async (data: {
    name: string;
    surname: string;
    description: string | undefined;
    price: number;
  }) => {
    try {
      const res = await fetch(`/api/protected/classes/${class_id}/teachers`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      modal.setModal(true, {
        title: "Errore",
        content: "Errore durante la creazione della classe.",
        confirmButtonText: "Riprova",
        onConfirm: () => addTeacher(data),
      });
    } finally {
      clearInput();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.classData] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.classTeachers] }),
      ]);
    }
  };

  // UI returned in case there is no data
  const noDataUI = (
    <div className="flex flex-col justify-center items-center">
      <i className="size-24" aria-disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle text-error size-full"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </i>
      <p className="text-lg opacity-70">
        Nessun professore aggiunto in questa classe
      </p>
    </div>
  );

  if (rows?.length === 0) return noDataUI;

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Professori
        </h1>
        {enrollmentData?.admin! && (
          <button
            type="button"
            className="d-btn d-btn-primary"
            onClick={() => {
              modal.setModal(true, {
                title: "Aggiungi un nuovo professore",
                content: (
                  <ModalBody
                    nameRef={nameRef}
                    surnameRef={surnameRef}
                    descriptionRef={descriptionRef}
                    priceRef={priceRef}
                  />
                ),
                onConfirm: async () => {
                  const name = nameRef.current?.value;
                  const surname = surnameRef.current?.value;
                  const description = descriptionRef.current?.value;
                  const price = priceRef.current?.value;

                  if (
                    name === "" ||
                    !name ||
                    surname === "" ||
                    !surname ||
                    price === "" ||
                    !price
                  ) {
                    return false;
                  }
                  const data = {
                    name,
                    surname,
                    description,
                    price: parseInt(price),
                  };
                  return await addTeacher(data);
                },
                confirmButtonText: "Aggiungi",
              });
            }}
          >
            <p className="md:block sm:hidden hidden">Aggiungi</p>
            <i className="bi bi-plus-circle" aria-hidden></i>
          </button>
        )}
      </div>
      <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2.5">
        {rows?.map((row) => {
          return (
            <TeacherCard
              class_id={class_id}
              teacherData={row}
              isAdmin={enrollmentData.admin}
              key={row.teacher_id}
            />
          );
        })}
      </div>
    </>
  );
}

const ModalBody = ({
  nameRef,
  surnameRef,
  descriptionRef,
  priceRef,
}: {
  nameRef: RefObject<HTMLInputElement | null>;
  surnameRef: RefObject<HTMLInputElement | null>;
  descriptionRef: RefObject<HTMLTextAreaElement | null>;
  priceRef: RefObject<HTMLInputElement | null>;
}) => {
  useEffect(() => {
    if (nameRef.current) nameRef.current.value = "";
    if (surnameRef.current) surnameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
  });
  return (
    <div>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            className="d-input w-full peer d-validator"
            placeholder="Mario"
            ref={nameRef}
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Nome non valido
          </div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            className="d-input w-full peer d-validator"
            placeholder="Rossi"
            ref={surnameRef}
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Cognome non valido
          </div>
        </div>
        <div className="flex flex-col">
          <legend className="d-fieldset-legend">Descrizione</legend>
          <textarea
            ref={descriptionRef}
            className="d-textarea h-24 w-full"
            placeholder="Professore puzzolente"
          ></textarea>
          <div className="d-label">Facoltativo</div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Prezzo</legend>
          <input
            type="number"
            className="d-input w-full d-validator peer"
            placeholder="10"
            ref={priceRef}
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Prezzo non valido
          </div>
        </div>
      </fieldset>
    </div>
  );
};
