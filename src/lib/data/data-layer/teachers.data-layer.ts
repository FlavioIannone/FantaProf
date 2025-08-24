import "server-only"


import { getClassTeachersFromFirestore } from "@/lib/db/db.utils/teachers.db.utils";
import { withSession } from "../session/session-helpers.data-layer";



/**
 * Retrieves all teachers for a given class.
 *
 * @param class_id - ID of the class to fetch teachers from.
 * @returns A list of teachers.
 *
 * Redirects to login if session is invalid.
 */
export const getClassTeachers = withSession(async (uid: string, class_id: string) => {

    return await getClassTeachersFromFirestore(class_id);
});

