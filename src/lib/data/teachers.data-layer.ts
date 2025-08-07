"use server";

import { verifySession } from "./session/session-manager.data-layer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TeacherDataInput } from "../types";
import { getClassTeachersFromFirestore, addTeacherInFirestore, modifyTeacherInFirestore, deleteTeacherFromFirestore } from "@/lib.api/api.utils/teachers.api.utils";

/**
 * Represents editable teacher data for modification.
 * All fields are optional to allow partial updates.
 */
export type TeacherDataEditForm = {
    name?: string;
    surname?: string;
    description?: string;
    price?: number;
};

/**
 * Retrieves all teachers for a given class.
 *
 * @param class_id - ID of the class to fetch teachers from.
 * @returns A list of teachers.
 *
 * Redirects to login if session is invalid.
 */
export const getClassTeachersAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    return await getClassTeachersFromFirestore(class_id);
};

/**
 * Adds a new teacher to a class.
 *
 * @param class_id - ID of the target class.
 * @param teacher_data - Data of the teacher to add.
 *
 * Redirects to login if session is invalid.
 * Revalidates the market page after success.
 */
export const addTeacherAction = async (
    class_id: string,
    teacher_data: TeacherDataInput
) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }

    const result = await addTeacherInFirestore(class_id, teacher_data);
    if (result) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
};

/**
 * Modifies an existing teacher's data.
 *
 * @param class_id - ID of the class.
 * @param teacher_id - ID of the teacher to modify.
 * @param teacher_data - Partial data to update.
 *
 * Redirects to login if session is invalid.
 * Revalidates the market page after success.
 */
export const modifyTeacherAction = async (
    class_id: string,
    teacher_id: string,
    teacher_data: TeacherDataEditForm
) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }

    const result = await modifyTeacherInFirestore(class_id, teacher_id, teacher_data);
    if (result.successful) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
};

/**
 * Deletes a teacher from a class.
 *
 * @param class_id - ID of the class.
 * @param teacher_id - ID of the teacher to delete.
 *
 * Redirects to login if session is invalid.
 * Revalidates the market page after success.
 */
export const deleteTeacherAction = async (
    class_id: string,
    teacher_id: string
) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }

    const result = await deleteTeacherFromFirestore(class_id, teacher_id);
    if (result.successful) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
};
