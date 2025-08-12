"use server";

import {
    createClassInFirestore,
    getClassesFromFirestore,
    getClassFromFirestore,
    joinClassInFirestore,
    leaveClassInFirestore,
} from "@/lib.api/api.utils/classes.api.utils";
import { verifySession } from "./session/session-manager.data-layer";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Retrieves all classes the current user is enrolled in.
 * 
 * @returns A list of classes.
 * Redirects to login if the session is invalid.
 */
export const getClassesAction = async () => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    return await getClassesFromFirestore(res.session.uid);
};

/**
 * Retrieves the data of a specific class.
 * 
 * @param class_id - The ID of the class.
 * @returns Class data.
 * Redirects to login if the session is invalid.
 */
export const getClassDataAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    return await getClassFromFirestore(class_id);
};

/**
 * Creates a new class for the current user.
 * 
 * @param class_data - Contains name and initial credits of the class.
 * Redirects to login if the session is invalid.
 * Revalidates dashboard on success.
 */
export const addClassAction = async (class_data: {
    class_name: string;
    initial_credits: number;
}): Promise<void> => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    const classCreated = await createClassInFirestore(res.session.uid, class_data);
    if (classCreated) {
        revalidatePath("/dashboard");
    }
};

/**
 * Enrolls the user into a class.
 * 
 * @param class_id - The ID of the class to join.
 * Redirects to login if the session is invalid.
 * Redirects to the class overview page on success.
 */
export const joinClassAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect(`/auth/login?reason=join-class&class_id=${encodeURIComponent(class_id)}`);
    }
    const joinResult = await joinClassInFirestore(res.session.uid, class_id);
    if (joinResult.successful) {
        revalidatePath("/dashboard");
        redirect(`/dashboard/classes/${class_id}/overview`, RedirectType.replace);
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
export const leaveClassAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    const leaveResult = await leaveClassInFirestore(res.session.uid, class_id);
    if (leaveResult.successful) {
        revalidatePath("/dashboard");
    }
};
