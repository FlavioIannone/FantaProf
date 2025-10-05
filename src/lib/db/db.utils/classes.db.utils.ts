import { admin_firestore } from "../firebase-connection.server";
import { FieldValue } from "firebase-admin/firestore";
import { Class, StudentEnrollment } from "../schema.db";
import z from "zod";
import { cache } from "react";
import { ReadOperationResult, WriteOperationResult } from "@/lib/types";
import { ClassRowType } from "@/lib/data/types.data";

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
    "class_name" | "initial_credits" | "use_anti_cheat"
  >
): Promise<
  WriteOperationResult<{
    classData: z.infer<typeof Class.schema>;
    class_id: string;
  }>
> => {
  const batch = admin_firestore.batch();

  const classDocRef = admin_firestore.collection(Class.collection).doc();
  const studentEnrollmentDocRef = classDocRef
    .collection(StudentEnrollment.collection)
    .doc(uid);

  try {
    // Pre-validate input data once
    const validatedClassData = Class.schema.parse({
      ...classData,
    });

    const validatedStudentEnrollment = StudentEnrollment.schema.parse({
      uid,
      admin: true,
      credits: classData.initial_credits,
    });

    // Add both create ops
    batch.create(classDocRef, validatedClassData);
    batch.create(studentEnrollmentDocRef, validatedStudentEnrollment);

    await batch.commit();

    // Convert the DBModelData to AppModelData
    const plainClassData = {
      ...validatedClassData,
      created_at:
        validatedClassData.created_at instanceof Date
          ? validatedClassData.created_at
          : new Date(),
    };

    return {
      status: 200,
      data: {
        classData: plainClassData, // (created_at as Timestamp to Date)
        class_id: classDocRef.id,
      },
    };
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

/** * Updates class data such as class name and initial credits.
 * @param class_id - The class document ID
 * @param updatedData - Object containing fields to update (class_name, initial_credits)
 * @returns Successful state operation result, an error with it's status code and message otherwise.
 */
export const updateClassInFirestore = async (
  class_id: string,
  updatedData: Partial<Pick<ClassType, "class_name" | "initial_credits">>
): Promise<WriteOperationResult<void>> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);
  const studentEnrollmentsRef = classDocRef.collection(
    StudentEnrollment.collection
  );

  try {
    await admin_firestore.runTransaction(async (t) => {
      const [classSnap, enrollmentsSnap] = await Promise.all([
        t.get(classDocRef),
        t.get(studentEnrollmentsRef),
      ]);

      if (!classSnap.exists) {
        throw { status: 404, message: "Class not found" };
      }

      // Update class data only if there are actual changes
      if (updatedData.class_name || updatedData.initial_credits !== undefined) {
        t.update(classDocRef, updatedData);
      }

      // Update student credits only if initial_credits is provided
      if (updatedData.initial_credits !== undefined && !enrollmentsSnap.empty) {
        enrollmentsSnap.docs.forEach((doc) => {
          t.update(doc.ref, {
            credits: updatedData.initial_credits,
          });
        });
      }
    });

    return { status: 200 };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    console.log(`Fn: updateClassInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

export const startGameInFirestore = async (
  class_id: string
): Promise<WriteOperationResult<void>> => {
  try {
    // Update the class document with the new data
    await admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .update({ game_started: true, market_locked: true });
    return { status: 200 };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    console.log(`Fn: updateClassInFirestore, error: `);
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
          return {
            class_id: doc.id,
            class_name: data.class_name,
            members: data.members,
            teachers: data.teachers,
            initial_credits: data.initial_credits,
            currUserData: {
              admin: enrollmentDocsData[index].admin,
              credits: enrollmentDocsData[index].credits,
              points: enrollmentDocsData[index].points ?? 0,
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
    const classRef = admin_firestore.doc(`${Class.collection}/${class_id}`);
    const enrollmentRef = admin_firestore.doc(
      `${classRef.path}/${StudentEnrollment.collection}/${uid}`
    );

    // Fetch class and enrollment docs concurrently
    const classSnap = await classRef.get();

    // Throw 404 if class does not exist
    if (!classSnap.exists) {
      throw {
        status: 404,
        message: `Class ${class_id} doesn't exist`,
      };
    }

    // Get class data from Firestore snapshot
    const classData = Class.schema.parse(classSnap.data());

    if (classData.game_started) {
      throw {
        status: 423,
        message: `The game for this class has already started, you cannot join it anymore.`,
      };
    }

    // Prepare new student enrollment data (not admin, zero points initially)
    const newStudent = StudentEnrollment.schema.parse({
      uid,
      credits: classData.initial_credits,
      points: 0,
    });

    // Create enrollment doc and increment member count atomically
    enrollmentRef.create(newStudent);
    classRef.update({
      members: FieldValue.increment(1),
    });

    return {
      status: 200,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    let status = error.status ?? 500;
    let message = error.message ?? "Internal server error";
    if (error.code === "already-exists") {
      status = 409;
      message = `Student ${uid} already enrolled`;
    }

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
    // Step 1: Transaction to remove the student and update the students count
    const lastMember = await admin_firestore.runTransaction(async (tx) => {
      const classSnap = await tx.get(classDocRef);
      if (!classSnap.exists) throw { status: 404, message: "Class not found" };

      const studentSnap = await tx.get(studentDocRef);
      if (!studentSnap.exists)
        throw { status: 404, message: "Student not found" };

      const classData = Class.schema.parse(classSnap.data());
      const studentData = StudentEnrollment.schema.parse(studentSnap.data());

      // Is admin
      if (studentData.admin) {
        if (classData.admin_count === 1 && classData.members > 1)
          throw {
            status: 409,
            message: "Only admin cannot leave if other members exist",
          };
      }

      // Delete studente
      tx.delete(studentDocRef);

      // Aggiorna members
      if (classData.members > 1) {
        tx.update(classDocRef, { members: FieldValue.increment(-1) });
        if (studentData.admin) {
          tx.update(classDocRef, { admin_count: FieldValue.increment(-1) });
        }
        return false;
      } else {
        return true; // ultimo membro
      }
    });

    // Step 2: Se ultimo membro, cancellare classe e tutte le subcollection
    if (lastMember) {
      await admin_firestore.recursiveDelete(classDocRef);
    }

    return { status: 200 };
  } catch (error: any) {
    console.error("Fn: leaveClassInFirestore, error:", error);
    return {
      status: error.status ?? 500,
      message: error.message ?? "Internal server error",
    };
  }
};
