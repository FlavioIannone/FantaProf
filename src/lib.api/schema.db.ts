/**
 * 🔗 Firebase Firestore Schema Definitions for FantaProf
 * 
 * This file defines the Zod schemas, TypeScript types, and Firestore data converters 
 * used in the FantaProf project. These schemas serve as runtime validation and TypeScript
 * type enforcement for Firestore collections and subcollections.
 * 
 * 🔒 Zod is used for runtime validation
 * 🧠 FirestoreDataConverter is used for serializing/deserializing between Firestore and app
 * 
 * Collections / Documents:
 * ├── Classes (class_name, initial_credits, members, created_at) 
 * │    ├── class_name: string
 * │    ├── initial_credits: number
 * │    ├── members: number,
 * │    ├── created_at: Timestamp
 * │    ├── Teachers ( name, surname, description, price)
 * │    │   ├── name: string
 * │    │   ├── surname: string
 * │    │   ├── description: string
 * │    │   └── price: number
 * │    ├── StudentEnrollments (uid, admin, credits, created_at, points, team)
 * │    │   ├── uid: string
 * │    │   ├── admin: boolean
 * │    │   ├── credits: number
 * │    │   ├── points: number
 * │    │   ├── team: Array<{
 * │    │   │     teacher_id: string,
 * │    │   │     captain: boolean,
 * │    │   │     created_at: Timestamp
 * │    │   │   }>
 * │    │   └── created_at: Timestamp
 * │    ├── EventRegistrations (event_id, points)
 * │    │     ├── event_id: string
 * │    │     └── points: number
 * │    └── TeacherEventRegistations (event_id, teacher_id, points)
 * │          ├── event_id: string
 * │          ├── teacher_id: string
 * │          └── points: number
 * └── Events (title, description, logical_removal)
 *            ├── title: string
 *            ├── description: string
 *            └── logical_removal: boolean
 */

class FirebaseCollections {
  // *CLASSES* collection
  static readonly CLASSES = "classes";
  // *CLASSES* sub collections
  static readonly TEACHERS = "teachers";
  static readonly STUDENT_ENROLLMENTS = "students_enrollment";
  static readonly EVENT_REGISTRATIONS = "event_registrations";
  static readonly TEACHER_EVENTS = "teacher_event_registrations";


  // *EVENTS* collection
  static readonly EVENTS = "events";
}


import { FirestoreDataConverter, QueryDocumentSnapshot, FieldValue, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

const TimestampFieldType = z.custom<Date | FieldValue>((value) => {
  return !value || value instanceof Timestamp;
}, {
  message: "Expected undefined"
}).optional().transform((value) => {
  if (value instanceof Timestamp) return value.toDate();
  return FieldValue.serverTimestamp();
});

//
// ========================== Teachers ==========================
//
const TeacherSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  price: z.number().positive(),
  created_at: TimestampFieldType,
});
type TeacherIn = z.input<typeof TeacherSchema>;
type TeacherOut = z.infer<typeof TeacherSchema>;

const teacherConverter: FirestoreDataConverter<TeacherIn, TeacherOut> = {
  toFirestore: (teacher: TeacherIn) => TeacherSchema.parse(teacher),
  fromFirestore: (snapshot: QueryDocumentSnapshot): TeacherOut => TeacherSchema.parse(snapshot.data())
};

export const Teacher = {
  schema: TeacherSchema,
  converter: teacherConverter,
  collection: FirebaseCollections.TEACHERS
}

//
// ========================== Classes ==========================
//
const ClassSchema = z.object({
  class_name: z.string(),
  initial_credits: z.number().int().positive(),
  members: z.number().int().positive().optional().default(1),
  created_at: TimestampFieldType,
  teachers: z.number().int().optional().default(0)
});
type ClassIn = z.input<typeof ClassSchema>
type ClassOut = z.infer<typeof ClassSchema>;

const classConverter: FirestoreDataConverter<ClassIn, ClassOut> = {
  toFirestore: (classData: ClassIn) => ClassSchema.parse(classData),
  fromFirestore: (snapshot: QueryDocumentSnapshot): ClassOut => ClassSchema.parse(snapshot.data())
};

export const Class = {
  schema: ClassSchema,
  converter: classConverter,
  collection: FirebaseCollections.CLASSES
}

//
// ========================== Student Enrollments ==========================
//
//
// ========================== Teams ==========================
//

const TeacherTeamEnrollmentSchema = z.object({
  teacher_id: z.string(),
  captain: z.boolean(),
  created_at: TimestampFieldType
});

const TeacherTeamEnrollmentsType = z.array(TeacherTeamEnrollmentSchema).refine(
  (data) => data.some((entry) => entry.captain) || data.length === 0,
  { message: "At least one teacher must be a captain" }
);



const StudentEnrollmentSchema = z.object({
  uid: z.string(),
  admin: z.boolean().default(false),
  credits: z.number().int().positive(),
  created_at: TimestampFieldType,
  points: z.number().int().default(0),
  team: TeacherTeamEnrollmentsType
});
type StudentEnrollmentIn = z.input<typeof StudentEnrollmentSchema>;
type StudentEnrollmentOut = z.infer<typeof StudentEnrollmentSchema>;

const studentEnrollmentConverter: FirestoreDataConverter<StudentEnrollmentIn, StudentEnrollmentOut> = {
  toFirestore: (studentEnrollment: StudentEnrollmentIn) => StudentEnrollmentSchema.parse(studentEnrollment),
  fromFirestore: (snapshot: QueryDocumentSnapshot): StudentEnrollmentOut => StudentEnrollmentSchema.parse(snapshot.data()),
};

export const StudentEnrollment = {
  schema: StudentEnrollmentSchema,
  converter: studentEnrollmentConverter,
  collection: FirebaseCollections.STUDENT_ENROLLMENTS
}

//
// ========================== Events ==========================
//
const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  logical_removal: z.boolean().optional().default(false),
  created_at: TimestampFieldType
});
type EventIn = z.input<typeof EventSchema>;
type EventOut = z.infer<typeof EventSchema>;

const eventConverter: FirestoreDataConverter<EventIn, EventOut> = {
  toFirestore: (event: EventIn) => EventSchema.parse(event),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => EventSchema.parse(snapshot.data()),
};

export const Event = {
  schema: EventSchema,
  converter: eventConverter,
  collection: FirebaseCollections.EVENTS
}

//
// ========================== Event Registrations ==========================
//
const EventRegistrationSchema = z.object({
  event_id: z.string(),
  class_id: z.string(),
  points: z.number().int(),
  created_at: TimestampFieldType
});
type EventRegistrationIn = z.input<typeof EventRegistrationSchema>;
type EventRegistrationOut = z.infer<typeof EventRegistrationSchema>;

const eventRegistrationConverter: FirestoreDataConverter<EventRegistrationIn, EventRegistrationOut> = {
  toFirestore: (event: EventRegistrationIn) => EventRegistrationSchema.parse(event),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => EventRegistrationSchema.parse(snapshot.data()),
};

export const EventRegistration = {
  schema: EventRegistrationSchema,
  converter: eventRegistrationConverter,
  collection: FirebaseCollections.EVENT_REGISTRATIONS
}


//
// ========================== Teacher Events ==========================
//
const TeacherEventSchema = z.object({
  event_id: z.string(),
  teacher_id: z.string(),
  points: z.number().int(),
  created_at: TimestampFieldType
});
type TeacherEventIn = z.input<typeof TeacherEventSchema>;
type TeacherEventOut = z.infer<typeof TeacherEventSchema>;

const teacherEventConverter: FirestoreDataConverter<TeacherEventIn, TeacherEventOut> = {
  toFirestore: (teacherEvent: TeacherEventIn) => TeacherEventSchema.parse(teacherEvent),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => TeacherEventSchema.parse(snapshot.data()),
};

export const TeacherEvent = {
  schema: TeacherEventSchema,
  converter: teacherEventConverter,
  collection: FirebaseCollections.TEACHER_EVENTS
}




