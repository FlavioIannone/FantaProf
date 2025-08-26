import { cache } from "react";
import { admin_firestore } from "../firebase-connection.server";
import { Class, StudentEnrollment } from "../schema.db";
import z from "zod";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "./members.db.utils";

/**
 * Retrieves the class where the user has the highest score.
 * Returns `{ points: -1, className: "" }` on error to allow combined stats fetching.
 * @param uid - User identifier
 * @returns Promise resolving to the highest points and class name
 */
export const getBestScoreFromFirestore = cache(
  async (uid: string): Promise<{ points: number; className: string }> => {
    try {
      const enrollmentSnapshot = await admin_firestore
        .collectionGroup(StudentEnrollment.collection)
        .where("uid", "==", uid)
        .get();

      if (enrollmentSnapshot.empty) {
        return { points: -1, className: "" };
      }

      const classesScore = await Promise.all(
        enrollmentSnapshot.docs.map(async (doc) => {
          const classDocRef = doc.ref.parent.parent;
          if (!classDocRef) throw new Error("Parent class reference not found");

          const [points, classDocSnap] = await Promise.all([
            calculatePointsBasedOnTeachersInTeamInFirestore(
              uid,
              classDocRef.id
            ),
            classDocRef.get(),
          ]);

          if (points === undefined)
            throw new Error("Error while calculating the points");
          if (!classDocSnap.exists) throw new Error("Class document not found");

          return {
            points,
            class_name: Class.schema.parse(classDocSnap.data()).class_name,
          };
        })
      );

      const bestScore = classesScore.reduce(
        (prev, curr) => (curr.points > prev.points ? curr : prev),
        classesScore[0]
      );

      return {
        points: bestScore.points,
        className: bestScore.class_name,
      };
    } catch (error) {
      console.error(
        "[getBestScoreFromFirestore] Error fetching best score:",
        error
      );
      return { points: -1, className: "" };
    }
  }
);

/**
 * Counts how many classes the user is enrolled in.
 * Returns -1 on error to allow combined stats fetching.
 * @param uid - User identifier
 * @returns Promise resolving to the count of classes
 */
export const getClassesEnrollmentCountFromFirestore = cache(
  async (uid: string): Promise<number> => {
    try {
      const countSnapshot = await admin_firestore
        .collectionGroup(StudentEnrollment.collection)
        .where("uid", "==", uid)
        .count()
        .get();

      return countSnapshot.data().count ?? 0;
    } catch (error) {
      console.error(
        "[getClassesEnrollmentCountFromFirestore] Error fetching class count:",
        error
      );
      return -1;
    }
  }
);

type StudentEnrollmentType = Omit<
  z.infer<typeof StudentEnrollment.schema>,
  "team"
>;

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
    console.error(
      "[getStudentEnrollmentDataFromFirestore] Error fetching enrollment data:",
      error
    );
    return undefined;
  }
};
