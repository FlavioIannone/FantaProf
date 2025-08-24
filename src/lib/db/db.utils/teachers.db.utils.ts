import { cache } from "react";
import { admin_firestore } from "../firebase-connection.server";
import { Class, Teacher } from "../schema.db";
import { FieldValue } from "firebase-admin/firestore";
import { TeacherDataInput, WriteOperationResult } from "@/lib/types";
import z from "zod";
import { TeacherTableRowType } from "@/lib/data/types.data";

/**
 * Retrieves all teachers of a class.
 * Returns empty array if class or teachers collection not found.
 */
export const getClassTeachersFromFirestore = cache(
    async (class_id: string): Promise<TeacherTableRowType[] | undefined> => {
        try {
            const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
            const teachersCollectionRef = classDocRef.collection(Teacher.collection).orderBy("created_at", "desc");

            const [classDocSnap, teachersCollectionSnap] = await Promise.all([
                classDocRef.get(),
                teachersCollectionRef.get(),
            ]);

            if (!classDocSnap.exists || teachersCollectionSnap.empty) {
                return [];
            }

            return teachersCollectionSnap.docs.map((doc) => ({
                ...Teacher.schema.parse(doc.data()),
                teacher_id: doc.id,
            }));
        } catch (err: any) {
            console.error("[getClassTeachersFromFirestore]", err);
            return undefined;
        }
    }
);

/**
 * Adds a teacher to a class.
 * Increments the teachers count in the class doc.
 */
export const addTeacherInFirestore = async (
    class_id: string,
    teacherData: TeacherDataInput
): Promise<WriteOperationResult> => {
    try {
        const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
        const teacherDocRef = classDocRef.collection(Teacher.collection).doc();

        const batch = admin_firestore.batch();
        
        batch
        .create(teacherDocRef, Teacher.schema.parse(teacherData))
        .update(classDocRef, {
            teachers: FieldValue.increment(1),
        });

        await batch.commit();

        return { successful: true };
    } catch (err) {
        console.error("[addTeacherInFirestore]", err);
        return {
            successful: false,
            status: 500,
            message: "Errore durante l'aggiunta dell'insegnante",
        };
    }
};

/**
 * Deletes a teacher from a class and decrements teacher count.
 */
export const deleteTeacherFromFirestore = async (
    class_id: string,
    teacher_id: string
): Promise<WriteOperationResult> => {
    const teacherDocRef = admin_firestore.collection(Class.collection).doc(class_id).collection(Teacher.collection).doc(teacher_id);
    const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);

    try {
        await admin_firestore.runTransaction(async (t) => {
            const [teacherDocSnap, classDocSnap] = await t.getAll(teacherDocRef, classDocRef);

            if (!teacherDocSnap.exists) {
                throw new Error(`NOT_FOUND:Teacher ${teacher_id} not found`);
            }
            if (!classDocSnap.exists) {
                throw new Error(`NOT_FOUND:Class ${class_id} not found`);
            }

            t.delete(teacherDocRef);
            t.update(classDocRef, { teachers: FieldValue.increment(-1) });
        });

        return { successful: true };
    } catch (err: any) {
        console.error("[deleteTeacherFromFirestore]", err);
        const message = err.message.startsWith("NOT_FOUND") ? err.message.split(":")[1] : "Errore durante lo svolgimento dell'operazione";
        const status = err.message.startsWith("NOT_FOUND") ? 404 : 500;

        return {
            successful: false,
            status,
            message,
        };
    }
};

const teacherDataToChange = Teacher.schema.omit({ created_at: true }).partial();
type TeacherDataToChangeInput = z.input<typeof teacherDataToChange>;

/**
 * Modifies teacher data in a class.
 */
export const modifyTeacherInFirestore = async (
    class_id: string,
    teacher_id: string,
    teacherData: TeacherDataToChangeInput
): Promise<WriteOperationResult> => {
    try {
        const teacherDocRef = admin_firestore.collection(Class.collection).doc(class_id).collection(Teacher.collection).doc(teacher_id);
        const teacherDocSnap = await teacherDocRef.get();

        if (!teacherDocSnap.exists) {
            throw new Error(`NOT_FOUND:Teacher ${teacher_id} not found`);
        }

        await teacherDocRef.update(teacherData);

        return { successful: true };
    } catch (err: any) {
        console.error("[modifyTeacherInFirestore]", err);
        const message = err.message.startsWith("NOT_FOUND") ? err.message.split(":")[1] : "Errore durante lo svolgimento dell'operazione";
        const status = err.message.startsWith("NOT_FOUND") ? 404 : 500;

        return {
            successful: false,
            status,
            message,
        };
    }
};
