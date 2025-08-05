"use server";

import { createClassInFirestore, getClassesFromFirestore, getClassFromFirestore, getClassMembersFromFirestore, getStudentEnrollmentDataFromFirestore } from "@/lib.api/api.utils/classes.api.utils";
import { verifySession } from "../sessionManagement/session-validation.data-layer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
}

export const getClassesAction = async () => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    return await getClassesFromFirestore(res.session.uid);
}


export const getClassAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    const classData = await getClassFromFirestore(class_id)
    return classData;
}

export const getStudentEnrollmentDataAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    const studentEnrollmentData = await getStudentEnrollmentDataFromFirestore(class_id, res.session.uid);
    return studentEnrollmentData;
}

export const getClassMembersAction = async (class_id: string) => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired");
    }
    const members = await getClassMembersFromFirestore(class_id);
    return members;
}