"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { deleteSession } from "@/lib/data/session/session-manager.data-layer";
import { client_auth } from "@/lib/firebase-connection.client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const modal = useModal();
  const toast = useToast();

  const handleLogout = async () => {
    // Delete the session
    const sessionDeletionRes = await deleteSession();
    try {
      if (sessionDeletionRes) {
        // Sign out from Firebase client
        await client_auth.signOut();
        router.replace("/");
      }
      modal.setModal(false);
    } catch (error) {
      toast.setToast(true, {
        content: "Si è verificato un errore durante la procedura di logout.",
        toastType: "error",
      });
    }
  };

  return (
    <button
      type="button"
      className="text-xl not-hover:text-error flex items-center gap-1"
      onClick={async () => {
        modal.setModal(true, {
          title: "Effettuare il logout",
          content: "Confermi di voler effettuare il logout?",
          onConfirm: handleLogout,
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
