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
 * │    ├── Teachers (uid, name, surname, description, price)
 * │    │   ├── uid: string
 * │    │   ├── name: string
 * │    │   ├── surname: string
 * │    │   ├── description: string
 * │    │   └── price: number
 * │    ├── StudentEnrollments (admin, credits, created_at, points, team)
 * │    │   ├── admin: boolean
 * │    │   ├── credits: number
 * │    │   ├── points: number
 * │    │   ├── team: Array<{
 * │    │   │     teacher_id: string,
 * │    │   │     captain: boolean,
 * │    │   │     created_at: Timestamp
 * │    │   │   }>
 * │    │   └── created_at: Timestamp
 * │    ├── Events (title, description, points, created_at)
 * │    │   ├── title: string
 * │    │   ├── description: string
 * │    │   ├── points: number
 * │    │   └── created_at: Timestamp
 * └──  └── TeacherEventRegistations (event_id, teacher_id, points, created_at)
 *          ├── event_id: string
 *          ├── teacher_id: string
 *          ├── description: string
 *          └── created_at: Timestamp
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

import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

const TimestampFieldType = z.union([z.instanceof(Timestamp), z.undefined()]).optional().transform((value) => {
  if (value instanceof Timestamp) return value.toDate();
  if(!value) return FieldValue.serverTimestamp();
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




export const Teacher = {
  schema: TeacherSchema,
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


export const Class = {
  schema: ClassSchema,
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
).optional().default([]);



const StudentEnrollmentSchema = z.object({
  uid: z.string(),
  admin: z.boolean().default(false),
  credits: z.number().int().positive(),
  created_at: TimestampFieldType,
  points: z.number().int().default(0),
  team: TeacherTeamEnrollmentsType
});




export const StudentEnrollment = {
  schema: StudentEnrollmentSchema,
  
  collection: FirebaseCollections.STUDENT_ENROLLMENTS
}

//
// ========================== Events ==========================
//
const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  points: z.number().int(),
  created_at: TimestampFieldType
});




export const EventWrapper = {
  schema: EventSchema,
  
  collection: FirebaseCollections.EVENTS
}


//
// ========================== Teacher Events ==========================
//
const TeacherEventRegistrationSchema = z.object({
  event_id: z.string(),
  teacher_id: z.string(),
  description: z.string().optional().default("Nessuna descrizione"),
  created_at: TimestampFieldType
});




export const TeacherEventRegistration = {
  schema: TeacherEventRegistrationSchema,
  
  collection: FirebaseCollections.TEACHER_EVENTS
}




