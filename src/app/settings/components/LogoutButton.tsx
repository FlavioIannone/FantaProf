"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { deleteSession } from "@/lib/data/session/session-manager.data-layer";
import { client_auth } from "@/lib/firebase-connection";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const modal = useModal();

  const handleLogout = async () => {
    // Delete the session
    const sessionDeletionRes = await deleteSession();
    try {
      if (sessionDeletionRes) {
        // Sign out from Firebase client
        await client_auth.signOut();
        router.replace("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      modal.setModal(true, {
        title: "Errore durante il logout",
        content: "Si è verificato un errore durante la procedura di logout",
      });
    }
  };

  return (
    <button
      type="button"
      className="text-xl not-hover:text-error flex items-center gap-1"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <i className="bi bi-box-arrow-right" aria-hidden="true" />
      Logout
    </button>
  );
}
