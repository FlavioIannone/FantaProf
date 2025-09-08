import { cache } from "react";
import { admin_firestore } from "../firebase-connection.server";
import { Class, StudentEnrollment } from "../schema.db";
import z from "zod";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "./members.db.utils";
import { ReadOperationResult } from "@/lib/types";

type StudentEnrollmentType = Omit<
  z.infer<typeof StudentEnrollment.schema>,
  "team"
>;

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

/**
 * Retrieves the student enrollment data for a user in a specific class.
 * @param class_id - Class identifier
 * @param uid - User identifier
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the student or the class doesn't exist, status: 404.
 */
export const getStudentEnrollmentDataFromFirestore = async (
  class_id: string,
  uid: string
): Promise<ReadOperationResult<StudentEnrollmentType>> => {
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
        message: "The class doesn't exist",
      };
    }
    if (!studentDocSnap.exists) {
      throw {
        status: 404,
        message: "The student doesn't exist",
      };
    }

    return {
      status: 200,
      data: StudentEnrollment.schema.parse(studentDocSnap.data()),
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(`Fn: getStudentEnrollmentDataFromFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};
