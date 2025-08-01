
import { FieldPath } from "firebase-admin/firestore";
import { admin_firestore } from "../firebase-connection";
import { Class, StudentEnrollment } from "../db.schema";
import { NextResponse } from "next/server";

export const getBestScore = async (
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

    const classDocData =
      (await enrollmentDoc.ref.parent.parent?.get())!.data()!;

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
};

export const getClassesEnrollmentCount = async (
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
};

export const getClassStats = async (class_id: string, uid: string): Promise<NextResponse> => {
  try {
    const studentDocSnap = await admin_firestore.collection(Class.collection).doc(class_id).collection(StudentEnrollment.collection).doc(uid).get();
    if (!studentDocSnap.exists) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 })
    }
    const data = StudentEnrollment.schema.parse(studentDocSnap.data())
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: `Error while retrieving data for student ${uid} from class ${class_id}` }, { status: error?.code || 500 })
  }
}