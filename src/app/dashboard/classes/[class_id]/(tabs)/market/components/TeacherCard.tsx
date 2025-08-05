"use client";

// React and utility imports
import { useState, useRef, useEffect } from "react";
import { useModal } from "@/components/client/Modal/ModalContext";
import { TeacherTableRowType } from "@/app/dashboard/(queryHandlers)/handlers";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { getQueryClient, queryKeys } from "@/lib/getQueryClient";

// Set up the query client instance
const queryClient = getQueryClient();

// Inner component: Modal content for editing a teacher
function TeacherEditForm({
  initialData,
  refs,
}: {
  initialData: TeacherTableRowType;
  refs: {
    nameRef: React.RefObject<HTMLInputElement | null>;
    surnameRef: React.RefObject<HTMLInputElement | null>;
    descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
    priceRef: React.RefObject<HTMLInputElement | null>;
  };
}) {
  return (
    <fieldset className="space-y-3">
      <div>
        <legend className="d-fieldset-legend">Nome</legend>
        <input
          className="d-input w-full"
          placeholder={initialData.name}
          ref={refs.nameRef}
        />
      </div>
      <div>
        <legend className="d-fieldset-legend">Cognome</legend>
        <input
          className="d-input w-full"
          placeholder={initialData.surname}
          ref={refs.surnameRef}
        />
      </div>
      <div>
        <legend className="d-fieldset-legend">Descrizione</legend>
        <textarea
          className="d-textarea w-full h-24"
          placeholder={initialData.description}
          ref={refs.descriptionRef}
        />
        <div className="d-label">Facoltativo</div>
      </div>
      <div>
        <legend className="d-fieldset-legend">Prezzo</legend>
        <input
          className="d-input w-full"
          placeholder={initialData.price.toString()}
          type="number"
          ref={refs.priceRef}
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
  const { token } = useIdToken(); // Auth token for API requests
  const { setModal, setConfirmButtonDisabled } = useModal(); // Modal controls

  // State for truncating the description
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  // Refs for editable input fields
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Check if description overflows and needs truncation
  useEffect(() => {
    const el = descRef.current;
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [teacherData.description]);

  // Refresh teacher-related queries
  const refreshQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [queryKeys.classData] }),
      queryClient.invalidateQueries({ queryKey: [queryKeys.classTeachers] }),
    ]);
  };

  // Delete teacher API call
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/protected/classes/${class_id}/teachers/${teacherData.teacher_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token!}` },
        }
      );

      if (res.status === 404) {
        setModal(true, {
          title: "Errore",
          content: "Il professore specificato non fa parte della classe",
        });
      }
    } catch {
      setModal(true, {
        title: "Errore",
        content: "Errore durante la rimozione dei dati",
        onConfirm: handleDelete,
        confirmButtonText: "Riprova",
      });
    } finally {
      refreshQueries();
    }
  };

  // Update teacher API call
  const handleUpdate = async (data: Partial<TeacherTableRowType>) => {
    try {
      const res = await fetch(
        `/api/protected/classes/${class_id}/teachers/${teacherData.teacher_id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token!}` },
          body: JSON.stringify(data),
        }
      );

      if (res.status === 404) {
        setModal(true, {
          title: "Errore",
          content: "Il professore specificato non fa parte della classe",
        });
      }
    } catch {
      setModal(true, {
        title: "Errore",
        content: "Errore durante la modifica dei dati",
        onConfirm: () => handleUpdate(data),
        confirmButtonText: "Riprova",
      });
    } finally {
      refreshQueries();
    }
  };

  // Open edit modal with pre-filled form
  const openEditModal = () => {
    setModal(true, {
      title: "Modifica professore",
      confirmButtonText: "Modifica",
      content: (
        <TeacherEditForm
          initialData={teacherData}
          refs={{ nameRef, surnameRef, descriptionRef, priceRef }}
        />
      ),
      onConfirm: async () => {
        setConfirmButtonDisabled(true);

        const trimmedName = nameRef.current?.value.trim() ?? "";
        const trimmedSurname = surnameRef.current?.value.trim() ?? "";
        const trimmedDescription = descriptionRef.current?.value.trim() ?? "";
        const parsedPrice = priceRef.current?.value
          ? Number(priceRef.current.value)
          : NaN;

        // No changes were made, do nothing
        if (
          !trimmedName &&
          !trimmedSurname &&
          !trimmedDescription &&
          isNaN(parsedPrice)
        ) {
          return false;
        }

        const data: Partial<TeacherTableRowType> = {};
        if (trimmedName) data.name = trimmedName;
        if (trimmedSurname) data.surname = trimmedSurname;
        if (trimmedDescription) data.description = trimmedDescription;
        if (!isNaN(parsedPrice)) data.price = parsedPrice;

        await handleUpdate(data);
        setConfirmButtonDisabled(false);
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
                    className="bg-error text-red-800 font-bold"
                    onClick={() => {
                      setModal(true, {
                        title: "Eliminare il professore?",
                        content:
                          "Confermi di voler eliminare questo professore?",
                        confirmButtonText: "Conferma",
                        onConfirm: handleDelete,
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
