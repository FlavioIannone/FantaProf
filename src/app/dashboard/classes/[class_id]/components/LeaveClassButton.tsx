"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { getQueryClient, queryKeys } from "@/lib/getQueryClient";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

const queryClient = getQueryClient();
export default function LeaveClassButton({ class_id }: { class_id: string }) {
  const { token, loading: tokenLoading } = useIdToken();
  const router = useRouter();
  const modal = useModal();
  const [loading, setLoading] = useState(false);

  const attemptToLeaveClass = async () => {
    setLoading(true);
    modal.setConfirmButtonDisabled(true);
    const res = await fetch(`/api/protected/classes/${class_id}/leave`, {
      method: "PUT",
      cache: "no-store",
      credentials: "include",
    });
    if (res.status === 200) {
      router.replace("/dashboard");
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.classes],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.globalStats],
        }),
      ]);
    }
    setLoading(false);
    modal.setConfirmButtonDisabled(false);
    if (!res.ok) {
      modal.setModal(true, {
        title: "Errore",
        content: "Si è verificato un errore durante l'operazione.",
      });
    }
  };

  if (tokenLoading) {
    return (
      <button
        className="d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1" // md:p-[var(--d-btn-p)] -> md:(default button padding)
        type="button"
        disabled
      >
        <p className="md:block hidden">Esci dalla classe</p>
        <i
          className="bi bi-box-arrow-right md:text-3xl text-2xl"
          aria-hidden
        ></i>
      </button>
    );
  }

  return (
    <button
      className={`d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1 ${
        loading && "animate-pulse"
      }`} // md:p-[var(--d-btn-p)] -> md:(default button padding)
      type="button"
      disabled={loading}
      onClick={() => {
        modal.setModal(true, {
          title: "Abbandonare la classe?",
          content: "Confermi di voler abbandonare la classe?",
          onConfirm: attemptToLeaveClass,
          confirmButtonText: "Conferma",
        });
      }}
    >
      <p className="md:block hidden">Esci dalla classe</p>
      <i className="bi bi-box-arrow-right md:text-3xl text-2xl" aria-hidden></i>
    </button>
  );
}
