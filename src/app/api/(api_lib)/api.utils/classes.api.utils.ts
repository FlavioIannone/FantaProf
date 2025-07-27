// Import necessary libraries and types
import { NextResponse } from "next/server";
import { admin_auth, admin_firestore } from "../firebase-connection";
import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirebaseCollections } from "@/lib/types";
import {
  ClassesTableRow,
  MembersTableRow,
} from "@/app/dashboard/(queryHandlers)/handlers";
import { studentEnrollmentConverter, classConverter } from "../schema.db";


//======================== CREATE CLASS ========================//

/**
 * Creates a new class and enrolls the user who created it as admin.
 */
export const createClass = async ({
  uid,
  classData,
}: {
  uid: string;
  classData: {
    class_name: string;
    initial_credits: number;
  };
}): Promise<NextResponse> => {
  const batch = admin_firestore.batch(); // Start a batch write for atomic operation

  // Create a new document reference for the class
  const classDocRef = admin_firestore
    .collection(FirebaseCollections.CLASSES)
    .doc();

  // Create a document reference for the student enrollment inside the new class
  const studentEnrollmentDocRef = admin_firestore
    .collection(FirebaseCollections.CLASSES)
    .doc(classDocRef.id)
    .collection(FirebaseCollections.STUDENT_ENROLLMENTS)
    .doc(uid);


  const classDocData = classConverter.toFirestore({
    ...classData,
    members: 1,
    createdAt: FieldValue.serverTimestamp()
  });
  // Add the class creation to the batch
  batch.create(classDocRef, { ...classDocData, createdAt: FieldValue.serverTimestamp() });


  const studentEnrollmentDocData = studentEnrollmentConverter.toFirestore({
    uid: uid,
    admin: true, // The creator is the admin
    credits: classData.initial_credits,
    points: 0,
    createdAt: FieldValue.serverTimestamp()
  });

  // Add the student enrollment creation to the batch
  batch.create(studentEnrollmentDocRef, {
    ...studentEnrollmentDocData,
    createdAt: FieldValue.serverTimestamp(),

  });

  try {
    await batch.commit(); // Commit the batch
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  } finally {
    // Redirect the user to the new class dashboard
    return NextResponse.redirect(
      new URL(`/dashboard/classes/${classDocRef.id}`, process.env.BASE_URL)
    );
  }
};

//======================== GET ALL CLASSES FOR A USER ========================//

/**
 * Retrieves all classes a user is enrolled in.
 */
export const getClasses = async (uid: string): Promise<NextResponse> => {
  try {
    // Get all student enrollment documents across all classes for the user
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(FirebaseCollections.STUDENT_ENROLLMENTS)
      .withConverter(studentEnrollmentConverter)
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    // Map the student enrollment data
    const enrollmentDocsData = enrollmentSnapshot.docs.map(
      (doc) => (doc.data())
    );

    // Get parent class document references for each enrollment
    const classRefs = enrollmentSnapshot.docs
      .map((doc) => doc.ref.parent.parent)
      .filter((ref) => ref !== null);

    // Return 404 if no classes are found
    if (classRefs.length === 0) {
      return NextResponse.json(
        { message: `No classes found for this user ${uid}` },
        { status: 404 }
      );
    }

    try {
      // Fetch all class documents in parallel
      const classSnapshots = await admin_firestore.getAll(...classRefs);

      // Merge class data with enrollment data to build UI-friendly rows
      const classes: ClassesTableRow[] = classSnapshots.map((doc, index) => {
        const data = classConverter.fromFirestore(doc as QueryDocumentSnapshot);
        return {
          class_id: doc.id,
          class_name: data.class_name,
          members: data.members,
          points: enrollmentDocsData[index].points,
          credits: enrollmentDocsData[index].credits,
          admin: enrollmentDocsData[index].admin,
        };
      });

      return NextResponse.json({ classes }, { status: 200 });

    } catch (error) {
      console.log(error);

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

//======================== GET SINGLE CLASS DATA ========================//

/**
 * Fetch a specific class by its ID.
 */
export const getClass = async (class_id: string): Promise<NextResponse> => {
  try {
    const classDoc = await admin_firestore
      .collection(FirebaseCollections.CLASSES)
      .withConverter(classConverter)
      .doc(class_id)
      .get();

    if (!classDoc.exists) {
      return NextResponse.json(
        { message: "Class not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classDoc.data(), { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error while retrieving the class" },
      { status: 500 }
    );
  }
};

//======================== GET CLASS MEMBERS ========================//

/**
 * Get all members of a specific class and return their user info.
 */
export const getClassMembers = async (
  class_id: string
): Promise<NextResponse> => {
  // Get all student enrollment docs for the class, ordered by points
  const membersEnrollmentPromise = admin_firestore
    .collection(
      `${FirebaseCollections.CLASSES}/${class_id}/${FirebaseCollections.STUDENT_ENROLLMENTS}`
    ).withConverter(studentEnrollmentConverter)
    .orderBy("points", "desc")
    .get();


  // Get user account info from Firebase Auth based on UIDs
  const authPromise = membersEnrollmentPromise.then(snapshot =>
    admin_auth.getUsers(snapshot.docs.map(doc => ({ uid: doc.data().uid })))
  );

  const [membersEnrollmentSnapshot, getUserResult] = await Promise.all([membersEnrollmentPromise, authPromise])


  const membersEnrollment = membersEnrollmentSnapshot.docs;
  // Combine Firestore data with Auth user data
  return NextResponse.json({
    members: getUserResult.users.map((user, index) => {
      const member = (membersEnrollment[index].data());
      const classMember: MembersTableRow = {
        display_name: user.displayName ?? "No name",
        photo_URL: user.photoURL ?? "",
        credits: member.credits,
        points: member.points,
        admin: member.admin,
      };
      return classMember;
    }),
  });
};

//======================== JOIN A CLASS ========================//

/**
 * Enroll a user into an existing class.
 */
export const joinClass = async (
  class_id: string,
  uid: string
): Promise<NextResponse> => {
  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const classRef = admin_firestore.doc(`${FirebaseCollections.CLASSES}/${class_id}`);
      const enrollmentRef = admin_firestore.doc(`${classRef.path}/${FirebaseCollections.STUDENT_ENROLLMENTS}/${uid}`);

      // Fetch both class and enrollment documents in parallel
      const [classSnap, enrollmentSnap] = await Promise.all([
        transaction.get(classRef),
        transaction.get(enrollmentRef)
      ]);

      // Error if class does not exist
      if (!classSnap.exists) {
        throw {
          status: 404,
          message: `Class ${class_id} doesn't exist`
        };
      }

      // Error if user already enrolled
      if (enrollmentSnap.exists) {
        throw {
          status: 409,
          message: `User ${uid} is already enrolled in class ${class_id}`
        };
      }

      const classData = classConverter.fromFirestore(classSnap as QueryDocumentSnapshot);

      // Create new student enrollment data
      const newStudent = studentEnrollmentConverter.toFirestore({
        uid,
        credits: classData.initial_credits,
        admin: false,
        createdAt: FieldValue.serverTimestamp(),
        points: 0
      });

      // Create enrollment doc and increment member count
      transaction.create(enrollmentRef, newStudent)
        .update(classRef, {
          members: FieldValue.increment(1)
        });
    });

    return NextResponse.json({ message: "Successfully joined the class" }, { status: 200 });

  } catch (error: any) {
    const status = error?.status ?? 500;
    const message = error?.message ?? "Internal server error";

    return NextResponse.json({ message }, { status });
  }
};
