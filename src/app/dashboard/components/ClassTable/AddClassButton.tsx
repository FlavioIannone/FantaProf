"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { addClassAction } from "@/lib/data/actions/classes.actions";
import { useRouter } from "next/navigation";

export default function AddClassButton() {
  const modal = useModal();
  const toast = useToast();
  const router = useRouter();

  const handleAddClass = async (formData?: FormData) => {
    if (!formData) {
      toast.setToast(true, {
        content: "I dati inseriti non sono validi.",
        toastType: "warning",
      });
      return;
    }

    const className = formData.get("class_name")!.toString().trim();
    const initialCredits = formData.get("initial_credits")!.toString().trim();
    if (className === "" && initialCredits === "") {
      toast.setToast(true, {
        content: "I dati inseriti non sono validi.",
        toastType: "warning",
      });
      return;
    }

    const res = await addClassAction({
      class_name: className,
      initial_credits: parseInt(initialCredits),
    });
    modal.setModal(false);
    if (res.status !== 200) {
      toast.setToast(true, {
        content: "Errore durante la creazione della classe.",
        toastType: "error",
      });
      return;
    }
    toast.setToast(true, {
      content: "Classe aggiunta con successo.",
      toastType: "success",
    });
    router.push(`/dashboard/classes/${res.data!.class_id}/overview`);
  };

  return (
    <button
      type="button"
      className="d-btn d-btn-primary sm:space-x-1"
      onClick={() => {
        // Open modal on button click
        modal.setModal(true, {
          title: "Crea classe",
          content: <ModalBody />,
          closeOnSubmit: false,
          confirmButtonText: "Crea",
          onConfirm: handleAddClass,
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
