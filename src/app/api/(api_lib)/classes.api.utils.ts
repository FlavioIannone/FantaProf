import { NextResponse } from "next/server";
import { admin_firestore } from "./firebase-connection";
import { FieldValue } from "firebase-admin/firestore";
import { FirebaseCollections } from "@/lib/types";
// Class doc type
export type ClassData = {
  name: string;
  initial_credits: number;
  createdAt: FieldValue; // Server timestamp
};

// Student enrollment doc type
export type StudentEnrollment = {
  uid: string;
  credits: number;
  admin: boolean;
  createdAt: FieldValue; // Server timestamp
};

export const createClass = async ({
  uid,
  classData,
}: {
  uid: string;
  classData: {
    name: string;
    initial_credits: number;
  };
}): Promise<NextResponse> => {
  const batch = admin_firestore.batch();

  //* Reference to the new class document
  const classDocRef = admin_firestore
    .collection(FirebaseCollections.CLASSES)
    .doc();

  //* Reference to the student enrollment document
  const studentEnrollmentDocRef = admin_firestore
    .collection(FirebaseCollections.CLASSES) // Create the student enrollment collection into the class document
    .doc(classDocRef.id)
    .collection(FirebaseCollections.STUDENT_ENROLLMENTS)
    .doc(uid);

  //* Create the class document
  batch.create(classDocRef, {
    ...classData,
    members: 1,
    createdAt: FieldValue.serverTimestamp(),
  });

  //* Create the student enrollment document
  batch.create(studentEnrollmentDocRef, {
    uid: uid,
    admin: true,
    credits: classData.initial_credits,
    points: 0,
    createdAt: FieldValue.serverTimestamp(),
  });

  try {
    await batch.commit();
    return NextResponse.redirect(
      new URL(`/dashboard/classes/${classDocRef.id}`, process.env.BASE_URL)
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
};

export const getClasses = async (uid: string): Promise<NextResponse> => {
  try {
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(FirebaseCollections.STUDENT_ENROLLMENTS) // Get all collections with this name
      .where("uid", "==", uid) // and that has a given uid
      .orderBy("createdAt", "desc") // order by creation timestamp, desc
      .get();
    const enrollmentDocsData = enrollmentSnapshot.docs.map((value) =>
      value.data()
    );
    // Extract the parent
    const classRefs = enrollmentSnapshot.docs
      .map((doc) => doc.ref.parent.parent) // first parent STUDENT_ENROLLMENTS collection, second parent CLASSES collection
      .filter((ref) => ref !== null); // where the ref to a class is not null

    // If no classes where found
    if (classRefs.length === 0) {
      return NextResponse.json(
        { message: "No classes found for this user" },
        { status: 404 }
      );
    }

    try {
      // Fetch all class documents in parallel
      const classSnapshots = await admin_firestore.getAll(...classRefs);

      // return classes
      return NextResponse.json(
        {
          classes: classSnapshots.map((doc, index) => ({
            id: doc.id,
            ...doc.data(),
            points: enrollmentDocsData[index].points,
            credits: enrollmentDocsData[index].credits,
          })),
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error while retrieving classes" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error while retrieving student enrollments" },
      { status: 500 }
    );
  }
};

export const getClass = async (class_id: string): Promise<NextResponse> => {
  try {
    const classDoc = await admin_firestore
      .collection(FirebaseCollections.CLASSES)
      .doc(class_id)
      .get();
    if (!classDoc.exists) {
      return NextResponse.json(
        {
          message: "Class not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        ...classDoc.data(),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while retrieving the class",
      },
      {
        status: 500,
      }
    );
  }
};
