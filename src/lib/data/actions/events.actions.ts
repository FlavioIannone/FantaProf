"use server";

import {
  createEventTemplateInFirestore,
  deleteEventTemplateInFirestore,
  EventData,
  modifyEventTemplateInFirestore,
  registerEventInFirestore,
  TemplateEventData,
} from "@/lib/db/db.utils/events.db.utils";
import { withSession } from "../session/session-helpers.data-layer";

import { revalidatePath } from "next/cache";

/**
 * Server action that creates a new template event and revalidates the cache
 * @param class_id - The ID of the class
 * @param templateEventData - Data of the new template data
 * @returns true if the operation was successful or the status code if the operation otherwise.
 */
export const createEventTemplateAction = withSession(
  async (
    uid: string,
    class_id: string,
    templateEventData: TemplateEventData
  ) => {
    const res = await createEventTemplateInFirestore(
      class_id,
      templateEventData
    );
    if (res.status === 200)
      revalidatePath(`/dashboard/classes/${class_id}/events`);
    return res;
  }
);

/**
 * Delete event template action, revalidates the cached retrieved templates.
 * @param class_id - The ID of the class
 * @param event_id - The ID of the template event
 */
export const deleteEventTemplateAction = withSession(
  async (uid: string, class_id: string, event_id: string) => {
    const res = await deleteEventTemplateInFirestore(class_id, event_id);
    if (res.status === 200)
      revalidatePath(`/dashboard/classes/${class_id}/events`);
    return res;
  }
);

export const modifyEventTemplateAction = withSession(
  async (
    uid: string,
    class_id: string,
    event_id: string,
    templateEventData: Partial<TemplateEventData>
  ) => {
    const res = await modifyEventTemplateInFirestore(
      class_id,
      event_id,
      templateEventData
    );
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/events`);
    }
    return res;
  }
);

export const registerEventAction = withSession(
  async (uid: string, class_id: string, eventData: EventData) => {
    const res = await registerEventInFirestore(class_id, eventData);
    if (res.status === 200) {
      console.log("Revalidating...");

      revalidatePath(`/dashboard/classes/${class_id}/events`);
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
      revalidatePath(`/dashboard/classes/${class_id}/team`);
    }
    return res;
  }
);
