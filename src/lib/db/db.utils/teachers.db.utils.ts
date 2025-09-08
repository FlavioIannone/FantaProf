import { cache } from "react";
import { admin_firestore } from "../firebase-connection.server";
import { Class, Teacher } from "../schema.db";
import { FieldValue } from "firebase-admin/firestore";
import {
  ReadOperationResult,
  TeacherDataInput,
  WriteOperationResult,
} from "@/lib/types";
import z from "zod";
import { getClassFromFirestore } from "./classes.db.utils";

type TeacherDataType = z.infer<typeof Teacher.schema> & { teacher_id: string };

/**
 * Retrieves all teachers of a class.
 * @param class_id - The ID of the class
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist or the class doesn't contain any teacher: 404.
 */
export const getClassTeachersFromFirestore = cache(
  async (class_id: string): Promise<ReadOperationResult<TeacherDataType[]>> => {
    try {
      const classDocRef = admin_firestore
        .collection(Class.collection)
        .doc(class_id);
      const teachersCollectionRef = classDocRef
        .collection(Teacher.collection)
        .where("deleted", "==", false)
        .orderBy("created_at", "desc");

      const [classDocSnap, teachersCollectionSnap] = await Promise.all([
        classDocRef.get(),
        teachersCollectionRef.get(),
      ]);

      if (!classDocSnap.exists || teachersCollectionSnap.empty) {
        throw {
          status: 404,
          message:
            "The class doesn't exist or the teachers collection is empty",
        };
      }

      const classTeachers = teachersCollectionSnap.docs.map((doc) => ({
        ...Teacher.schema.parse(doc.data()),
        teacher_id: doc.id,
      }));
      return {
        status: 200,
        data: classTeachers,
      };
    } catch (error: any) {
      const status = error.status ?? 500;
      const message =
        error.message ?? "Error while deleting the event template";
      console.log(`Fn: getClassTeachersFromFirestore, error: `);
      console.log(error);

      return {
        status,
        message,
      };
    }
  }
);

/**
 * Retrieves the data of a specified teacher.
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the teacher or the class doesn't exist, status: 404.
 */
export const getClassTeacherFromFirestore = cache(
  async (
    class_id: string,
    teacher_id: string
  ): Promise<ReadOperationResult<TeacherDataType>> => {
    try {
      const classDocRef = admin_firestore
        .collection(Class.collection)
        .doc(class_id);
      const teacherDocRef = classDocRef
        .collection(Teacher.collection)
        .doc(teacher_id);

      const [classDocSnap, teacherDocSnap] = await Promise.all([
        classDocRef.get(),
        teacherDocRef.get(),
      ]);

      if (!classDocSnap.exists) {
        return {
          status: 404,
          message: "The class doesn't exist",
        };
      }
      if (!teacherDocSnap.exists) {
        return {
          status: 404,
          message: "The teacher doesn't exist",
        };
      }

      return {
        data: {
          ...Teacher.schema.parse(teacherDocSnap.data()),
          teacher_id: teacherDocRef.id,
        },
        status: 200,
      };
    } catch (error: any) {
      const status = error.status ?? 500;
      const message =
        error.message ?? "Error while deleting the event template";
      console.log(`Fn: getClassTeacherFromFirestore, error: `);
      console.log(error);

      return {
        status,
        message,
      };
    }
  }
);

/**
 * Adds a teacher to a class.
 * @param class_id - The ID of the class
 * @param teacherData - The data of the new teacher
 * Successful state operation result, an error with it's status code and message otherwise. If the teacher's credits are higher than the initial credits of the class, status: 400.
 */
export const addTeacherInFirestore = async (
  class_id: string,
  teacherData: TeacherDataInput
): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const teacherDocRef = classDocRef.collection(Teacher.collection).doc();
  try {
    const classRes = await getClassFromFirestore(class_id);
    if (classRes.status !== 200) {
      throw classRes;
    }

    if (teacherData.price > classRes.data.initial_credits) {
      throw {
        status: 400,
        message:
          "The teacher's price is higher than the initial credits of the class",
      };
    }

    const batch = admin_firestore.batch();

    batch
      .create(teacherDocRef, Teacher.schema.parse(teacherData))
      .update(classDocRef, {
        teachers: FieldValue.increment(1),
      });

    await batch.commit();

    return { status: 200 };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(`Fn: addTeacherInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

/**
 * Deletes a teacher from a class and decrements teacher count.
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher
 * Successful state operation result, an error with it's status code and message otherwise. If the teacher or the class doesn't exist, status: 404.
 */
export const deleteTeacherFromFirestore = async (
  class_id: string,
  teacher_id: string
): Promise<WriteOperationResult> => {
  const teacherDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(Teacher.collection)
    .doc(teacher_id);
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  try {
    await admin_firestore.runTransaction(async (t) => {
      const [teacherDocSnap, classDocSnap] = await t.getAll(
        teacherDocRef,
        classDocRef
      );

      if (!classDocSnap.exists) {
        throw {
          status: 404,
          message: "The class does't exist",
        };
      }

      if (!teacherDocSnap.exists) {
        throw {
          status: 404,
          message: "The teacher does't exist",
        };
      }

      t.update(teacherDocRef, { deleted: true }).update(classDocRef, {
        teachers: FieldValue.increment(-1),
      });
    });

    return { status: 200 };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(`Fn: deleteTeacherFromFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

const teacherDataToChange = Teacher.schema.omit({ created_at: true }).partial();
type TeacherDataToChangeInput = z.input<typeof teacherDataToChange>;

/**
 * Deletes a teacher from a class and decrements teacher count.
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher
 * @param teacherData - The teacher's new data
 * Successful state operation result, an error with it's status code and message otherwise. If the teacher or the class doesn't exist, status: 404.
 */
export const modifyTeacherInFirestore = async (
  class_id: string,
  teacher_id: string,
  teacherData: TeacherDataToChangeInput
): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const teacherDocRef = classDocRef
    .collection(Teacher.collection)
    .doc(teacher_id);
  try {
    const [classDocSnap, teacherDocSnap] = await Promise.all([
      classDocRef.get(),
      teacherDocRef.get(),
    ]);

    if (!classDocSnap.exists) {
      throw {
        status: 404,
        message: "The class doesn't exist",
      };
    }
    if (!teacherDocSnap.exists) {
      throw {
        status: 404,
        message: "The teacher doesn't exist",
      };
    }

    await teacherDocRef.update(teacherData);

    return { status: 200 };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(`Fn: modifyTeacherInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};
