"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { handleLogout } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const modal = useModal();
  const toast = useToast();

  return (
    <button
      type="button"
      className="text-xl not-hover:text-error flex items-center gap-1"
      onClick={async () => {
        modal.setModal(true, {
          title: "Effettuare il logout",
          content: "Confermi di voler effettuare il logout?",
          onConfirm: async () => {
            const res = await handleLogout();
            modal.setModal(false);
            if (!res) {
              toast.setToast(true, {
                content:
                  "Si è verificato un errore durante la procedura di logout.",
                toastType: "error",
              });
              return;
            }
            router.replace("/");
          },
          confirmButtonText: "Conferma",
          closeOnSubmit: false,
        });
      }}
      aria-label="Logout"
    >
      <i className="bi bi-box-arrow-right" aria-hidden />
      Logout
    </button>
  );
}
