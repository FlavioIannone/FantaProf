"use server";

import {
    createClassInFirestore,
    joinClassInFirestore,
    leaveClassInFirestore,
} from "@/lib/db/db.utils/classes.db.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { withSession } from "../session/session-helpers.data-layer";
import { verifySession } from "../session/session-manager.data-layer";


/**
 * Creates a new class for the current user.
 * 
 * @param class_data - Contains name and initial credits of the class.
 * Redirects to login if the session is invalid.
 * Revalidates dashboard on success.
 */
export const addClassAction = withSession(async (uid: string, class_data: {
    class_name: string;
    initial_credits: number;
}): Promise<{ class_id: string } | undefined> => {
    const createdClass = await createClassInFirestore(uid, class_data);
    if (createdClass) {
        revalidatePath(`/dashboard`);
        revalidatePath(`/dashboard/classes/${createdClass.class_id}/overview`);
        revalidatePath(`/dashboard/classes/${createdClass.class_id}/events`);
        revalidatePath(`/dashboard/classes/${createdClass.class_id}/market`);
        revalidatePath(`/dashboard/classes/${createdClass.class_id}/join`);
        return {
            class_id: createdClass.class_id
        };
    }
});

/**
 * Enrolls the user into a class.
 * 
 * @param class_id - The ID of the class to join.
 * Redirects to login if the session is invalid.
 * Redirects to the class overview page on success.
 */
export const joinClassAction = async ( class_id: string) => {

    const res = await verifySession();
    if(!res.successful) {
        redirect(`/auth/login?reason=join-class&class_id=${encodeURIComponent(class_id)}`)
        
    }
    const joinResult = await joinClassInFirestore(res.session.uid, class_id);
    if (joinResult.successful) {
        revalidatePath("/dashboard");
        redirect(`/dashboard/classes/${class_id}/overview`);
    }
    return joinResult.status;
};

/**
 * Removes the user from a class.
 * 
 * @param class_id - The ID of the class to leave.
 * Redirects to login if the session is invalid.
 * Revalidates dashboard on success.
 */
export const leaveClassAction = withSession(async (uid: string, class_id: string) => {

    const leaveResult = await leaveClassInFirestore(uid, class_id);
    if (leaveResult.successful) {
        revalidatePath("/dashboard");
    }
});
