"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { startGameAction } from "@/lib/data/actions/classes.actions";
import { ClassData } from "@/lib/data/types.data";

export default function StartGameButton({
  classData,
}: {
  classData: ClassData;
}) {
  const toast = useToast();
  const modal = useModal();
  return (
    <button
      type="button"
      className="d-btn d-btn-primary d-btn-block"
      onClick={async () => {
        modal.setModal(true, {
          title: "Inizia la partita",
          content:
            "Sei sicuro di voler iniziare la partita? Questa azione non può essere annullata.",
          confirmButtonText: "Inizia partita",
          closeOnSubmit: false,
          onConfirm: async () => {
            const res = await startGameAction(classData.class_id);
            modal.setModal(false);
            if (res.status === 200) {
              toast.setToast(true, {
                content: "Partita iniziata con successo.",
                toastType: "success",
                overrideQueue: true,
              });
            } else {
              toast.setToast(true, {
                content: "Errore durante l'inizio della partita.",
                toastType: "error",
                overrideQueue: true,
              });
            }
          },
        });
      }}
      disabled={classData.game_started || classData.teachers === 0}
    >
      Inizia la partita
    </button>
  );
}
