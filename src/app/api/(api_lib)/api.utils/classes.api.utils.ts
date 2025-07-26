import { NextResponse } from "next/server";
import { admin_auth, admin_firestore } from "../firebase-connection";
import { FieldValue } from "firebase-admin/firestore";
import { FirebaseCollections } from "@/lib/types";
import { ClassData, StudentEnrollment } from "../schema.db";
import {
  ClassesTableRow,
  MembersTableRow,
} from "@/app/dashboard/(queryHandlers)/handlers";

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
    const enrollmentDocsData = enrollmentSnapshot.docs.map(
      (value) => value.data() as StudentEnrollment
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
      const classes: ClassesTableRow[] = classSnapshots.map((doc, index) => {
        const data = doc.data() as ClassData;
        return {
          class_id: doc.id,
          class_name: data.class_name,
          members: data.members,
          points: enrollmentDocsData[index].points,
          credits: enrollmentDocsData[index].credits,
          admin: enrollmentDocsData[index].admin,
        };
      });
      // return classes
      return NextResponse.json(
        {
          classes: classes,
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

export const getClassMembers = async (
  class_id: string
): Promise<NextResponse> => {
  const membersEnrollmentSnapshot = await admin_firestore
    .collection(
      `${FirebaseCollections.CLASSES}/${class_id}/${FirebaseCollections.STUDENT_ENROLLMENTS}`
    )
    .orderBy("points", "desc")
    .get();
  const membersEnrollment = membersEnrollmentSnapshot.docs;

  const getUserResult = await admin_auth.getUsers(
    membersEnrollment.map((member) => {
      const data: StudentEnrollment = member.data() as StudentEnrollment;
      return { uid: data.uid };
    })
  );

  return NextResponse.json({
    members: getUserResult.users.map((user, index) => {
      const member = membersEnrollment[index].data() as StudentEnrollment;
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

export const joinClass = async (class_id: string, uid: string): Promise<NextResponse> => {
  let status = 200;
  let message = "OK"
  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const newStudentEnrollmentDocRef = admin_firestore.doc(`${FirebaseCollections.CLASSES}/${class_id}/${FirebaseCollections.STUDENT_ENROLLMENTS}/${uid}`);
      const enrollmentDoc = await transaction.get(newStudentEnrollmentDocRef)
      if (enrollmentDoc.exists) {
        status = 404;
        message = `The user is already member of the class ${class_id}`
        throw Error();
      }

      const classDocRef = admin_firestore.doc(`${FirebaseCollections.CLASSES}/${class_id}`)
      const classDoc = await transaction.get(classDocRef);
      if (!classDoc.exists) {
        status = 404;
        message = `The class ${class_id} doesn't exist`
        throw Error();
      }

      const newStudent: StudentEnrollment = {
        uid: uid,
        credits: (classDoc.data() as ClassData).initial_credits,
        admin: false,
        createdAt: FieldValue.serverTimestamp(),
        points: 0
      }
      transaction.create(newStudentEnrollmentDocRef, newStudent).update(classDocRef, {
        members: FieldValue.increment(1)
      })

    })
  } catch (error) {
    return NextResponse.json({
      message: message
    }, {
      status: status
    })
  }
  return NextResponse.json({
    message: message
  }, {
    status: status
  })
}