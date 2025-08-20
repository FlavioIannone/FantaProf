"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { addTeacherAction } from "@/lib/data/teachers.data-layer";
import { FilteredStudentEnrollmentData } from "@/lib/data/types.data-layer";
import { TeacherDataInput } from "@/lib/types";

export default function TeachersTableHeader({
  enrollmentData,
  class_id,
}: {
  enrollmentData?: FilteredStudentEnrollmentData | undefined;
  class_id?: string | undefined;
}) {
  const modal = useModal();

  if (!enrollmentData || !class_id) {
    return (
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Professori
        </h1>
      </div>
    );
  }

  const onConfirm = async (formData?: FormData) => {
    if (!formData) return;

    const name = formData.get("teacher_name")! as string;
    const surname = formData.get("teacher_surname")! as string;
    const description = formData.get("teacher_description")! as string;
    const price = formData.get("teacher_price")! as string;

    if (name === "" || surname === "" || price === "") {
      modal.setModal(false);
      return;
    }
    const teacherData: TeacherDataInput = {
      name: name.trim(),
      surname: surname.trim(),
      description: description.trim(),
      price: parseInt(price),
    };
    await addTeacherAction(class_id, teacherData);
    modal.setModal(false);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-3xl font-extrabold">
        <span className="bi bi-backpack3 me-2" aria-hidden></span>
        Professori
      </h1>
      {enrollmentData.admin && (
        <button
          type="button"
          className="d-btn d-btn-primary"
          onClick={() => {
            modal.setModal(true, {
              title: "Aggiungi un nuovo professore",
              content: <ModalBody />,
              closeOnSubmit: false,
              onConfirm: onConfirm,
              confirmButtonText: "Aggiungi",
            });
          }}
        >
          <p className="md:block sm:hidden hidden">Aggiungi</p>
          <i className="bi bi-plus-circle" aria-hidden></i>
        </button>
      )}
    </div>
  );
}

const ModalBody = () => {
  return (
    <div>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            name="teacher_name"
            className="d-input w-full peer d-validator"
            placeholder="Mario"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Nome non valido
          </div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            name="teacher_surname"
            className="d-input w-full peer d-validator"
            placeholder="Rossi"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Cognome non valido
          </div>
        </div>
        <div className="flex flex-col">
          <legend className="d-fieldset-legend">Descrizione</legend>
          <textarea
            name="teacher_description"
            className="d-textarea h-24 w-full"
            placeholder="Professore puzzolente"
          ></textarea>
          <div className="d-label">Facoltativo</div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Prezzo</legend>
          <input
            type="number"
            name="teacher_price"
            className="d-input w-full d-validator peer"
            placeholder="10"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Prezzo non valido
          </div>
        </div>
      </fieldset>
    </div>
  );
};
