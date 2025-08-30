import { cache } from "react";
import { admin_firestore, admin_auth } from "../firebase-connection.server";
import {
  Class,
  StudentEnrollment,
  Teacher,
  TeamEnrollment,
} from "../schema.db";
import { MemberRowType } from "@/lib/data/types.data";
import { FieldPath } from "firebase-admin/firestore";
import { ReadOperationResult, WriteOperationResult } from "@/lib/types";

/**
 * Retrieves every member of an existing class from Firestore + Auth.
 * @param class_id - The ID of the class
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist or the class doesn't contain any event registations: 404.
 */
export const getClassMembersFromFirestore = cache(
  async (class_id: string): Promise<ReadOperationResult<MemberRowType[]>> => {
    try {
      // Get all student enrollments ordered by points desc
      const membersEnrollmentSnapshot = await admin_firestore
        .collection(Class.collection)
        .doc(class_id)
        .collection(StudentEnrollment.collection)
        .get();

      if (membersEnrollmentSnapshot.empty) {
        throw {
          status: 404,
          message: "The class has no members",
        };
      }

      // Extract UIDs from enrollment docs. Format: {uid:string}[] because of how the firebase auth sdk works
      const uids = membersEnrollmentSnapshot.docs.map((doc) => {
        return { uid: doc.id };
      });

      // Fetch user accounts in bulk
      const getUserResult = await admin_auth.getUsers(uids);

      // Defensive: If users length mismatches enrollment, map by UID instead
      const userMap = new Map(
        getUserResult.users.map((user) => [user.uid, user])
      );

      // Combine Firestore + Auth data
      const members: MemberRowType[] = [];

      for (const enrollmentDoc of membersEnrollmentSnapshot.docs) {
        const enrollmentData = StudentEnrollment.schema.parse(
          enrollmentDoc.data()
        );
        const totalPoints =
          await calculatePointsBasedOnTeachersInTeamInFirestore(
            enrollmentDoc.id,
            class_id
          );

        const user = userMap.get(enrollmentDoc.id);

        if (!user) {
          console.warn(
            `[getClassMembersFromFirestore] Missing auth user for uid ${enrollmentDoc.id}`
          );
          continue;
        }

        members.push({
          display_name: user.displayName ?? "No name",
          photo_URL: user.photoURL ?? "",
          credits: enrollmentData.credits ?? 0,
          points: totalPoints ?? 0,
          admin: enrollmentData.admin ?? false,
          email: user.providerData[0].email ?? "No email",
          uid: user.uid,
        });
      }

      return { status: 200, data: members.sort((a, b) => b.points - a.points) };
    } catch (error: any) {
      const status = error.status ?? 500;
      const message =
        error.message ?? "Error while deleting the event template";
      console.log(error);

      return {
        status,
        message,
      };
    }
  }
);

/**
 * Makes a member admin in a class by setting admin = true in enrollment doc.
 * @param uid - The ID of the user to make admin
 * @param class_id - The ID of the class in which the user is part
 * @returns - Successful state operation result, an error with it's status code and message otherwise. If the class or the student doesn't exist, status: 404.
 */
export const makeUserAdminInFirestore = async (
  uid: string,
  class_id: string
): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const studentDocRef = classDocRef
    .collection(StudentEnrollment.collection)
    .doc(uid);
  try {
    const [classDocSnap, studentDocSnap] = await Promise.all([
      classDocRef.get(),
      studentDocRef.get(),
    ]);

    if (!classDocSnap.exists) {
      throw {
        status: 404,
        message: "The class doesn't exist.",
      };
    }
    if (!studentDocSnap.exists) {
      throw {
        status: 404,
        message: "The student doesn't exist.",
      };
    }

    await studentDocRef.update({ admin: true });
    return {
      status: 200,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(error);

    return {
      status,
      message,
    };
  }
};

/**
 * Calculates the total points for a student's teacher team in a class.
 * The captain's points are doubled. Returns 0 if the team is empty.
 *
 * Throws a 500 error if the team is in an invalid state (no captain).
 *
 * @param uid - The student's ID
 * @param class_id - The class ID
 * @returns - Total points for the team, or undefined on error
 *
 */
export const calculatePointsBasedOnTeachersInTeamInFirestore = cache(
  async (uid: string, class_id: string): Promise<number | undefined> => {
    const studentEnrollmentDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(StudentEnrollment.collection)
      .doc(uid);

    try {
      // Fetch the student enrollment document
      const studentEnrollmentDocSnap = await studentEnrollmentDocRef.get();
      const studentEnrollmentData = StudentEnrollment.schema.parse(
        studentEnrollmentDocSnap.data()
      );

      const teachersInTeam = studentEnrollmentData.teacher_team_ids;

      // Return 0 if the team has no teachers
      if (teachersInTeam.length === 0) {
        return 0;
      }

      // Fetch teacher documents and the captain in parallel
      const [teacherDocsSnap, teamCaptainSnap] = await Promise.all([
        admin_firestore
          .collection(Class.collection)
          .doc(class_id)
          .collection(Teacher.collection)
          .where(FieldPath.documentId(), "in", teachersInTeam)
          .get(),

        studentEnrollmentDocRef
          .collection(TeamEnrollment.collection)
          .where(FieldPath.documentId(), "in", teachersInTeam)
          .where("captain", "==", true)
          .limit(1)
          .get(),
      ]);

      // Ensure a captain exists; otherwise, throw a 500 error
      if (teamCaptainSnap.empty) {
        throw {
          status: 500,
          message: "Invalid team state: no captain found for the student team",
        };
      }
      const teamCaptainId = teamCaptainSnap.docs[0].id;

      // Calculate total points, doubling the captain's points
      const totalPoints = teacherDocsSnap.docs.reduce((sum, doc) => {
        const isCaptain = doc.id === teamCaptainId;
        const data = Teacher.schema.parse(doc.data());
        return sum + (isCaptain ? data.points * 2 : data.points ?? 0);
      }, 0);

      return totalPoints;
    } catch (error) {
      console.error("Error calculating points for team:", {
        uid,
        class_id,
        error,
      });
      return undefined;
    }
  }
);
