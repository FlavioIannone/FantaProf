"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { leaveClassAction } from "@/lib/data/actions/classes.actions";
import { WriteOperationResult } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeaveClassButton({ class_id }: { class_id: string }) {
  const router = useRouter();
  const modal = useModal();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleWriteOperationResult = (res: WriteOperationResult) => {
    if (res.status === 200) {
      router.replace("/dashboard");
      toast.setToast(true, {
        content: "Classe abbandonata con successo.",
        toastType: "success",
      });
      return;
    }
    if (res.status === 404) {
      toast.setToast(true, {
        content: "La classe non è più esistente.",
        toastType: "error",
      });
    } else if (res.status === 409) {
      toast.setToast(true, {
        content:
          "Impossibile abbandonare la classe: sei l’unico amministratore. Assegna il ruolo di admin a un altro membro o fai abbandonare la classe agli altri membri prima di riprovare.",
        toastType: "warning",
        toastDuration: 8,
      });
    } else {
      toast.setToast(true, {
        content: "Si è verificato un errore.",
        toastType: "error",
      });
    }
  };

  return (
    <button
      className="d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1  " // md:p-[var(--d-btn-p)] -> md:(default button padding)
      type="button"
      disabled={isLoading}
      onClick={() => {
        modal.setModal(true, {
          title: "Abbandonare la classe?",
          content: "Confermi di voler abbandonare la classe?",
          closeOnSubmit: false,
          onConfirm: async () => {
            setIsLoading(true);
            const res = await leaveClassAction(class_id);
            modal.setModal(false);
            handleWriteOperationResult(res);
            setIsLoading(false);
          },
          confirmButtonText: "Conferma",
        });
      }}
    >
      <p className="md:block hidden">Esci dalla classe</p>
      <i className="bi bi-box-arrow-right md:text-3xl text-2xl" aria-hidden></i>
    </button>
  );
}
