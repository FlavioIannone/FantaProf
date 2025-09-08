import { admin_firestore } from "../firebase-connection.server";
import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { Class, StudentEnrollment } from "../schema.db";
import z from "zod";
import { cache } from "react";
import { ReadOperationResult, WriteOperationResult } from "@/lib/types";
import { ClassRowType } from "@/lib/data/types.data";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "./members.db.utils";

type ClassType = z.infer<typeof Class.schema>;

/**
 * Creates a class along with its initial student enrollment for the creator.
 * Uses a batch write to ensure atomicity of both operations.
 * @param uid - Student ID of the class creator (becomes admin)
 * @param classData - Object containing class_name and initial_credits
 * @returns Successful state operation result, an error with it's status code and message otherwise.
 */
export const createClassInFirestore = async (
  uid: string,
  classData: Pick<
    z.infer<typeof Class.schema>,
    "class_name" | "initial_credits"
  >
): Promise<
  WriteOperationResult<{
    classData: z.infer<typeof Class.schema>;
    class_id: string;
  }>
> => {
  const batch = admin_firestore.batch(); // Start a batch write for atomic operation

  // Generate new document reference for the class (auto ID)
  const classDocRef = admin_firestore.collection(Class.collection).doc();

  // Generate document reference for the creator's enrollment inside the class
  const studentEnrollmentDocRef = admin_firestore
    .collection(Class.collection)
    .doc(classDocRef.id)
    .collection(StudentEnrollment.collection)
    .doc(uid);

  try {
    // Convert class data to Firestore format using converter
    const classDocData = Class.schema.parse({
      ...classData,
    });
    // Add create operation for the class doc to the batch
    batch.create(classDocRef, classDocData);

    // Convert student enrollment data (creator is admin, gets initial credits)
    const studentEnrollmentDocData = StudentEnrollment.schema.parse({
      uid,
      admin: true, // The creator is admin
      credits: classData.initial_credits,
    });

    // Add create operation for enrollment doc to batch
    batch.create(studentEnrollmentDocRef, studentEnrollmentDocData);

    // Commit the batch atomically
    await batch.commit();

    const classFromFirestore = await classDocRef.get();
    return {
      status: 200,
      data: {
        classData: Class.schema.parse(classFromFirestore.data()),
        class_id: classFromFirestore.id,
      },
    }; // Success
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    console.log(`Fn: createClassInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

/**
 * Retrieves all classes that a student is enrolled in,
 * including class info merged with student's enrollment data.
 * Uses collection group query and caches results.
 * @param uid - Student ID
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the student isn't part of any class, status: 404.
 */
export const getClassesFromFirestore = cache(
  async (uid: string): Promise<ReadOperationResult<ClassRowType[]>> => {
    try {
      // Query all student enrollments for the student across all classes, ordered by creation date descending
      const enrollmentSnapshot = await admin_firestore
        .collectionGroup(StudentEnrollment.collection)
        .where("uid", "==", uid)
        .orderBy("created_at", "desc")
        .get();

      // The student is not part of any class
      if (enrollmentSnapshot.empty) {
        throw { status: 404, message: "The student isn't part of any class" };
      }

      // Parse enrollment data from documents using Zod schema
      const enrollmentDocsData = enrollmentSnapshot.docs.map((doc) => {
        return StudentEnrollment.schema.parse(doc.data());
      });

      // Extract parent class document references for each enrollment
      const classDocsRef = enrollmentSnapshot.docs
        .map((doc) => doc.ref.parent.parent)
        .filter((ref) => ref !== null); // Filter out null refs

      if (classDocsRef.length === 0) {
        throw { status: 404, message: "The student isn't part of any class" };
        // No classes found
      }

      // Fetch all class documents in parallel using getAll
      const classSnapshots = await admin_firestore.getAll(...classDocsRef);

      // Combine class data with corresponding enrollment data for UI display
      const classes: ClassRowType[] = await Promise.all(
        classSnapshots.map(async (doc, index) => {
          const data = Class.schema.parse(doc.data());
          const points = await calculatePointsBasedOnTeachersInTeamInFirestore(
            enrollmentDocsData[index].uid,
            doc.id
          );
          return {
            class_id: doc.id,
            class_name: data.class_name,
            members: data.members,
            teachers: data.teachers,
            currUserData: {
              admin: enrollmentDocsData[index].admin,
              credits: enrollmentDocsData[index].credits,
              points: points ?? 0,
            },
          };
        })
      );

      return { status: 200, data: classes };
    } catch (error: any) {
      // Default to 500 internal error if status/message not set
      const status = error.status ?? 500;
      const message = error.message ?? "Internal server error";

      console.log(`Fn: getClassesFromFirestore, error: `);
      console.log(error);

      return {
        status,
        message,
      };
    }
  }
);

/**
 * Retrieves detailed class data for a specific class ID.
 * Uses caching to optimize repeated requests.
 * @param class_id - The class document ID
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist, status: 404.
 */
export const getClassFromFirestore = cache(
  async (class_id: string): Promise<ReadOperationResult<ClassType>> => {
    // Class doc ref
    const classDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id);

    try {
      const classDocSnap = await classDocRef.get();

      // Throw error if class not found
      if (!classDocSnap.exists) {
        throw { status: 404, message: "The student isn't part of any class" };
      }

      // Parse and return class data using Zod schema

      return {
        status: 200,
        data: Class.schema.parse(classDocSnap.data()),
      };
    } catch (error: any) {
      // Default to 500 internal error if status/message not set
      const status = error.status ?? 500;
      const message = error.message ?? "Internal server error";
      console.log(`Fn: getClassFromFirestore, error: `);
      console.log(error);

      return {
        status,
        message,
      };
    }
  }
);

/**
 * Enrolls a student into a class if not already enrolled.
 * Uses Firestore transaction to ensure atomicity.
 * @param uid - Student ID
 * @param class_id - Class document ID
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the student is already part of the class, status: 409; if the class doesn't exist: 404.
 */
export const joinClassInFirestore = async (
  uid: string,
  class_id: string
): Promise<WriteOperationResult> => {
  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const classRef = admin_firestore.doc(`${Class.collection}/${class_id}`);
      const enrollmentRef = admin_firestore.doc(
        `${classRef.path}/${StudentEnrollment.collection}/${uid}`
      );

      // Fetch class and enrollment docs concurrently
      const [classSnap, enrollmentSnap] = await Promise.all([
        transaction.get(classRef),
        transaction.get(enrollmentRef), // fetch to see if the student is already part of the class
      ]);

      // Throw 404 if class does not exist
      if (!classSnap.exists) {
        throw {
          status: 404,
          message: `Class ${class_id} doesn't exist`,
        };
      }

      // Throw 409 if student already enrolled
      if (enrollmentSnap.exists) {
        throw {
          status: 409,
          message: `Student ${uid} is already enrolled in class ${class_id}`,
        };
      }

      // Get class data from Firestore snapshot
      const classData = Class.schema.parse(classSnap.data());

      // Prepare new student enrollment data (not admin, zero points initially)
      const newStudent = StudentEnrollment.schema.parse({
        uid,
        credits: classData.initial_credits,
        points: 0,
      });

      // Create enrollment doc and increment member count atomically
      transaction.create(enrollmentRef, newStudent).update(classRef, {
        members: FieldValue.increment(1),
      });
    });

    return {
      status: 200,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(`Fn: joinClassInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

/**
 * Allows a student to leave a class they are enrolled in.
 * Ensures at least one admin remains if the leaving student is an admin.
 * Deletes class if last member leaves.
 * Uses Firestore transaction for atomicity.
 * @param uid - Student ID
 * @param class_id - Class document ID
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the student is the only admin, status: 409; If the student doesn't exist or the class doesn't exist: 404.
 */
export const leaveClassInFirestore = async (
  uid: string,
  class_id: string
): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const studentDocRef = classDocRef
    .collection(StudentEnrollment.collection)
    .doc(uid);

  try {
    await admin_firestore.runTransaction(async (tx) => {
      // Fetch class document
      const classSnap = await tx.get(classDocRef);
      if (!classSnap.exists) {
        throw {
          status: 404,
          message: "The specified class doesn't exist",
        };
      }

      // Fetch student's enrollment document
      const studentSnap = await tx.get(studentDocRef);

      // Parse class data to get member count
      const classData = Class.schema.parse(classSnap.data());

      if (!studentSnap.exists) {
        throw {
          status: 404,
          message: "The specified student doesn't exist",
        };
      }

      // Parse student's enrollment data
      const studentData = StudentEnrollment.schema.parse(studentSnap.data());

      const classMemberCount = classData.members;

      // If student is admin, ensure at least one other admin remains before allowing leave
      if (studentData.admin) {
        // Query admins excluding the current student
        const adminsQuery = classDocRef
          .collection(StudentEnrollment.collection)
          .where("admin", "==", true)
          .where(FieldPath.documentId(), "!=", uid);

        // Get count of other admins
        const adminsSnap = await adminsQuery.count().get();
        const adminCount = adminsSnap.data().count;

        // Prevent leaving if student is only admin and there are other members
        if (adminCount === 0 && classMemberCount > 1) {
          throw {
            status: 409,
            message:
              "The specified student is the only admin in the class, so cannot leave",
          };
        }
      }

      // Delete student enrollment document
      tx.delete(studentDocRef);

      // If last member leaving, delete entire class document (which cascades)
      if (classMemberCount <= 1) {
        tx.delete(classDocRef);
      } else {
        // Otherwise decrement members count by 1
        tx.update(classDocRef, {
          members: classMemberCount - 1,
        });
      }
    });

    return {
      status: 200,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(`Fn: leaveClassInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};
