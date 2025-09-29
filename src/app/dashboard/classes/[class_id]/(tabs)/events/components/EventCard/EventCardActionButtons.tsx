"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import {
  deleteEventTemplateAction,
  modifyEventTemplateAction,
} from "@/lib/data/actions/events.actions";
import { EventTemplateType } from "@/lib/data/types.data";

/**
 * Action buttons of the event template card
 */
export default function EventCardActionButtons({
  class_id,
  eventData,
}: {
  class_id: string;
  eventData: EventTemplateType;
}) {
  const modal = useModal();
  const toast = useToast();

  const handleModifyTemplate = async (formData?: FormData) => {
    if (!formData) return;
    const eventName = formData.get("event_name")!.toString().trim();
    const eventDescription = formData
      .get("event_description")!
      .toString()
      .trim();
    const eventPoints = formData.get("event_points")!.toString().trim();
    const res = await modifyEventTemplateAction(class_id, eventData.event_id, {
      title: eventName === "" ? undefined : eventName,
      description: eventDescription === "" ? undefined : eventDescription,
      points: eventPoints === "" ? undefined : parseInt(eventPoints),
    });
    modal.setModal(false);
    if (res.status === 200) {
      toast.setToast(true, {
        content: "Template modificato con successo.",
        toastType: "success",
      });
      return;
    }
    toast.setToast(true, {
      content:
        "Si è verificato un errore durante l'operazione di modifica del template.",
      toastType: "error",
      overrideQueue: true,
    });
  };

  return (
    <div className="d-dropdown d-dropdown-left relative">
      <div tabIndex={0} role="button" className="d-btn d-btn-ghost p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots-vertical size-8"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
      <ul className="d-dropdown-content d-menu bg-base-100 rounded-box w-52 p-2 shadow-sm mb-2 space-y-2">
        <li>
          <button
            type="button"
            className="d-btn"
            onClick={() => {
              modal.setModal(true, {
                title: "Modifica template",
                content: <ModalBody currentEventData={eventData} />,
                closeOnSubmit: false,
                confirmButtonText: "Modifica",
                onConfirm: handleModifyTemplate,
              });
            }}
          >
            Modifica<i className="bi bi-pencil" aria-hidden></i>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="d-btn d-btn-error"
            onClick={() => {
              modal.setModal(true, {
                title: "Eliminare template?",
                content: "Vuoi davvero eliminare questo template evento?",
                closeOnSubmit: false,
                confirmButtonText: "Conferma",
                onConfirm: async () => {
                  const res = await deleteEventTemplateAction(
                    class_id,
                    eventData.event_id
                  );
                  modal.setModal(false);
                  if (res.status === 200) {
                    toast.setToast(true, {
                      content: "Template eliminato con successo.",
                      toastType: "success",
                    });
                    return;
                  }
                  toast.setToast(true, {
                    content:
                      "Si è verificato un errore durante l'eliminazione del template.",
                    toastType: "error",
                    overrideQueue: true,
                  });
                },
              });
            }}
          >
            Elimina<i className="bi bi-trash3"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}

function ModalBody({
  currentEventData,
}: {
  currentEventData: {
    title: string;
    description: string;
    points: number;
  };
}) {
  return (
    <>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome evento</legend>
          <input
            type="text"
            name="event_name"
            className="d-input w-full peer d-validator"
            placeholder={currentEventData.title}
          />
        </div>
        <div className="flex flex-col">
          <legend className="d-fieldset-legend">Descrizione</legend>
          <textarea
            name="event_description"
            className="d-textarea h-24 w-full"
            placeholder={currentEventData.description}
          ></textarea>
          <div className="d-label">Facoltativo</div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Punti (anche negativo)</legend>
          <input
            type="number"
            name="event_points"
            className="d-input w-full d-validator peer"
            placeholder={currentEventData.points.toString()}
          />
        </div>
      </fieldset>
    </>
  );
}
