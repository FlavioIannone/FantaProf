"use client";

// React and utility imports
import { useState, useRef, useEffect } from "react";
import { useModal } from "@/components/client/Modal/ModalContext";
import {
  modifyTeacherAction,
  deleteTeacherAction,
} from "@/lib/data/actions/teachers.actions";
import { TeacherRowType, ClassData } from "@/lib/data/types.data";
import { addTeacherToTeam } from "@/lib/data/actions/team.actions";
import { useToast } from "@/components/client/Toast/ToastContext";

type FilteredStudentEnrollmentData = {
  credits: number;
  admin: boolean;
};
export type TeacherDataEditForm = Partial<Omit<TeacherRowType, "teacher_id">>;

// Main component: Card for showing a teacher's info and managing actions
export default function TeacherCard({
  teacherData,
  studentEnrollment,
  classData,
  class_id,
}: {
  teacherData?: TeacherRowType;
  studentEnrollment?: FilteredStudentEnrollmentData;
  classData?: Pick<ClassData, "game_started" | "market_locked">;
  class_id?: string;
}) {
  const modal = useModal(); // Modal controls
  const toast = useToast();

  // State for truncating the description
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const descRef = useRef<HTMLParagraphElement>(null);

  // Check if description overflows and needs truncation
  useEffect(() => {
    const el = descRef.current;
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [teacherData?.description]);

  if (!teacherData || !studentEnrollment || !class_id || !classData) {
    return <Skeleton />;
  }

  // Open edit modal with pre-filled form
  const openEditModal = () => {
    modal.setModal(true, {
      title: "Modifica professore",
      confirmButtonText: "Modifica",
      content: (
        <TeacherEditForm
          initialData={teacherData}
          game_started={classData?.game_started}
          market_locked={classData?.market_locked}
        />
      ),
      closeOnSubmit: false,
      onConfirm: async (formData) => {
        if (!formData) return;
        const name = formData.get("teacher_name")! as string;
        const surname = formData.get("teacher_surname")! as string;
        const description = formData.get("teacher_description")! as string;
        const price = formData.get("teacher_price")! as string;

        if (
          name === "" &&
          surname === "" &&
          description === "" &&
          (!price || price === "")
        ) {
          modal.setModal(false);
          toast.setToast(true, {
            content: "Nessuna modifica da apportare",
            toastType: "info",
          });
          return;
        }

        const canModifyPrice = price !== "" && !classData.game_started;
        const newTeacherData: TeacherDataEditForm = {
          name: name === "" ? undefined : name.trim(),
          surname: surname === "" ? undefined : surname.trim(),
          description: description === "" ? undefined : description.trim(),
          price: canModifyPrice ? parseInt(price) : undefined,
        };

        const res = await modifyTeacherAction(
          class_id,
          teacherData.teacher_id,
          newTeacherData
        );
        modal.setModal(false);
        if (res.status !== 200) {
          toast.setToast(true, {
            content: `Errore durante la modifica dei dati del professore.`,
            toastType: "error",
          });
          return;
        }
        toast.setToast(true, {
          content: `Dati del prof ${teacherData.name} ${teacherData.surname} modificati con successo.`,
          toastType: "success",
        });
      },
    });
  };

  return (
    <div className="d-join-item p-0">
      <div className="d-card-body">
        {/* Header: Avatar + name + price */}
        <div className="flex gap-3 items-center">
          <div className="d-avatar rounded-full size-max">
            <span className="size-24 lg:size-32 md:size-28 flex items-center justify-center bg-base-300 rounded-full text-4xl lg:text-5xl">
              {teacherData.name.charAt(0) + teacherData.surname.charAt(0)}
            </span>
          </div>
          <div className="flex-1 max-w-full">
            <h2 className="font-bold text-2xl lg:text-3xl">
              {teacherData.name} {teacherData.surname}
            </h2>
            <h4 className="opacity-70">Costo: {teacherData.price} crediti</h4>
          </div>
        </div>

        {/* Description with show more/less */}
        <div className="flex flex-col items-end">
          <p
            ref={descRef}
            className={`opacity-70 text-xl lg:text-2xl w-full break-words ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {teacherData.description}
          </p>
          {isTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm mt-1 d-link  "
            >
              {expanded ? "Mostra meno" : "Mostra di più"}
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-1.5">
          <button
            className="d-btn d-btn-primary flex-1"
            onClick={async () => {
              modal.setModal(true, {
                title: "Aggiungere il professore al team?",
                content: `Vuoi davvero aggiungere il prof ${teacherData.name} ${teacherData.surname} al tuo team?`,
                confirmButtonText: "Aggiungi",
                closeOnSubmit: false,
                onConfirm: async () => {
                  const res = await addTeacherToTeam(
                    class_id,
                    teacherData.teacher_id
                  );
                  modal.setModal(false);
                  if (res.status === 200) {
                    toast.setToast(true, {
                      content: `Il prof ${teacherData.name} ${
                        teacherData.surname
                      } è stato aggiunto con successo al team${
                        res.data!.isCaptain ? " come capitano" : ""
                      }.`,
                      toastType: "success",
                    });

                    return;
                  }
                  if (res.status === 409) {
                    toast.setToast(true, {
                      content: `Il prof ${teacherData.name} ${teacherData.surname} fa già parte del team.`,
                      toastType: "warning",
                    });
                    return;
                  }
                  if (res.status === 402) {
                    toast.setToast(true, {
                      content: `Non hai abbastanza crediti per aggiungere il prof ${teacherData.name} ${teacherData.surname} al team.`,
                      toastType: "warning",
                    });
                    return;
                  }
                  toast.setToast(true, {
                    content: `Non è stato possibile aggiungere il prof ${teacherData.name} ${teacherData.surname} al team.`,
                    toastType: "error",
                  });
                },
              });
            }}
          >
            Compra
          </button>

          {/* Admin dropdown: edit/delete */}
          {studentEnrollment.admin && (
            <div className="d-dropdown d-dropdown-top d-dropdown-end">
              <button
                tabIndex={0}
                className="d-btn d-btn-outline d-btn-primary  "
              >
                ...
              </button>
              <ul className="d-dropdown-content d-menu bg-base-100 rounded-box w-52 p-2 shadow-sm mb-2 space-y-2">
                <li>
                  <button onClick={openEditModal}>
                    Modifica <i className="bi bi-pencil" aria-hidden />
                  </button>
                </li>
                <li>
                  <button
                    className="bg-error text-error-content font-bold  "
                    onClick={() => {
                      modal.setModal(true, {
                        title: "Eliminare il professore?",
                        content:
                          "Confermi di voler eliminare questo professore?",
                        confirmButtonText: "Conferma",
                        closeOnSubmit: false,
                        onConfirm: async () => {
                          const res = await deleteTeacherAction(
                            class_id,
                            teacherData.teacher_id
                          );
                          modal.setModal(false);
                          if (res.status !== 200) {
                            toast.setToast(true, {
                              content: `Errore durante l'eliminazione del prof ${teacherData.name} ${teacherData.surname}.`,
                              toastType: "error",
                            });
                            return;
                          }
                          toast.setToast(true, {
                            content: `Prof ${teacherData.name} ${teacherData.surname} eliminato con successo.`,
                            toastType: "success",
                          });
                        },
                      });
                    }}
                  >
                    Elimina <i className="bi bi-trash3" aria-hidden />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inner component: Modal content for editing a teacher
function TeacherEditForm({
  initialData,
  game_started,
  market_locked,
}: {
  initialData: TeacherRowType;
  game_started: boolean;
  market_locked: boolean;
}) {
  return (
    <fieldset className="space-y-3">
      <div>
        <legend className="d-fieldset-legend">Nome</legend>
        <input
          className="d-input w-full"
          name="teacher_name"
          placeholder={initialData.name}
        />
      </div>
      <div>
        <legend className="d-fieldset-legend">Cognome</legend>
        <input
          className="d-input w-full"
          name="teacher_surname"
          placeholder={initialData.surname}
        />
      </div>
      <div>
        <legend className="d-fieldset-legend">Descrizione</legend>
        <textarea
          className="d-textarea w-full h-14"
          name="teacher_description"
          placeholder={initialData.description}
        />
        <div className="d-label">Facoltativo</div>
      </div>
      <div>
        <legend className="d-fieldset-legend">Prezzo</legend>
        <input
          className="d-input w-full"
          name="teacher_price"
          placeholder={initialData.price.toString()}
          type="number"
          disabled={game_started}
        />
        {game_started && (
          <p className="d-label max-w-full text-wrap">
            <i
              className="bi bi-info bg-info text-info-content rounded-full p-2 size-7 text-lg flex items-center justify-center"
              aria-hidden
            ></i>
            Impossibile modificare il prezzo dopo che la partita è iniziata.
          </p>
        )}
      </div>
    </fieldset>
  );
}

function Skeleton() {
  return (
    <div className="lg:d-card-lg d-rounded-box bg-base-200 md:d-card-md d-card-md shadow-sm p-0">
      <div className="d-card-body">
        <div className="flex gap-3 flex-row items-center">
          <div className="d-avatar rounded-full size-max d-skeleton">
            <span className="lg:size-32 md:size-28 size-24 lg:text-5xl text-4xl rounded-full flex items-center justify-center d-skeleton">
              <p className="invisible">O</p>
            </span>
          </div>

          <div className="flex flex-col justify-between w-full gap-2">
            <h2 className="d-skeleton w-full h-7"></h2>
            <h4 className="d-skeleton w-2/3 h-5"></h4>
          </div>
        </div>
        <p className="w-full h-15 grid grid-rows-3 grid-cols-5 gap-1">
          <span className="col-span-1 d-skeleton"></span>
          <span className="col-span-4 d-skeleton"></span>
          {/*  */}
          <span className="col-span-3 d-skeleton"></span>
          <span className="col-span-2 d-skeleton"></span>
          {/*  */}
          <span className="col-span-1 d-skeleton"></span>
          <span className="col-span-4 d-skeleton"></span>
        </p>
        <button className="d-btn mt-2 d-skeleton" disabled>
          <p className="invisible">Compra</p>
        </button>
      </div>
    </div>
  );
}
