"use client";

// React and utility imports
import { useState, useRef, useEffect } from "react";
import { useModal } from "@/components/client/Modal/ModalContext";
import { TeacherTableRowType } from "@/lib/data/types.data-layer";
import {
  TeacherDataEditForm,
  modifyTeacherAction,
  deleteTeacherAction,
} from "@/lib/data/teachers.data-layer";

// Inner component: Modal content for editing a teacher
function TeacherEditForm({
  initialData,
}: {
  initialData: TeacherTableRowType;
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
          className="d-textarea w-full h-24"
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
        />
      </div>
    </fieldset>
  );
}

// Main component: Card for showing a teacher's info and managing actions
export default function TeacherCard({
  teacherData,
  isAdmin,
  class_id,
}: {
  teacherData: TeacherTableRowType;
  isAdmin: boolean;
  class_id: string;
}) {
  const { setModal } = useModal(); // Modal controls

  // State for truncating the description
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const descRef = useRef<HTMLParagraphElement>(null);

  // Check if description overflows and needs truncation
  useEffect(() => {
    const el = descRef.current;
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [teacherData.description]);

  // Open edit modal with pre-filled form
  const openEditModal = () => {
    setModal(true, {
      title: "Modifica professore",
      confirmButtonText: "Modifica",
      content: <TeacherEditForm initialData={teacherData} />,
      closeOnSubmit: false,
      onConfirm: async (formData) => {
        if (!formData) return;
        const name = formData.get("teacher_name")! as string;
        const surname = formData.get("teacher_surname")! as string;
        const description = formData.get("teacher_description")! as string;
        const price = formData.get("teacher_price")! as string;

        const newTeacherData: TeacherDataEditForm = {
          name: name === "" ? undefined : name.trim(),
          surname: surname === "" ? undefined : surname.trim(),
          description: description === "" ? undefined : description.trim(),
          price: price === "" ? undefined : parseInt(price),
        };

        await modifyTeacherAction(
          class_id,
          teacherData.teacher_id,
          newTeacherData
        );
        setModal(false);
      },
    });
  };

  return (
    <div className="d-card-md bg-base-200 shadow-sm p-0">
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
              className="text-sm mt-1 d-link"
            >
              {expanded ? "Mostra meno" : "Mostra di più"}
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-1.5">
          <button className="d-btn d-btn-primary flex-1">Compra</button>

          {/* Admin dropdown: edit/delete */}
          {isAdmin && (
            <div className="d-dropdown d-dropdown-top d-dropdown-end">
              <button
                tabIndex={0}
                className="d-btn d-btn-outline d-btn-primary"
              >
                ...
              </button>
              <ul className="d-dropdown-content d-menu bg-base-100 rounded-box w-52 p-2 shadow-sm mb-2 space-y-2">
                <li>
                  <button onClick={openEditModal}>
                    Modifica <i className="bi bi-pencil" />
                  </button>
                </li>
                <li>
                  <button
                    className="bg-error text-error-content font-bold"
                    onClick={() => {
                      setModal(true, {
                        title: "Eliminare il professore?",
                        content:
                          "Confermi di voler eliminare questo professore?",
                        confirmButtonText: "Conferma",
                        closeOnSubmit: false,
                        onConfirm: async () => {
                          await deleteTeacherAction(
                            class_id,
                            teacherData.teacher_id
                          );
                          setModal(false);
                        },
                      });
                    }}
                  >
                    Elimina <i className="bi bi-trash3" />
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
