import {
  Class,
  StudentEnrollment,
  Teacher,
  TeamEnrollment,
} from "../schema.db";
import { admin_firestore } from "../firebase-connection.server";
import { ReadOperationResult, WriteOperationResult } from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";
import { getClassFromFirestore } from "./classes.db.utils";
import { getStudentEnrollmentDataFromFirestore } from "./users.db.utils";
import z from "zod";
import { cache } from "react";
import { getClassTeacherFromFirestore } from "./teachers.db.utils";
type TeamEnrollmentType = z.infer<typeof TeamEnrollment.schema> &
  Omit<z.infer<typeof Teacher.schema>, "created_at"> & { teacher_id: string };

/**
 * Attempts to add a teacher to the student team, if the teacher is the first one to be added it will become the team's captain.
 * Checks if the student has enough credits to purchase the teacher and if the teacher is already part of the team.
 * @param uid - The ID of the student
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher to add to the team
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the teacher is part of the team, status: 409; if the student doesn't have enough credits, status: 402; other possible statuses: 404.
 */
export const addTeacherToTeamInFirestore = async (
  uid: string,
  class_id: string,
  teacher_id: string
): Promise<
  WriteOperationResult<{
    isCaptain: boolean;
  }>
> => {
  // Reference to the student's enrollment document in this class
  const studentEnrollmentDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(StudentEnrollment.collection)
    .doc(uid);

  // Reference to the teacher document in this class
  const teacherDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(Teacher.collection)
    .doc(teacher_id);

  // Reference to the subcollection of teachers enrolled in the student's team
  const teamCollectionRef = studentEnrollmentDocRef.collection(
    TeamEnrollment.collection
  );

  // Reference to the specific teacher entry in the student's team
  const teacherTeamEnrollmentDocRef = teamCollectionRef.doc(teacher_id);

  try {
    // Fetch all necessary documents in parallel:
    // - The student enrollment doc
    // - The teacher-team enrollment doc (to check if already in team)
    // - The team collection (to check if this is the first teacher, i.e., captain)
    // - The teacher doc
    let isCaptain = false;
    await admin_firestore.runTransaction(async (transaction) => {
      const [
        studentEnrollmentDocSnap,
        teacherTeamEnrollmentDocSnap,
        teamCollectionSnap,
        teacherDocSnap,
      ] = await Promise.all([
        transaction.get(studentEnrollmentDocRef),
        transaction.get(teacherTeamEnrollmentDocRef),
        transaction.get(teamCollectionRef),
        transaction.get(teacherDocRef),
      ]);

      // If the student isn’t enrolled in this class, return 404
      if (!studentEnrollmentDocSnap.exists) {
        throw { status: 404, message: "The student is not part of the class" };
      }

      // If the teacher doesn’t exist in this class, return 404
      if (!teacherDocSnap.exists) {
        throw { status: 404, message: "The teacher is not part of the class" };
      }

      // If the teacher is already in the student’s team, return 409 Conflict
      if (teacherTeamEnrollmentDocSnap.exists) {
        throw {
          status: 409,
          message: "The teacher is already part of the team",
        };
      }

      // Parse student and teacher data with Zod schemas for type safety
      const studentEnrollmentData = StudentEnrollment.schema.parse(
        studentEnrollmentDocSnap.data()
      );
      const teacherData = Teacher.schema.parse(teacherDocSnap.data());

      // Check if the student has enough credits to purchase this teacher
      // If not, return 402 Payment Required
      if (teacherData.price > studentEnrollmentData.credits) {
        throw {
          status: 402,
          message: "Insufficient credits to purchase teacher",
        };
      }

      isCaptain = teamCollectionSnap.empty; // The teacher becomes captain if this is the first teacher in the team
      // Add the teacher to the student’s team
      transaction
        .create(
          teacherTeamEnrollmentDocRef,
          TeamEnrollment.schema.parse({
            captain: isCaptain,
          })
        )
        .update(studentEnrollmentDocRef, {
          credits: FieldValue.increment(-teacherData.price),
          teacher_team_ids: FieldValue.arrayUnion(teacherDocRef.id),
        });
    });

    // If everything went fine, return success
    return {
      status: 200,
      data: {
        isCaptain,
      },
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(error);

    // On failure, return error info.
    // Defaults to 500 if status/message aren’t explicitly set
    return {
      status,
      message,
    };
  }
};

/**
 *
 * @param uid - The ID of the student
 * @param class_id - The ID of the class
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class or the teacher doesn't exist or the team collection is empty, status: 404.
 */
export const getTeamFromFirestore = cache(
  async (
    uid: string,
    class_id: string
  ): Promise<ReadOperationResult<TeamEnrollmentType[]>> => {
    const classDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id);
    const studentEnrollmentDocRef = classDocRef
      .collection(StudentEnrollment.collection)
      .doc(uid);
    const teamCollectionRef = studentEnrollmentDocRef.collection(
      TeamEnrollment.collection
    );
    try {
      const [classRes, studentEnrollmentRes, teamCollectionSnap] =
        await Promise.all([
          getClassFromFirestore(class_id),
          getStudentEnrollmentDataFromFirestore(class_id, uid),
          teamCollectionRef.get(),
        ]);

      if (classRes.status !== 200) {
        throw classRes;
      }
      if (studentEnrollmentRes.status !== 200) {
        throw studentEnrollmentRes;
      }
      if (teamCollectionSnap.empty) {
        throw {
          status: 404,
          message: "The team is empty",
        };
      }

      const team: TeamEnrollmentType[] = await Promise.all(
        teamCollectionSnap.docs.map(async (teamEnrollmentDoc) => {
          const res = await getTeacherTeamEnrollmentFromFirestore(
            uid,
            class_id,
            teamEnrollmentDoc.id
          );
          if (res.status !== 200) throw res;
          return {
            ...res.data,
            points: res.data.captain ? res.data.points * 2 : res.data.points,
          };
        })
      );

      return {
        status: 200,
        data: team,
      };
    } catch (error: any) {
      const status = error.status ?? 500;
      const message = error.message ?? "Internal server error";
      console.log(error);

      // On failure, return error info.
      // Defaults to 500 if status/message aren’t explicitly set
      return {
        status,
        message,
      };
    }
  }
);

/**
 * Retrieves the data of the teacher and the data about it's enrollment in the team of the specified student.
 * @param uid - The ID of the student
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class or the teacher or the student doesn't exist or the teacher is not part of the team, status: 404.
 */

export const getTeacherTeamEnrollmentFromFirestore = async (
  uid: string,
  class_id: string,
  teacher_id: string
): Promise<ReadOperationResult<TeamEnrollmentType>> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const studentEnrollmentDocRef = classDocRef
    .collection(StudentEnrollment.collection)
    .doc(uid);
  const teacherTeamDocRef = studentEnrollmentDocRef
    .collection(TeamEnrollment.collection)
    .doc(teacher_id);
  try {
    const [classRes, studentEnrollmentRes, teacherRes, teacherTeamDocSnap] =
      await Promise.all([
        getClassFromFirestore(class_id),
        getStudentEnrollmentDataFromFirestore(class_id, uid),
        getClassTeacherFromFirestore(class_id, teacher_id),
        teacherTeamDocRef.get(),
      ]);

    if (classRes.status !== 200) {
      throw classRes;
    }
    if (studentEnrollmentRes.status !== 200) {
      throw studentEnrollmentRes;
    }
    if (teacherRes.status !== 200) {
      throw teacherRes;
    }
    if (!teacherTeamDocSnap.exists) {
      throw {
        status: 404,
        message: "The team is empty",
      };
    }

    return {
      status: 200,
      data: {
        ...teacherRes.data,
        ...TeamEnrollment.schema.parse(teacherTeamDocSnap.data()),
      },
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(error);

    // On failure, return error info.
    // Defaults to 500 if status/message aren’t explicitly set
    return {
      status,
      message,
    };
  }
};

/**
 * Removes a teacher from the team of the specified student.
 * @param uid - The ID of the student
 * @param class_id - The ID of the class
 * @param teacher_id - The ID of the teacher
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class or the teacher doesn't exist or the team collection is empty, status: 404.
 */
export const removeTeacherFromTeamInFirestore = async (
  uid: string,
  class_id: string,
  teacher_id: string
): Promise<WriteOperationResult> => {
  // Reference to the student's enrollment document in this class
  const studentEnrollmentDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(StudentEnrollment.collection)
    .doc(uid);

  const teacherTeamDocRef = studentEnrollmentDocRef
    .collection(TeamEnrollment.collection)
    .doc(teacher_id);

  try {
    await admin_firestore.runTransaction(async (t) => {
      const [studentEnrollmentRes, teacherRes, teamEnrollmentRes] =
        await Promise.all([
          getStudentEnrollmentDataFromFirestore(class_id, uid),
          getClassTeacherFromFirestore(class_id, teacher_id),
          getTeacherTeamEnrollmentFromFirestore(uid, class_id, teacher_id),
        ]);

      if (studentEnrollmentRes.status !== 200) {
        throw studentEnrollmentRes;
      }
      if (teacherRes.status !== 200) {
        throw teacherRes;
      }
      if (teamEnrollmentRes.status !== 200) {
        throw teamEnrollmentRes;
      }
      if (teamEnrollmentRes.data.captain) {
        throw {
          status: 400,
          message: "This teacher is the captain and cannot be removed.",
        };
      }

      t.update(studentEnrollmentDocRef, {
        teacher_team_ids: FieldValue.arrayRemove(teacher_id),
        credits: FieldValue.increment(teacherRes.data.price),
      }).delete(teacherTeamDocRef);
    });
    return { status: 200 };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(error);

    // On failure, return error info.
    // Defaults to 500 if status/message aren’t explicitly set
    return {
      status,
      message,
    };
  }
};
