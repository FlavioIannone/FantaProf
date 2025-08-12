"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { leaveClassAction } from "@/lib/data/classes.data-layer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeaveClassButton({ class_id }: { class_id: string }) {
  const router = useRouter();
  const modal = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <button
      className={`d-btn d-btn-ghost text-error md:p-[var(--d-btn-p)] p-0 px-1`} // md:p-[var(--d-btn-p)] -> md:(default button padding)
      type="button"
      disabled={loading}
      onClick={() => {
        modal.setModal(true, {
          title: "Abbandonare la classe?",
          content: "Confermi di voler abbandonare la classe?",
          closeOnSubmit: false,
          onConfirm: async () => {
            setLoading(true);
            await leaveClassAction(class_id);
            modal.setModal(false);
            router.replace("/dashboard");
            setLoading(false);
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
