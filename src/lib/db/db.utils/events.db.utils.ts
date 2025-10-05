import { cache } from "react";
import {
  Class,
  EventTemplate,
  Teacher,
  EventRegistration,
  StudentEnrollment,
  TeamEnrollment,
} from "../schema.db";
import z from "zod";
import { admin_firestore } from "../firebase-connection.server";
import {
  EventRegistrationRowType,
  ReadOperationResult,
  WriteOperationResult,
} from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";
import { getClassTeacherFromFirestore } from "./teachers.db.utils";
import { EventTemplateType } from "@/lib/data/types.data";

export type TemplateEventData = Omit<
  z.input<typeof EventTemplate.schema>,
  "created_at" | "deleted"
>;
export type EventData = Omit<
  z.input<typeof EventRegistration.schema>,
  "created_at"
>;

// Events templates
/**
 * Creates a template event in an existing class.
 * @param class_id - The id of the class to add the event template into
 * @param templateEventData - Data of the template event
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist: 404.
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
    .collection(EventTemplate.collection)
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
    eventTemplateDocRef.create(EventTemplate.schema.parse(templateEventData));
    return {
      status: 200,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(`Fn: createEventTemplateInFirestore, error: `);
    console.log(error);

    return {
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
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the event template doesn't exist or the class doesn't exist: 404.
 */
export const modifyEventTemplateInFirestore = async (
  class_id: string,
  event_id: string,
  eventData: Partial<TemplateEventData>
): Promise<WriteOperationResult> => {
  // Ref to the class
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  // Ref to the event
  const eventDocRef = classDocRef
    .collection(EventTemplate.collection)
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
      status: 200,
    };
  } catch (error: any) {
    // Default to 500 internal error if status/message not set
    const status = error.status ?? 500;
    const message = error.message ?? "Internal server error";
    console.log(`Fn: modifyEventTemplateInFirestore, error: `);
    console.log(error);

    return {
      status,
      message,
    };
  }
};

/**
 * Logically deletes an event template in the database by setting its "deleted" flag to true.
 * This ensures that the template is hidden from students but its data remains available for consistency,
 * especially if there are event registrations linked to it.
 *
 * @param class_id - The ID of the class containing the event template.
 * @param event_id - The ID of the event template to logically delete.
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the event template doesn't exist or is already deleted or the class doesn't exist: 404.
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
    .collection(EventTemplate.collection)
    .doc(event_id);
  try {
    //Fetch class and event docs in parallel
    const [classDocSnap, eventDocSnap] = await Promise.all([
      classDocRef.get(),
      eventDocRef.get(),
    ]);
    // If the class doesn't exist
    if (!classDocSnap.exists) {
      throw {
        status: 404,
        message: "The class doesn't exist",
      };
    }
    const eventDocData = EventTemplate.schema.parse(eventDocSnap.data());
    // If the event doesn't exist or if the event is already deleted
    if (!eventDocSnap.exists || eventDocData.deleted) {
      throw {
        status: 404,
        message: "The event doesn't exist",
      };
    }

    // Logic deletion
    await eventDocRef.update({
      deleted: true,
    });
    return {
      status: 200,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while deleting the event template";
    console.log(`Fn: deleteEventTemplateInFirestore, error: `);
    console.log(error);
    return {
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
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't contain any event templates: 404.
 */

export const getEventsTemplateFromFirestore = cache(
  async (
    class_id: string
  ): Promise<ReadOperationResult<EventTemplateType[]>> => {
    // Ref to the event collection, ordered by the creation date
    const eventsCollectionRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(EventTemplate.collection)
      .where("deleted", "==", false)
      .orderBy("created_at", "desc");

    try {
      // Get the collection
      const eventCollectionDocsSnap = await eventsCollectionRef.get();
      // If the collection is empty
      if (eventCollectionDocsSnap.empty) {
        throw { status: 404, message: "There are no events for this class" };
      }
      // Return the parsed data
      const templateEvents = eventCollectionDocsSnap.docs.map((value) => ({
        ...EventTemplate.schema.parse(value.data()),
        event_id: value.id,
      }));
      return {
        status: 200,
        data: templateEvents,
      };
    } catch (error: any) {
      // Default to 500 internal error if status/message not set
      const status = error.status ?? 500;
      const message = error.message ?? "Internal server error";

      console.log(`Fn: getEventsTemplateFromFirestore, error: `);
      console.log(error);
      return {
        status,
        message,
      };
    }
  }
);

/**
 * Retrieves an event from the specified class
 *
 * @param class_id - The ID of the class containing the event template.
 * @param event_id - The ID of the event template to logically delete.
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the event template doesn't exist or is already deleted or the class doesn't exist: 404.
 */
export const getEventTemplateFromFirestore = cache(
  async (
    class_id: string,
    event_id: string
  ): Promise<ReadOperationResult<EventTemplateType>> => {
    // Ref to the event doc
    const eventDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id)
      .collection(EventTemplate.collection)
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
        status: 200,
        data: {
          ...EventTemplate.schema.parse(eventDocSnap.data()),
          event_id: eventDocRef.id,
        },
      };
    } catch (error: any) {
      // Default to 500 internal error if status/message not set
      const status = error.status ?? 500;
      const message = error.message ?? "Internal server error";

      console.log(`Fn: getEventTemplateFromFirestore, error: `);
      console.log(error);
      return {
        status,
        message,
      };
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
 * @returns Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist or the teacher doesn't exist or the event template doesn't exist: 404.
 *
 */
export const registerEventInFirestore = async (
  class_id: string,
  eventData: EventData
): Promise<WriteOperationResult> => {
  const classDocRef = admin_firestore
    .collection(Class.collection)
    .doc(class_id);

  // Students that have this teacher in the class
  const enrollmentsToUpdateRef = classDocRef
    .collection(StudentEnrollment.collection)
    .where("teacher_team_ids", "array-contains", eventData.teacher_id);

  // Ref to the new event registration
  const teachersEventRegistrationDocRef = classDocRef
    .collection(EventRegistration.collection)
    .doc();

  // Ref to the teacher
  const teacherDocRef = classDocRef
    .collection(Teacher.collection)
    .doc(eventData.teacher_id);

  const batch = admin_firestore.batch();

  try {
    const [templateData, enrollmentsToUpdateSnap] = await Promise.all([
      getEventTemplateFromFirestore(class_id, eventData.event_id),
      enrollmentsToUpdateRef.get(),
    ]);

    if (templateData.status !== 200) {
      throw templateData;
    }

    const points = templateData.data.points;

    // Create the event registration
    batch.create(teachersEventRegistrationDocRef, {
      ...EventRegistration.schema.parse(eventData),
    });

    // Increment teacher points
    batch.update(teacherDocRef, {
      points: FieldValue.increment(points),
    });

    if (!enrollmentsToUpdateSnap.empty) {
      // Fetch all TeamEnrollment docs for these students in one go
      const teamDocsSnap = await Promise.all(
        enrollmentsToUpdateSnap.docs.map((e) =>
          e.ref
            .collection(TeamEnrollment.collection)
            .doc(eventData.teacher_id)
            .get()
        )
      );

      enrollmentsToUpdateSnap.docs.forEach((e, index) => {
        const teamData = TeamEnrollment.schema.parse(
          teamDocsSnap[index].data()
        );
        const isCaptain = teamData.captain;
        batch.update(e.ref, {
          points: FieldValue.increment(isCaptain ? points * 2 : points),
        });
      });
    }

    await batch.commit();

    return {
      status: 200,
    };
  } catch (error: any) {
    const status = error.status ?? 500;
    const message = error.message ?? "Error while registering the event.";
    console.log(`Fn: registerEventInFirestore, error: `, error);
    return {
      status,
      message,
    };
  }
};

/**
 * Retrieves all registered events for a given class from Firestore.
 *
 * @param  class_id - The ID of the class to fetch registered events for.
 * @returns  Successful state operation result, an error with it's status code and message otherwise. If the class doesn't exist or the class doesn't contain any event registation: 404.
 *
 */
export const getRegisteredEventsFromFirestore = cache(
  async (
    class_id: string
  ): Promise<ReadOperationResult<EventRegistrationRowType[]>> => {
    const classDocRef = admin_firestore
      .collection(Class.collection)
      .doc(class_id);
    const eventRegistrationCollectionRef = classDocRef
      .collection(EventRegistration.collection)
      .orderBy("created_at", "desc");
    try {
      const [classDocSnap, eventRegistrationCollectionSnap] = await Promise.all(
        [classDocRef.get(), eventRegistrationCollectionRef.get()]
      );

      if (!classDocSnap.exists) {
        throw {
          status: 404,
          message: "The class doesn't exist",
        };
      }

      if (eventRegistrationCollectionSnap.empty) {
        throw {
          status: 404,
          message: "There are no registered events for this class",
        };
      }
      const registeredEvents = await Promise.all(
        eventRegistrationCollectionSnap.docs.map(
          async (eventRegistrationSnap) => {
            const registration = EventRegistration.schema.parse(
              eventRegistrationSnap.data()
            );
            const [eventTemplate, teacher] = await Promise.all([
              getEventTemplateFromFirestore(class_id, registration.event_id),
              getClassTeacherFromFirestore(class_id, registration.teacher_id),
            ]);
            if (teacher.status !== 200) {
              throw teacher;
            }
            if (eventTemplate.status !== 200) {
              throw eventTemplate;
            }
            const registrationRow: EventRegistrationRowType = {
              registration_id: eventRegistrationSnap.id,
              teacher_name: `${teacher.data.name} ${teacher.data.surname}`,
              points: eventTemplate.data.points,
              created_at: registration.created_at as Date,
              title: eventTemplate.data.title,
              description: registration.description,
            };
            return registrationRow;
          }
        )
      );

      return {
        status: 200,
        data: registeredEvents,
      };
    } catch (error: any) {
      const status = error.status ?? 500;
      const message =
        error.message ?? "Error while deleting the event template";
      console.log(`Fn: getRegisteredEventsFromFirestore, error: `);
      console.log(error);
      return {
        status,
        message,
      };
    }
  }
);
