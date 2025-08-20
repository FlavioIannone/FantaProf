"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { addClassAction } from "@/lib/data/classes.data-layer";
import { useRouter } from "next/navigation";

export default function AddClassButton() {
  // Modal context, provides methods to open/close modals
  const modal = useModal();
  const router = useRouter();

  // If user is logged in and token is available, show active button
  return (
    <button
      type="button"
      className="d-btn d-btn-primary sm:space-x-1"
      onClick={() => {
        // Open modal on button click
        modal.setModal(true, {
          title: "Crea classe",
          // Modal content is a separate component declared below
          content: <ModalBody />,
          closeOnSubmit: false,
          confirmButtonText: "Crea",
          onConfirm: async (formData) => {
            if (!formData) return;

            const className = formData.get("class_name")!.toString().trim();
            const initialCredits = formData
              .get("initial_credits")!
              .toString()
              .trim();
            if (className !== "" && initialCredits !== "") {
              const classData = await addClassAction({
                class_name: className,
                initial_credits: parseInt(initialCredits),
              });
              modal.setModal(false);
              if (classData) {
                router.push(
                  `/dashboard/classes/${classData.class_id}/overview`
                );
                return;
              }
              // TODO: Add toast message
            }
          },
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
