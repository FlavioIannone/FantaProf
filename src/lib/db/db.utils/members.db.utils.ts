import { cache } from "react";
import { admin_firestore, admin_auth } from "../firebase-connection.server";
import {
  Class,
  StudentEnrollment,
  Teacher,
  TeacherTeamEnrollment,
} from "../schema.db";
import { MembersTableRowType } from "@/lib/data/types.data";
import { FieldPath } from "firebase-admin/firestore";

/**
 * Retrieves every member of an existing class from Firestore + Auth.
 */
export const getClassMembersFromFirestore = cache(
  async (class_id: string): Promise<MembersTableRowType[] | undefined> => {
    try {
      // Get all student enrollments ordered by points desc
      const membersEnrollmentSnapshot = await admin_firestore
        .collection(Class.collection)
        .doc(class_id)
        .collection(StudentEnrollment.collection)
        .orderBy("points", "desc")
        // TODO: Modify logic, implement a new field in student enrollment to hold the id of the class, for faster query
        .get();

      if (membersEnrollmentSnapshot.empty) {
        return [];
      }

      // Extract UIDs from enrollment docs
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
      const members: MembersTableRowType[] = [];

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
          email: user.email ?? "No email",
          uid: user.uid,
        });
      }

      return members;
    } catch (err) {
      console.error("[getClassMembersFromFirestore]", err);
      return undefined;
    }
  }
);

/**
 * Makes a member admin in a class by setting admin = true in enrollment doc.
 * @param uid - The ID of the user to make admin
 * @param class_id - The ID of the class in which the user is part
 * @returns - A boolean that tells if the operation was successful or not
 */
export const makeUserAdminInFirestore = async (
  uid: string,
  class_id: string
): Promise<boolean> => {
  try {
    const studentDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(StudentEnrollment.collection)
      .doc(uid);

    await studentDocRef.update({ admin: true });
    return true;
  } catch (err) {
    console.error("[makeUserAdminInFirestore]", err);
    return false;
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
          .collection(TeacherTeamEnrollment.collection)
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
