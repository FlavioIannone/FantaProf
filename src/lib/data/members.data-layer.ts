"use server";

import { getClassMembersFromFirestore, makeUserAdminInFirestore } from "@/lib.api/api.utils/members.api.utils";
import { revalidatePath } from "next/cache";
import { withSession } from "./session/session-helpers.data-layer";

/**
 * Makes a user an admin in a class.
 * 
 * @param uid - The user ID of the user to be promoted.
 * @param class_id - The ID of the class where the user should be made admin.
 * 
 * Verifies the user's session before proceeding.
 * Redirects to login if the session is invalid.
 * Revalidates the class overview page on success.
 */
export const makeUserAdminAction = withSession(async (uid: string, uidToMakeAdmin: string, class_id: string) => {
    const adminResult = await makeUserAdminInFirestore(uidToMakeAdmin, class_id);
    if (adminResult) {
        revalidatePath(`/dashboard/classes/${class_id}/overview`);
    }
});

/**
 * Fetches the members of a class.
 * 
 * @param class_id - The ID of the class to retrieve members for.
 * @returns A list of class members.
 * 
 * Verifies the user's session before fetching.
 * Redirects to login if the session is invalid.
 */
export const getClassMembersAction = withSession(async (uid: string, class_id: string) => {
    return await getClassMembersFromFirestore(class_id);
});
