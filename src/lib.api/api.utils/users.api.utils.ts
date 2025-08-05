
import { cache } from "react";
import { admin_firestore } from "../firebase-connection";
import { StudentEnrollment } from "../schema.db";

/**
 * Searches all the user's classes to find the one with the best score.
 * If the query throws an error, -1 is returned as the score,
 * abling the API endpoint "global-stats" to retrieve this data and the classes count at once.
 * @param uid string representing the user identifier
 * @returns a promise to return the best score and the class name with the appropriate error handling
 */
export const getBestScoreFromFirestore = cache(async (
  uid: string
): Promise<{ points: number; className: string }> => {
  try {
    //* Retrieve the enrollment with the highest score
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(StudentEnrollment.collection)
      .where("uid", "==", uid)
      .orderBy("points", "desc")
      .limit(1)
      .get();

    const enrollmentDoc = enrollmentSnapshot.docs[0];
    const enrollmentDocData = enrollmentDoc.data();

    const classDocRef = enrollmentDoc.ref.parent.parent!;
    const classDocData =
      (await classDocRef.get()).data()!;

    const points = enrollmentDocData.points ?? 0;
    return {
      points: points,
      className: classDocData.class_name,
    };
  } catch (error) {
    console.error("Error fetching best score:", error);
    return {
      points: -1,
      className: "",
    };
  }
});

/**
 * Counts the classes the user is enrolled in.
 * If the query throws an error, -1 is returned as the count,
 * abling the API endpoint "global-stats" to retrieve this data and the user best score at once.
 * @param uid string representing the user identifier
 * @returns a promise to return the class count with the appropriate error handling
 */
export const getClassesEnrollmentCountFromFirestore = cache(async (
  uid: string
): Promise<number> => {
  try {
    const classesCount = (
      await admin_firestore
        .collectionGroup(StudentEnrollment.collection)
        .withConverter(StudentEnrollment.converter)
        .where("uid", "==", uid)
        .count()
        .get()
    ).data().count;

    return classesCount;
  } catch (error) {
    console.error("Error fetching best score:", error);
    return -1;
  }
});


