import { cache } from "react";
import { admin_firestore } from "../firebase-connection.server";
import { Class, StudentEnrollment } from "../schema.db";
import z from "zod";

/**
 * Retrieves the class where the user has the highest score.
 * Returns `{ points: -1, className: "" }` on error to allow combined stats fetching.
 * @param uid - User identifier
 * @returns Promise resolving to the highest points and class name
 */
export const getBestScoreFromFirestore = cache(async (
  uid: string
): Promise<{ points: number; className: string }> => {
  try {
    // Query enrollments for the user, ordered by points descending, limit 1
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(StudentEnrollment.collection)
      .select(
        "points"
      )
      .where("uid", "==", uid)
      .orderBy("points", "desc")
      .limit(1)
      .get();

    if (enrollmentSnapshot.empty) {
      return { points: 0, className: "" };
    }

    const enrollmentDoc = enrollmentSnapshot.docs[0];
    const enrollmentData = enrollmentDoc.data();

    // Get the parent class document
    const classDocRef = enrollmentDoc.ref.parent.parent;
    if (!classDocRef) {
      throw new Error("Parent class reference not found");
    }

    const classDocSnap = await classDocRef.get();
    if (!classDocSnap.exists) {
      throw new Error("Parent class document does not exist");
    }

    const classData = classDocSnap.data();

    return {
      points: enrollmentData.points ?? 0,
      className: classData?.class_name ?? "",
    };
  } catch (error) {
    console.error("[getBestScoreFromFirestore] Error fetching best score:", error);
    return {
      points: -1,
      className: "",
    };
  }
});

/**
 * Counts how many classes the user is enrolled in.
 * Returns -1 on error to allow combined stats fetching.
 * @param uid - User identifier
 * @returns Promise resolving to the count of classes
 */
export const getClassesEnrollmentCountFromFirestore = cache(async (
  uid: string
): Promise<number> => {
  try {
    const countSnapshot = await admin_firestore
      .collectionGroup(StudentEnrollment.collection)
      .where("uid", "==", uid)
      .count()
      .get();

    return countSnapshot.data().count ?? 0;
  } catch (error) {
    console.error("[getClassesEnrollmentCountFromFirestore] Error fetching class count:", error);
    return -1;
  }
});

type StudentEnrollmentType = Omit<z.infer<typeof StudentEnrollment.schema>,"team">;

/**
 * Retrieves the student enrollment data for a user in a specific class.
 * @param class_id - Class identifier
 * @param uid - User identifier
 * @returns Promise resolving to StudentEnrollment data or undefined if not found/error
 */
export const getStudentEnrollmentDataFromFirestore = async (
  class_id: string,
  uid: string
): Promise<StudentEnrollmentType | undefined> => {
  try {
    const studentDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(StudentEnrollment.collection)
      .doc(uid);

    const studentDocSnap = await studentDocRef.get();

    if (!studentDocSnap.exists) {
      return undefined;
    }

    return StudentEnrollment.schema.parse(studentDocSnap.data());
  } catch (error) {
    console.error("[getStudentEnrollmentDataFromFirestore] Error fetching enrollment data:", error);
    return undefined;
  }
};
