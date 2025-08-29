import {
  Class,
  StudentEnrollment,
  Teacher,
  TeacherTeamEnrollment,
} from "../schema.db";
import { admin_firestore } from "../firebase-connection.server";
import { WriteOperationResult } from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";

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
    TeacherTeamEnrollment.collection
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
          TeacherTeamEnrollment.schema.parse({
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
