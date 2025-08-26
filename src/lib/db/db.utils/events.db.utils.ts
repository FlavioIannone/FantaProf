import { cache } from "react";
import {
  Class,
  EventWrapper,
  StudentEnrollment,
  Teacher,
  TeacherEventRegistration,
} from "../schema.db";
import z from "zod";
import { admin_firestore } from "../firebase-connection.server";
import { WriteOperationResult } from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";

export type TemplateEventData = Omit<
  z.input<typeof EventWrapper.schema>,
  "created_at" | "deleted"
>;
export type EventData = Omit<
  z.input<typeof TeacherEventRegistration.schema>,
  "created_at"
>;

// Events templates
/**
 * Creates a template event in an existing class.
 * @param class_id - The id of the class to add the event template into
 * @param templateEventData - Data of the template event
 * @returns The result of the write operation. On error, returns an object with status and message.
 */
export const createEventTemplateInFirestore = async (
  class_id: string,
  templateEventData: TemplateEventData
): Promise<WriteOperationResult> => {
  // Document ref to the class
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  // Create a new ref to the event to add
  const eventTemplateDocRef = classDocRef
    .collection(EventWrapper.collection)
    .doc();

  try {
    // Get the class
    const classDoc = await classDocRef.get();
    if (!classDoc.exists) {
      // If the class doesn't exist
      throw {
        status: 404,
        message: "The class doesn't exist",
      };
    }
    // Create the event
    eventTemplateDocRef.create(EventWrapper.schema.parse(templateEventData));
    return {
      successful: true,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";

    console.log(error);

    return {
      successful: false,
      status,
      message,
    };
  }
};

/**
 * Modifies an event template's data
 * @param class_id - The ID of the class
 * @param event_id - The ID of the event template
 * @param eventData - The new data of the event template
 * @returns The result of the write operation. On error, returns an object with status and message.
 */
export const modifyEventTemplateInFirestore = async (
  class_id: string,
  event_id: string,
  eventData: Partial<TemplateEventData>
) => {
  // Ref to the class
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  // Ref to the event
  const eventDocRef = classDocRef
    .collection(EventWrapper.collection)
    .doc(event_id);
  try {
    //Fetch class and event docs in parallel
    const [classDocSnap, eventDocSnap] = await Promise.all([
      classDocRef.get(),
      eventDocRef.get(),
    ]);
    // If the event doesn't exist
    if (!eventDocSnap.exists) {
      throw {
        status: 404,
        message: "The event doesn't exist",
      };
    }
    // If the class doesn't exist
    if (!classDocSnap.exists) {
      throw {
        status: 404,
        message: "The class doesn't exist",
      };
    }
    // Logic deletion
    await eventDocRef.update(eventData);
    return {
      successful: true,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(error);

    return {
      successful: false,
      status,
      message,
    };
  }
};

/**
 * Logically deletes an event template in the database by setting its "deleted" flag to true.
 * This ensures that the template is hidden from users but its data remains available for consistency,
 * especially if there are event registrations linked to it.
 *
 * @param class_id - The ID of the class containing the event template.
 * @param event_id - The ID of the event template to logically delete.
 * @returns The result of the write operation. On error, returns an object with status and message.
 */
export const deleteEventTemplateInFirestore = async (
  class_id: string,
  event_id: string
): Promise<WriteOperationResult> => {
  // Ref to the class
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  // Ref to the event
  const eventDocRef = classDocRef
    .collection(EventWrapper.collection)
    .doc(event_id);
  try {
    //Fetch class and event docs in parallel
    const [classDocSnap, eventDocSnap] = await Promise.all([
      classDocRef.get(),
      eventDocRef.get(),
    ]);
    // If the event doesn't exist
    if (!eventDocSnap.exists) {
      throw {
        status: 404,
        message: "The event doesn't exist",
      };
    }
    // If the class doesn't exist
    if (!classDocSnap.exists) {
      throw {
        status: 404,
        message: "The class doesn't exist",
      };
    }
    // Logic deletion
    await eventDocRef.update({
      deleted: true,
    });
    return {
      successful: true,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(error);

    return {
      successful: false,
      status,
      message,
    };
  }
};

/**
 * Returns the event templates from the given class.
 * Omits the creation date of the event templates.
 *
 * @param class_id - The id of the class from which retrieving the data
 * @returns The list of the event templates of the given class
 */
export const getEventsTemplateFromFirestore = cache(
  async (
    class_id: string
  ): Promise<
    | (Omit<z.infer<typeof EventWrapper.schema>, "created_at" | "deleted"> & {
        id: string;
      })[]
    | undefined
  > => {
    // Ref to the event collection, ordered by the creation date
    const eventsCollectionRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(EventWrapper.collection)
      .where("deleted", "==", false)
      .orderBy("created_at", "desc");

    try {
      // Get the collection
      const eventCollectionDocsSnap = await eventsCollectionRef.get();
      // If the collection is empty
      if (eventCollectionDocsSnap.empty) {
        return [];
      }
      // Return the parsed data
      return eventCollectionDocsSnap.docs.map((value) => ({
        ...EventWrapper.schema.parse(value.data()),
        id: value.id,
      }));
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
);

/**
 * Retrieves an event from the specified class
 *
 * @param class_id - The ID of the class containing the event template.
 * @param event_id - The ID of the event template to logically delete.
 * @returns The event template data
 */
export const getEventTemplateFromFirestore = cache(
  async (
    class_id: string,
    event_id: string
  ): Promise<
    | (Omit<z.infer<typeof EventWrapper.schema>, "created_at" | "deleted"> & {
        id: string;
      })
    | undefined
  > => {
    // Ref to the event doc
    const eventDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(EventWrapper.collection)
      .doc(event_id);

    try {
      // Get the doc
      const eventDocSnap = await eventDocRef.get();
      // If the doc is empty
      if (!eventDocSnap.exists) {
        throw {
          status: 404,
          message: "The event template doesn't exist",
        };
      }
      // Return the parsed data
      return {
        ...EventWrapper.schema.parse(eventDocSnap.data()),
        id: eventDocRef.id,
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
);

//* Events

/**
 * Registers an event for all students in a class who have the specified teacher in their team.
 *
 * - Fetches the event template to determine how many points the event is worth.
 * - Finds all students enrolled in the class whose `teacher_team_ids` includes the given teacher.
 * - Increments their points by the amount defined in the event template.
 *
 * @param class_id - The ID of the class where the event is registered.
 * @param eventData - The event details, including the `event_id` and the `teacher_id` and the description.
 * @returns The result of the write operation. On error, returns an object with status and message.
 *
 */
export const registerEventInFirestore = async (
  class_id: string,
  eventData: EventData
): Promise<WriteOperationResult> => {
  // Ref to the
  const teacherDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(Teacher.collection)
    .doc(eventData.teacher_id);

  // Ref to the new event registration
  const teachersEventRegistrationDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id)
    .collection(TeacherEventRegistration.collection)
    .doc();

  try {
    await admin_firestore.runTransaction(async (transaction) => {
      const [templateData, teacherDocSnap] = await Promise.all([
        getEventTemplateFromFirestore(class_id, eventData.event_id),
        teacherDocRef.get(),
      ]);

      if (!templateData) {
        throw {
          status: 404,
          message: "The event template doesn't exist",
        };
      }
      if (!teacherDocSnap.exists) {
        throw {
          status: 404,
          message: "The teacher doesn't exist",
        };
      }

      // Run the operations
      transaction
        // Add points to the teacher
        .update(teacherDocRef, {
          points: FieldValue.increment(templateData.points),
        })
        // Create the event registration
        .create(teachersEventRegistrationDocRef, {
          ...TeacherEventRegistration.schema.parse(eventData),
        });
    });

    return {
      successful: true,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(error);

    return {
      successful: false,
      status,
      message,
    };
  }
};

export const deleteEventInFirestore = async (
  class_id: string,
  event_id: string
) => {};

export const getEventsFromFirestore = cache(async (class_id: string) => {});
