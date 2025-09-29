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
        overrideQueue: true,
      });
      return;
    }

    const className = formData.get("class_name")!.toString().trim();
    const initialCredits = formData.get("initial_credits")!.toString().trim();
    const antiCheatFormValue = formData.get("anti_cheat");
    const antiCheatValue =
      antiCheatFormValue === "on" || antiCheatFormValue === "true";

    if (className === "" && initialCredits === "") {
      toast.setToast(true, {
        content: "I dati inseriti non sono validi.",
        toastType: "warning",
        overrideQueue: true,
      });
      return;
    }

    const res = await addClassAction({
      class_name: className,
      initial_credits: parseInt(initialCredits),
      use_anti_cheat: antiCheatValue,
    });
    modal.setModal(false);
    if (res.status !== 200) {
      toast.setToast(true, {
        content: "Errore durante la creazione della classe.",
        toastType: "error",
        overrideQueue: true,
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
    <>
      <fieldset className="d-fieldset">
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
      </fieldset>
      <fieldset className="d-fieldset">
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
      </fieldset>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">
          Attiva anti-cheat (Consigliato)
          <span className="d-badge d-badge-primary animate-pulse motion-reduce:animate-none">
            New
          </span>
        </legend>
        <input
          type="checkbox"
          className="d-toggle d-toggle-primary"
          name="anti_cheat"
          defaultChecked
        />
        <p className="d-label max-w-full text-wrap">
          Abilitando questa opzione, gli studenti non potranno modificare i
          crediti iniziali della classe e i costi dei professori una volta
          iniziato il gioco.
        </p>
      </fieldset>
    </>
  );
};
