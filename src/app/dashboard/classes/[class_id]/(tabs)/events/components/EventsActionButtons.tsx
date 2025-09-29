"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import {
  createEventTemplateAction,
  registerEventAction,
} from "@/lib/data/actions/events.actions";
import { getClassDataWithSession } from "@/lib/data/data-layer/classes.data-layer";
import {
  ClassData,
  EventTemplateType,
  TeacherRowType,
} from "@/lib/data/types.data";
import { use } from "react";

/**
 * Action buttons of the events tab
 */
export default function EventsActionButtons({
  class_id,
  teachers,
  eventTemplates,
  classData,
}: {
  class_id: string;
  teachers: TeacherRowType[];
  eventTemplates: EventTemplateType[];
  classData: Pick<ClassData, "game_started">;
}) {
  const modal = useModal();
  const toast = useToast();

  const submitEventTemplate = async (formData?: FormData) => {
    if (!formData) return;
    const eventName = formData.get("event_name")!.toString().trim();
    const eventDescription = formData
      .get("event_description")!
      .toString()
      .trim();
    const eventPoints = formData.get("event_points")!.toString().trim();

    if (eventName === "" || eventPoints === "") return;

    const res = await createEventTemplateAction(class_id, {
      title: eventName,
      description: eventDescription === "" ? undefined : eventDescription,
      points: parseInt(eventPoints),
    });
    modal.setModal(false);
    if (res.status === 200) {
      toast.setToast(true, {
        content: "Template creato con successo.",
        toastType: "success",
      });
      return;
    }
    toast.setToast(true, {
      content: "Si è verificato un errore durante la creazione del template.",
      toastType: "error",
    });
  };

  const submitEvent = async (formData?: FormData) => {
    if (!formData) return;
    const selected_teacher = formData
      .get("selected_teacher")!
      .toString()
      .trim();
    const selected_event = formData.get("selected_event")!.toString().trim();
    const description = formData.get("event_description")!.toString().trim();
    if (selected_event === "" || selected_teacher === "") return;

    const res = await registerEventAction(class_id, {
      description,
      event_id: selected_event,
      teacher_id: selected_teacher,
    });
    modal.setModal(false);

    if (res.status === 200) {
      toast.setToast(true, {
        content: "Evento registrato con successo.",
        toastType: "success",
      });
      return;
    }
    toast.setToast(true, {
      content: "Si è verificato un errore durante la registazione dell'evento.",
      toastType: "success",
    });
  };

  return (
    <div className="flex flex-row gap-2">
      <button
        type="button"
        className="d-btn d-btn-primary d-btn-soft md:grow-0 grow"
        onClick={() => {
          modal.setModal(true, {
            closeOnSubmit: false,
            confirmButtonText: "Aggiungi",
            title: "Aggiungi template",
            content: <EventTemplateModalBody />,
            onConfirm: submitEventTemplate,
          });
        }}
      >
        Crea template evento
      </button>
      <button
        type="button"
        className="d-btn d-btn-primary md:grow-0 grow"
        onClick={() => {
          let toastMessage = "";

          if (teachers.length === 0) {
            toastMessage = "la classe non ha professori";
          }

          if (!classData.game_started) {
            toastMessage =
              "il gioco ancora non è iniziato, modifica le impostazioni classe";
          }

          if (eventTemplates.length === 0) {
            toastMessage += toastMessage
              ? " e non ha template evento"
              : "la classe non ha template evento";
          }

          if (toastMessage) {
            toast.setToast(true, {
              content: `Impossibile registrare eventi: ${toastMessage}.`,
              toastType: "error",
            });
            return;
          }

          modal.setModal(true, {
            closeOnSubmit: false,
            confirmButtonText: "Aggiungi",
            title: "Aggiungi evento",

            content: (
              <EventModalBody
                teachers={teachers}
                eventTemplates={eventTemplates}
              />
            ),
            onConfirm: submitEvent,
          });
        }}
      >
        Registra evento
      </button>
    </div>
  );
}

function EventTemplateModalBody() {
  return (
    <>
      <fieldset className="d-fieldset">
        <div>
          <legend className="d-fieldset-legend">Nome evento</legend>
          <input
            type="text"
            name="event_name"
            className="d-input w-full peer d-validator"
            placeholder="Evento bello"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Nome non valido
          </div>
        </div>
        <div className="flex flex-col">
          <legend className="d-fieldset-legend">Descrizione</legend>
          <textarea
            name="event_description"
            className="d-textarea h-24 w-full"
            placeholder="Fa una capriola sulla cattedra..."
          ></textarea>
          <div className="d-label">Facoltativo</div>
        </div>
        <div>
          <legend className="d-fieldset-legend">Punti (anche negativo)</legend>
          <input
            type="number"
            name="event_points"
            className="d-input w-full d-validator peer"
            placeholder="10"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Punteggio non valido
          </div>
        </div>
      </fieldset>
    </>
  );
}

function EventModalBody({
  teachers,
  eventTemplates,
}: {
  teachers: TeacherRowType[];
  eventTemplates: EventTemplateType[];
}) {
  return (
    <>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Professore</legend>
        <select
          defaultValue=""
          name="selected_teacher"
          className="d-select w-full"
        >
          <option disabled={true} value={""}>
            Scegli un professore
          </option>
          {teachers.map((teacher) => {
            return (
              <option key={teacher.teacher_id} value={teacher.teacher_id}>
                {teacher.name} {teacher.surname}
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Evento</legend>
        <select
          defaultValue=""
          name="selected_event"
          className="d-select w-full"
        >
          <option disabled={true} value={""}>
            Scegli un evento
          </option>
          {eventTemplates.map((eventTemplate) => {
            const isNegative = eventTemplate.points < 0;
            return (
              <option
                key={eventTemplate.event_id}
                value={eventTemplate.event_id}
              >
                {eventTemplate.title} ({isNegative ? "-" : "+"}
                {Math.abs(eventTemplate.points)})
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset className="d-fieldset flex flex-col">
        <legend className="d-fieldset-legend">Descrizione</legend>
        <textarea
          name="event_description"
          className="d-textarea h-24 w-full"
          placeholder="Fa una capriola sulla cattedra..."
        ></textarea>
        <div className="d-label">Facoltativo</div>
      </fieldset>
    </>
  );
}
