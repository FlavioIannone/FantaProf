
import { FirebaseCollections } from "@/lib/types";
import { admin_firestore } from "../firebase-connection";

export const getBestScore = async (
  uid: string
): Promise<{ points: number; className: string }> => {
  try {
    //* Retrieve the enrollment with the highest score
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(FirebaseCollections.STUDENT_ENROLLMENTS)
      .where("uid", "==", uid)
      .orderBy("points", "desc")
      .limit(1)
      .get();

    const enrollmentDoc = enrollmentSnapshot.docs[0];
    const enrollmentDocData = enrollmentDoc.data();

    const classDocData =
      (await enrollmentDoc.ref.parent.parent?.get())!.data()!;

    const points = enrollmentDocData.points ?? 0;
    return {
      points: points,
      className: classDocData.class_name,
    };
  } catch (error) {
    // console.error("Error fetching best score:", error);
    return {
      points: -1,
      className: "",
    };
  }
};

export const getClassesEnrollmentCount = async (
  uid: string
): Promise<number> => {
  try {
    const classesCount = (
      await admin_firestore
        .collectionGroup(FirebaseCollections.STUDENT_ENROLLMENTS)
        .where("uid", "==", uid)
        .count()
        .get()
    ).data().count;

    return classesCount;
  } catch (error) {
    console.error("Error fetching best score:", error);
    return -1;
  }
};
