import "server-only";
import { withSession } from "../session/session-helpers.data-layer";
import { getEventsTemplateFromFirestore as getEventTemplatesFromFirestore } from "@/lib/db/db.utils/events.db.utils";

export const getEvents = withSession(
  async (uid: string, class_id: string) => {}
);

export const getEventTemplates = withSession(async (uid: string, class_id) => {
  return await getEventTemplatesFromFirestore(class_id);
});
