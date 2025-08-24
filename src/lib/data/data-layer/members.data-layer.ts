import "server-only"

import { getClassMembersFromFirestore } from "@/lib/db/db.utils/members.db.utils";
import { withSession } from "../session/session-helpers.data-layer";



/**
 * Fetches the members of a class.
 * 
 * @param class_id - The ID of the class to retrieve members for.
 * @returns A list of class members.
 * 
 * Verifies the user's session before fetching.
 * Redirects to login if the session is invalid.
 */
export const getClassMembers = withSession(async (uid: string, class_id: string) => {
    return await getClassMembersFromFirestore(class_id);
});
