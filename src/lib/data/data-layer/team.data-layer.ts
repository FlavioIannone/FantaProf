import "server-only";
import { getTeamFromFirestore } from "@/lib/db/db.utils/team.db.utils";
import { withSession } from "../session/session-helpers.data-layer";

/**
 * Retrieves the complete team of the current user.
 * @param class_id - The ID of the class
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class or the teacher doesn't exist or the team collection is empty, status: 404.
 */
export const getTeam = withSession(async (uid: string, class_id: string) => {
  return await getTeamFromFirestore(uid, class_id);
});
