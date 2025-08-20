"use server";

import {
    createClassInFirestore,
    getClassesFromFirestore,
    getClassFromFirestore,
    joinClassInFirestore,
    leaveClassInFirestore,
} from "@/lib.api/api.utils/classes.api.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { withSession } from "./session/session-helpers.data-layer";

/**
 * Retrieves all classes the current user is enrolled in.
 * 
 * @returns A list of classes.
 * Redirects to login if the session is invalid.
 */
export const getClassesAction = withSession(async (uid: string) => {
    return await getClassesFromFirestore(uid);
});

/**
 * Retrieves the data of a specific class.
 * 
 * @param class_id - The ID of the class.
 * @returns Class data.
 * Redirects to login if the session is invalid.
 */
export const getClassDataAction = withSession(async (uid: string, class_id: string) => {

    return await getClassFromFirestore(class_id);
});

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
export const joinClassAction = withSession(async (uid: string, class_id: string) => {

    const joinResult = await joinClassInFirestore(uid, class_id);
    if (joinResult.successful) {
        revalidatePath("/dashboard");
        redirect(`/dashboard/classes/${class_id}/overview`);
    }
    return joinResult.status;
});

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
