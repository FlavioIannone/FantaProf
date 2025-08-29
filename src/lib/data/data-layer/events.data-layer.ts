import "server-only";
import { withSession } from "../session/session-helpers.data-layer";
import {
  getRegisteredEventsFromFirestore as getEventRegistartionsFromFirestore,
  getEventsTemplateFromFirestore as getEventTemplatesFromFirestore,
} from "@/lib/db/db.utils/events.db.utils";

export const getEventRegistrations = withSession(
  async (uid: string, class_id: string) => {
    return await getEventRegistartionsFromFirestore(class_id);
  }
);

export const getEventTemplates = withSession(async (uid: string, class_id) => {
  return await getEventTemplatesFromFirestore(class_id);
});
