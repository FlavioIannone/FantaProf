"use server";

import { revalidatePath } from "next/cache";
import { TeacherDataInput } from "../../types";
import {  addTeacherInFirestore, modifyTeacherInFirestore, deleteTeacherFromFirestore } from "@/lib/db/db.utils/teachers.db.utils";
import { withSession } from "../session/session-helpers.data-layer";
import { TeacherDataEditForm } from "../types.data";





/**
 * Adds a new teacher to a class.
 *
 * @param class_id - ID of the target class.
 * @param teacher_data - Data of the teacher to add.
 *
 * Redirects to login if session is invalid.
 * Revalidates the market page after success.
 */
export const addTeacherAction = withSession(async (
    uid: string,
    class_id: string,
    teacher_data: TeacherDataInput
) => {
    const result = await addTeacherInFirestore(class_id, teacher_data);
    if (result) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
});

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
export const modifyTeacherAction = withSession(async (
    uid: string,
    class_id: string,
    teacher_id: string,
    teacher_data: TeacherDataEditForm
) => {
    const result = await modifyTeacherInFirestore(class_id, teacher_id, teacher_data);
    if (result.successful) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
});

/**
 * Deletes a teacher from a class.
 *
 * @param class_id - ID of the class.
 * @param teacher_id - ID of the teacher to delete.
 *
 * Redirects to login if session is invalid.
 * Revalidates the market page after success.
 */
export const deleteTeacherAction = withSession(async (
    uid:string,
    class_id: string,
    teacher_id: string
) => {

    const result = await deleteTeacherFromFirestore(class_id, teacher_id);
    if (result.successful) {
        revalidatePath(`/dashboard/classes/${class_id}/market`);
    }
});
