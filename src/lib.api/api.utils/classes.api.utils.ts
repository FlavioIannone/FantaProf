// Import necessary libraries and types
import { NextResponse } from "next/server";
import { admin_auth, admin_firestore } from "../firebase-connection";
import { FieldPath, FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Class, StudentEnrollment, Teacher } from "../schema.db";
import { ClassesTableRowType, MembersTableRowType, TeacherTableRowType } from "@/lib/data/types.data-layer";
import z from "zod";
import { cache } from "react";


export type TeacherDataInput = { name: string, surname: string, description?: string, price: number }

type WriteOperationResult = {
  successful: true
} | {
  successful: false,
  message: string,
  status: number
}

/**
 * Creates a class with it's corresponding data
 * @param uid string representing the user identifier
 * @param classData the class data to register the class with
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const createClassInFirestore = async (uid: string, classData: { class_name: string; initial_credits: number; }): Promise<boolean> => {
  const batch = admin_firestore.batch(); // Start a batch write for atomic operation

  // Create a new document reference for the class
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc();

  // Create a document reference for the student enrollment inside the new class
  const studentEnrollmentDocRef = admin_firestore
    .collection(Class.collection)
    .doc(classDocRef.id)
    .collection(StudentEnrollment.collection)
    .doc(uid);

  try {
    const classDocData = Class.converter.toFirestore({
      ...classData,
    });
    // Add the class creation to the batch
    batch.create(classDocRef, classDocData);


    const studentEnrollmentDocData = StudentEnrollment.converter.toFirestore({
      uid: uid,
      admin: true, // The creator is the admin
      credits: classData.initial_credits,
      team: []
    });

    // Add the student enrollment creation to the batch
    batch.create(studentEnrollmentDocRef, studentEnrollmentDocData);

    await batch.commit(); // Commit the batch
    // Redirect the user to the new class dashboard
    return true
  } catch (error) {
    console.log(error);
    return false
  }
};

/**
 * Retrieves all the classes the user is enrolled in.
 * @param uid string representing the user identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const getClassesFromFirestore = cache(async (uid: string): Promise<ClassesTableRowType[] | undefined> => {
  try {

    // Get all student enrollment documents across all classes for the user
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(StudentEnrollment.collection)
      .where("uid", "==", uid)
      .orderBy("created_at", "desc")
      .get();

    // Map the student enrollment data
    const enrollmentDocsData = enrollmentSnapshot.docs.map(
      (doc) => StudentEnrollment.schema.parse(doc.data())
    );

    // Get parent class document references for each enrollment
    const classRefs = enrollmentSnapshot.docs
      .map((doc) => doc.ref.parent.parent)
      .filter((ref) => ref !== null);

    if (classRefs.length === 0) {
      return []
    }

    // Fetch all class documents in parallel
    const classSnapshots = await admin_firestore.getAll(...classRefs);

    // Merge class data with enrollment data to build UI-friendly rows
    const classes: ClassesTableRowType[] = classSnapshots.map((doc, index) => {
      const data = Class.schema.parse(doc.data());
      return {
        class_id: doc.id,
        class_name: data.class_name,
        members: data.members,
        points: enrollmentDocsData[index].points,
        credits: enrollmentDocsData[index].credits,
        admin: enrollmentDocsData[index].admin,
        teachers: data.teachers
      };
    });

    return classes;

  } catch (err) {
    console.log(err);

    return undefined
  }
})



/**
 * Retrieves the class data of a specified class
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const getClassFromFirestore = cache(async (class_id: string) => {
  try {
    const classDoc = await admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .get();

    if (!classDoc.exists) {
      throw new Error(`NOT_FOUND:Class ${class_id} not found`);
    }

    return Class.schema.parse(classDoc.data());

  } catch (error: any) {
    console.log(error);
    if (error.message.startsWith("NOT_FOUND")) {
      return undefined
    }

    return undefined;
  }
});

/**
 * Retrieves every member of an existing class.
 * Retrieves the users that are part of a class from the auth instance.
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const getClassMembersFromFirestore = cache(async (
  class_id: string
): Promise<MembersTableRowType[] | undefined> => {
  try {
    // Get all student enrollment docs for the class, ordered by points
    const membersEnrollmentPromise = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(StudentEnrollment.collection)
      .orderBy("points", "desc")
      .get();


    // Get user account info from Firebase Auth based on UIDs
    const authPromise = membersEnrollmentPromise.then(snapshot =>
      admin_auth.getUsers(
        snapshot.docs.map(
          doc => {
            const data = StudentEnrollment.schema.parse(doc.data());
            return ({ uid: data.uid })
          }
        )
      )
    );

    // Fetch in parallel
    const [membersEnrollmentSnapshot, getUserResult] = await Promise.all([membersEnrollmentPromise, authPromise])

    if (membersEnrollmentSnapshot.empty) {
      return []
    }

    const membersEnrollment = membersEnrollmentSnapshot.docs;

    // Combine Firestore data with Auth user data
    return getUserResult.users.map((user, index) => {
      const member = (membersEnrollment[index].data());
      const classMember: MembersTableRowType = {
        display_name: user.displayName ?? "No name",
        photo_URL: user.photoURL ?? "",
        credits: member.credits,
        points: member.points!,
        admin: member.admin!,
        email: user.email ?? "No email",
        uid: user.uid
      };
      return classMember;
    });
  } catch (err) {
    console.log(err);

    return undefined
  }
});

/**
 * Enrolls a student from a class.
 * @param uid string representing the user identifier
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const joinClassInFirestore = async (
  uid: string,
  class_id: string
): Promise<NextResponse> => {
  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const classRef = admin_firestore.doc(`${Class.collection}/${class_id}`);
      const enrollmentRef = admin_firestore.doc(`${classRef.path}/${StudentEnrollment.collection}/${uid}`);

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

      const classData = Class.converter.fromFirestore(classSnap as QueryDocumentSnapshot);

      // Create new student enrollment data
      const newStudent = StudentEnrollment.converter.toFirestore({
        uid,
        credits: classData.initial_credits,
        admin: false,
        points: 0,
        team: []
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

export const leaveClassInFirestore = async (uid: string, class_id: string): Promise<NextResponse> => {
  const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
  const studentDocRef = classDocRef.collection(StudentEnrollment.collection).doc(uid);
  try {
    await admin_firestore.runTransaction(async (tx) => {
      // 1: Get class data
      const classSnap = await tx.get(classDocRef);
      if (!classSnap.exists) {
        throw new Error(`NOT_FOUND:Class ${class_id} does not exist`);
      }

      // 2: Get student enrollment
      const studentSnap = await tx.get(studentDocRef);

      const classData = Class.schema.parse(classSnap.data());

      if (!studentSnap.exists) {
        throw new Error(`NOT_FOUND:User ${uid} is not part of the class ${class_id}`);
      }

      const studentData = StudentEnrollment.schema.parse(studentSnap.data());

      const classMemberCount = classData.members;

      // 2.1: If admin, ensure there's at least one other admin
      if (studentData.admin) {
        const adminsQuery = classDocRef
          .collection(StudentEnrollment.collection)
          .where("admin", "==", true)
          .where(FieldPath.documentId(), "!=", uid);

        const adminsSnap = await adminsQuery.count().get();
        const adminCount = adminsSnap.data().count;

        if (adminCount === 0 && classMemberCount > 1) {
          throw new Error(`CONFLICT:The user ${uid} is the only admin and cannot leave without another admin.`);
        }
      }

      tx.delete(studentDocRef)

      // 5. Delete student enrollment and decrement members count
      if (classMemberCount <= 1) {
        tx.delete(classDocRef); // Automatically deletes subcollections in Firestore
      } else {
        // Otherwise, decrement member count
        tx.update(classDocRef, {
          members: classMemberCount - 1,
        });
      }
    });



    return NextResponse.json({ message: `User ${uid} removed from class ${class_id}` }, { status: 200 });

  } catch (error: any) {
    if (error.message.startsWith("NOT_FOUND")) {
      return NextResponse.json({ message: error.message.split(":")[1] }, { status: 404 });
    }
    if (error.message.startsWith("CONFLICT")) {
      return NextResponse.json({ message: error.message.split(":")[1] }, { status: 409 });
    }

    console.error("Unexpected error in leaveClass:", error.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};


/**
 * Makes a member of an existing class admin
 * @param uid string representing the user identifier
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const makeUserAdmin = async (uid: string, class_id: string): Promise<boolean> => {
  try {
    admin_firestore.collection(Class.collection).doc(class_id).collection(StudentEnrollment.collection).withConverter(StudentEnrollment.converter).doc(uid).update({
      admin: true
    })
    return true
  } catch (err) {
    return false
  }
}

/**
 * Retrieves all the teachers of an existing class
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const getTeachersFromFirestore = cache(async (class_id: string): Promise<TeacherTableRowType[] | undefined> => {
  try {
    // Get the class document ref
    const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
    // Get the teachers collection ref
    const teachersCollectionRef = classDocRef.collection(Teacher.collection).orderBy("created_at", "desc");
    // Get the class document snap
    const classDocSnap = await classDocRef.get();
    // Get the teachers collection snap
    const teachersCollectionSnap = await teachersCollectionRef.get()
    if (!classDocSnap.exists) {
      // If the class doesn't exist
      return []
    }
    if (teachersCollectionSnap.empty) {
      // If the teachers collection is empty
      return []
    }
    // Map the teachers collection to retrieve the teachers data
    const teachers: TeacherTableRowType[] = teachersCollectionSnap.docs.map((teacher) => {
      // Parse the teacher data
      return { ...Teacher.schema.parse(teacher.data()), teacher_id: teacher.id };
    })

    return teachers;
  } catch (err: any) {
    return undefined
  }
});

/**
 * Adds a teacher to an existing class
 * @param class_id string representing the class identifier
 * @param teacherData the input data representing the teacher to be parsed by the collection converter
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const addTeacherInFirestore = async (class_id: string, teacherData: TeacherDataInput): Promise<boolean> => {

  try {
    const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
    // Get a new teacher document ref with the teacher converter
    const teacherDocRef = classDocRef.collection(Teacher.collection).withConverter(Teacher.converter).doc();
    // Create the new doc with the teacher data, the converter will parse the data 
    const batch = admin_firestore.batch();
    batch.create(teacherDocRef, teacherData);
    batch.update(classDocRef, {
      teachers: FieldValue.increment(1)
    })
    batch.commit();
    return true
  } catch (err) {
    console.log(err);
    return false;
  }
}


/**
 * Returns the Enrollment data of an existing class
 * @param uid string representing the user identifier
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
type StudentEnrollmentType = z.infer<typeof StudentEnrollment.schema>;
export const getStudentEnrollmentDataFromFirestore = async (class_id: string, uid: string): Promise<StudentEnrollmentType | undefined> => {
  try {
    const studentDocRef = admin_firestore.collection(Class.collection).doc(class_id).collection(StudentEnrollment.collection).doc(uid);
    const studentDocSnap = await studentDocRef.get();
    if (!studentDocSnap.exists) {
      return undefined
    }
    const data = StudentEnrollment.schema.parse(studentDocSnap.data())
    return data
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
}

/**
 * Deletes a teacher from an existing class and modifies the teachers count in the class document
 * @param teacher_id string representing the teacher identifier
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
export const deleteTeacherInFirestore = async (teacher_id: string, class_id: string): Promise<WriteOperationResult> => {
  const teacherDocRef = admin_firestore.collection(Class.collection).doc(class_id).collection(Teacher.collection).doc(teacher_id);
  const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
  try {
    await admin_firestore.runTransaction(async (t) => {
      const [teacherDocSnap, classDocSnap] = await t.getAll(
        teacherDocRef,
        classDocRef
      );
      if (!teacherDocSnap.exists) {
        throw new Error(`NOT_FOUND:Teacher ${teacher_id} not found`);
      }
      if (!classDocSnap.exists) {
        throw new Error(`NOT_FOUND:Class ${class_id} not found`);
      }
      t.delete(teacherDocRef).update(classDocRef, {
        teachers: FieldValue.increment(-1)
      });
    })
    return { successful: true };
  } catch (err: any) {
    const error = err as Error;
    let message = "Errore durante lo svolgimento dell'operazione";
    let status = 500;
    if (error.message.startsWith("NOT_FOUND")) {
      message = error.message.split(":")[1];
      status = 404;
    }
    return {
      successful: false,
      status,
      message
    }

  }
}

/**
 * Modifies a teacher from an existing class
 * @param teacher_id string representing the teacher identifier
 * @param class_id string representing the class identifier
 * @returns a promise to return a NextResponse with the appropriate error handling
 */
const teacherDataToChange = Teacher.schema
  .omit({ created_at: true })
  .partial();

type TeacherDataToChangeInput = z.input<typeof teacherDataToChange>

export const modifyTeacher = async (teacher_id: string, class_id: string, teacherData: TeacherDataToChangeInput): Promise<WriteOperationResult> => {

  try {
    const teacherDocRef = admin_firestore.collection(Class.collection).doc(class_id).collection(Teacher.collection).doc(teacher_id);
    const teacherDocSnap = await teacherDocRef.get();
    if (!teacherDocSnap.exists) {
      throw new Error(`NOT_FOUND:Teacher ${teacher_id} not found`);
    }
    teacherDocRef.update(teacherData);
    return { successful: true }
  } catch (err: any) {
    const error = err as Error;
    let message = "Errore durante lo svolgimento dell'operazione";
    let status = 500;
    if (error.message.startsWith("NOT_FOUND")) {
      message = error.message.split(":")[1];
      status = 404;
    }
    return {
      successful: false,
      status,
      message
    }

  }
}