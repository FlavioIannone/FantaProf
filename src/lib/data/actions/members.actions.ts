"use server";

import {  makeUserAdminInFirestore } from "@/lib/db/db.utils/members.db.utils";
import { revalidatePath } from "next/cache";
import { withSession } from "../session/session-helpers.data-layer";

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


