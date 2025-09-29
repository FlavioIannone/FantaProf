"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { addTeacherAction } from "@/lib/data/actions/teachers.actions";
import { TeacherDataInput } from "@/lib/types";

type FilteredStudentEnrollmentData = {
  credits: number;
  admin: boolean;
};

export default function TeachersTableHeader({
  enrollmentData,
  class_id,
}: {
  enrollmentData: FilteredStudentEnrollmentData;
  class_id: string;
}) {
  const modal = useModal();
  const toast = useToast();

  const onConfirm = async (formData?: FormData) => {
    if (!formData) return;

    const name = formData.get("teacher_name")!.toString();
    const surname = formData.get("teacher_surname")!.toString();
    const description = formData.get("teacher_description")!.toString();
    const price = formData.get("teacher_price")!.toString();

    if (name === "" || surname === "" || price === "") {
      return;
    }
    const teacherData: TeacherDataInput = {
      name: name.trim(),
      surname: surname.trim(),
      description: description.trim(),
      price: parseInt(price),
    };
    const res = await addTeacherAction(class_id, teacherData);
    modal.setModal(false);
    if (res.status === 200) {
      toast.setToast(true, {
        content: `Prof ${name} ${surname} aggiunto con successo.`,
        toastType: "success",
        overrideQueue: true,
      });
      return;
    }
    if (res.status === 400) {
      toast.setToast(true, {
        content: `Il prezzo del professor ${name} ${surname} supera il limite massimo di crediti impostato per la classe.`,
        toastType: "warning",
        overrideQueue: true,
      });
      return;
    }
    toast.setToast(true, {
      content: `Errore durante l'aggiunta del professore.`,
      toastType: "error",
      overrideQueue: true,
    });
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
          className="d-btn d-btn-primary  "
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
    <>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome professore</legend>
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
          <legend className="d-fieldset-legend">Cognome professore</legend>
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
    </>
  );
};
