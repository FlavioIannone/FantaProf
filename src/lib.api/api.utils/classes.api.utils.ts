import { admin_auth, admin_firestore } from "../firebase-connection";
import { FieldPath, FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Class, StudentEnrollment, Teacher } from "../schema.db";
import { ClassesTableRowType, MembersTableRowType, TeacherTableRowType } from "@/lib/data/types.data-layer";
import z from "zod";
import { cache } from "react";
import { TeacherDataInput, WriteOperationResult } from "@/lib/types";

/**
 * Creates a class along with its initial student enrollment for the creator.
 * Uses a batch write to ensure atomicity of both operations.
 * @param uid - User ID of the class creator (becomes admin)
 * @param classData - Object containing class_name and initial_credits
 * @returns Promise resolving to true on success, false on failure
 */
export const createClassInFirestore = async (uid: string, classData: { class_name: string; initial_credits: number; }): Promise<{
  classData: z.infer<typeof Class.schema>,
  class_id: string
} | undefined> => {
  const batch = admin_firestore.batch(); // Start a batch write for atomic operation

  // Generate new document reference for the class (auto ID)
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc();

  // Generate document reference for the creator's enrollment inside the class
  const studentEnrollmentDocRef = admin_firestore
    .collection(Class.collection)
    .doc(classDocRef.id)
    .collection(StudentEnrollment.collection)
    .doc(uid);

  try {
    // Convert class data to Firestore format using converter
    const classDocData = Class.converter.toFirestore({
      ...classData,
    });
    // Add create operation for the class doc to the batch
    batch.create(classDocRef, classDocData);

    // Convert student enrollment data (creator is admin, gets initial credits)
    const studentEnrollmentDocData = StudentEnrollment.converter.toFirestore({
      uid: uid,
      admin: true, // The creator is admin
      credits: classData.initial_credits,
      team: [] // Empty team by default
    });

    // Add create operation for enrollment doc to batch
    batch.create(studentEnrollmentDocRef, studentEnrollmentDocData);

    // Commit the batch atomically
    await batch.commit();

    const classFromFirestore = (await classDocRef.get());
    return { classData: Class.schema.parse(classFromFirestore.data()), class_id: classFromFirestore.id }// Success
  } catch (error) {
    console.log(error);
    return; // Failure
  }
};

/**
 * Retrieves all classes that a user is enrolled in,
 * including class info merged with user's enrollment data.
 * Uses collection group query and caches results.
 * @param uid - User ID
 * @returns Promise resolving to an array of classes or undefined on error
 */
export const getClassesFromFirestore = cache(async (uid: string): Promise<ClassesTableRowType[] | undefined> => {
  try {
    // Query all student enrollments for the user across all classes, ordered by creation date descending
    const enrollmentSnapshot = await admin_firestore
      .collectionGroup(StudentEnrollment.collection)
      .where("uid", "==", uid)
      .orderBy("created_at", "desc")
      .get();

    // Parse enrollment data from documents using Zod schema
    const enrollmentDocsData = enrollmentSnapshot.docs.map(
      (doc) => StudentEnrollment.schema.parse(doc.data())
    );

    // Extract parent class document references for each enrollment
    const classRefs = enrollmentSnapshot.docs
      .map((doc) => doc.ref.parent.parent)
      .filter((ref) => ref !== null); // Filter out null refs

    if (classRefs.length === 0) {
      return []; // No classes found
    }

    // Fetch all class documents in parallel using getAll
    const classSnapshots = await admin_firestore.getAll(...classRefs);

    // Combine class data with corresponding enrollment data for UI display
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
    return undefined; // Return undefined on error
  }
});

/**
 * Retrieves detailed class data for a specific class ID.
 * Uses caching to optimize repeated requests.
 * @param class_id - The class document ID
 * @returns Promise resolving to class data or undefined if not found
 */
export const getClassFromFirestore = cache(async (class_id: string) => {
  try {
    // Fetch class document by ID
    const classDoc = await admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .get();

    // Throw error if class not found
    if (!classDoc.exists) {
      throw new Error(`NOT_FOUND:Class ${class_id} not found`);
    }

    // Parse and return class data using Zod schema
    return Class.schema.parse(classDoc.data());

  } catch (error: any) {
    console.log(error);
    if (error.message.startsWith("NOT_FOUND")) {
      return undefined; // Return undefined if class not found
    }
    return undefined; // Return undefined on other errors
  }
});

/**
 * Enrolls a user into a class if not already enrolled.
 * Uses Firestore transaction to ensure atomicity.
 * @param uid - User ID
 * @param class_id - Class document ID
 * @returns Promise resolving to WriteOperationResult indicating success or failure
 */
export const joinClassInFirestore = async (
  uid: string,
  class_id: string
): Promise<WriteOperationResult> => {
  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const classRef = admin_firestore.doc(`${Class.collection}/${class_id}`);
      const enrollmentRef = admin_firestore.doc(`${classRef.path}/${StudentEnrollment.collection}/${uid}`);

      // Fetch class and enrollment docs concurrently
      const [classSnap, enrollmentSnap] = await Promise.all([
        transaction.get(classRef),
        transaction.get(enrollmentRef)
      ]);

      // Throw 404 if class does not exist
      if (!classSnap.exists) {
        throw {
          status: 404,
          message: `Class ${class_id} doesn't exist`
        };
      }

      // Throw 409 if user already enrolled
      if (enrollmentSnap.exists) {
        throw {
          status: 409,
          message: `User ${uid} is already enrolled in class ${class_id}`
        };
      }

      // Get class data from Firestore snapshot
      const classData = Class.converter.fromFirestore(classSnap as QueryDocumentSnapshot);

      // Prepare new student enrollment data (not admin, zero points initially)
      const newStudent = StudentEnrollment.converter.toFirestore({
        uid,
        credits: classData.initial_credits,
        admin: false,
        points: 0,
        team: []
      });

      // Create enrollment doc and increment member count atomically
      transaction.create(enrollmentRef, newStudent)
        .update(classRef, {
          members: FieldValue.increment(1)
        });
    });

    return {
      successful: true
    };

  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    console.log(error);

    return {
      successful: false,
      status,
      message
    };
  }
};

/**
 * Allows a user to leave a class they are enrolled in.
 * Ensures at least one admin remains if the leaving user is an admin.
 * Deletes class if last member leaves.
 * Uses Firestore transaction for atomicity.
 * @param uid - User ID
 * @param class_id - Class document ID
 * @returns Promise resolving to WriteOperationResult indicating success or failure
 */
export const leaveClassInFirestore = async (uid: string, class_id: string): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore.collection(Class.collection).doc(class_id);
  const studentDocRef = classDocRef.collection(StudentEnrollment.collection).doc(uid);

  try {
    await admin_firestore.runTransaction(async (tx) => {
      // Fetch class document
      const classSnap = await tx.get(classDocRef);
      if (!classSnap.exists) {
        throw new Error(`NOT_FOUND:Class ${class_id} does not exist`);
      }

      // Fetch student's enrollment document
      const studentSnap = await tx.get(studentDocRef);

      // Parse class data to get member count
      const classData = Class.schema.parse(classSnap.data());

      if (!studentSnap.exists) {
        throw new Error(`NOT_FOUND:User ${uid} is not part of the class ${class_id}`);
      }

      // Parse student's enrollment data
      const studentData = StudentEnrollment.schema.parse(studentSnap.data());

      const classMemberCount = classData.members;

      // If user is admin, ensure at least one other admin remains before allowing leave
      if (studentData.admin) {
        // Query admins excluding the current user
        const adminsQuery = classDocRef
          .collection(StudentEnrollment.collection)
          .where("admin", "==", true)
          .where(FieldPath.documentId(), "!=", uid);

        // Get count of other admins
        const adminsSnap = await adminsQuery.count().get();
        const adminCount = adminsSnap.data().count;

        // Prevent leaving if user is only admin and there are other members
        if (adminCount === 0 && classMemberCount > 1) {
          throw new Error(`CONFLICT:The user ${uid} is the only admin and cannot leave without another admin.`);
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
      successful: true
    };

  } catch (error: any) {
    let status = 500;
    let message: string = error.message ? error.message.split(":")[1] : "Internal server error";

    // Map error messages to status codes
    if (error.message.startsWith("NOT_FOUND")) {
      status = 404;
    }
    if (error.message.startsWith("CONFLICT")) {
      status = 409;
    }

    console.error("Unexpected error in leaveClass:", error.message);
    return {
      successful: false,
      status: 500,
      message: "Internal server error"
    };
  }
};
