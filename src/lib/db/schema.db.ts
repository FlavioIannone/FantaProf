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
 * ├── Classes (class_name, initial_credits, members, teachers, admin_count, game_started, market_locked, use_anti_cheat,created_at)
 * │    ├── class_name: string
 * │    ├── initial_credits: number
 * │    ├── members: number,
 * │    ├── teachers: number,
 * │    ├── admin_count: number,
 * │    ├── game_started: boolean,
 * │    ├── market_locked: boolean,
 * │    ├── use_anti_cheat: boolean,
 * │    ├── created_at: Timestamp,
 * │    ├── Teachers ( name, surname, description, points, deleted, price, created_at)
 * │    │   ├── name: string
 * │    │   ├── surname: string
 * │    │   ├── description: string
 * │    │   ├── points: number
 * │    │   ├── deleted: boolean
 * │    │   ├── points: number
 * │    │   └── created_at: Timestamp
 * │    ├── StudentEnrollments (uid, admin, credits, teacher_team_ids, team_captain_id, points, created_at)
 * │    │   ├── uid: string
 * │    │   ├── admin: boolean
 * │    │   ├── credits: number
 * │    │   ├── teacher_team_ids: Array<string>
 * │    │   ├── team_captain_id: string
 * │    │   ├── points: number
 * │    │   ├── created_at: Timestamp
 * │    │   ├── Team(teacher_id, captain, points, price, created_at)
 * │    │   │   ├── teacher_id: string,
 * │    │   │   ├── captain: boolean,
 * │    │   │   ├── points: number,
 * │    │   │   ├── price: number,
 * │    │   └── └── created_at: Timestamp
 * │    ├── Events (title, description, points, created_at)
 * │    │   ├── title: string
 * │    │   ├── description: string
 * │    │   ├── points: number
 * │    │   ├── deleted: boolean
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
  static readonly EVENTS = "events";

  // *STUDENTENROLLMENTS* sub collections
  static readonly TEAM = "team";
}

import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

const TimestampFieldType = z
  .union([z.instanceof(Timestamp), z.undefined()])
  .optional()
  .transform((value) => {
    if (value instanceof Timestamp) return value.toDate();
    if (!value) return FieldValue.serverTimestamp();
  });

//
// ========================== Teachers ==========================
//
const TeacherSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  price: z.number().positive(),
  points: z.number().optional().default(0),
  deleted: z.boolean().optional().default(false),
  created_at: TimestampFieldType,
});

export const Teacher = {
  schema: TeacherSchema,
  collection: FirebaseCollections.TEACHERS,
};

//
// ========================== Classes ==========================
//
const ClassSchema = z.object({
  class_name: z.string(),
  initial_credits: z.int().positive(),
  members: z.int().positive().optional().default(1),
  admin_count: z.int().optional().default(1),
  created_at: TimestampFieldType,
  game_started: z.boolean().optional().default(false),
  market_locked: z.boolean().optional().default(false),
  teachers: z.int().optional().default(0),
  use_anti_cheat: z.boolean().optional().default(false),
});

export const Class = {
  schema: ClassSchema,
  collection: FirebaseCollections.CLASSES,
};

//
// ========================== Teams ==========================
//

const TeamEnrollmentSchema = z.object({
  captain: z.boolean(),
  created_at: TimestampFieldType,
  points: z.int().optional().default(0),
  price: z.number().min(0).optional().default(0),
});

export const TeamEnrollment = {
  schema: TeamEnrollmentSchema,
  collection: FirebaseCollections.TEAM,
};

//
// ========================== Student Enrollments ==========================
//
const StudentEnrollmentSchema = z.object({
  uid: z.string(),
  admin: z.boolean().optional().default(false),
  credits: z.number().int().min(0),
  created_at: TimestampFieldType,
  teacher_team_ids: z.array(z.string()).optional().default([]),
  team_captain_id: z.string().optional().default(""),
  points: z.int().optional().default(0),
});

export const StudentEnrollment = {
  schema: StudentEnrollmentSchema,
  collection: FirebaseCollections.STUDENT_ENROLLMENTS,
};

//
// ========================== Events ==========================
//
const EventTemplateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  points: z.number().int(),
  deleted: z.boolean().optional().default(false),
  created_at: TimestampFieldType,
});

export const EventTemplate = {
  schema: EventTemplateSchema,

  collection: FirebaseCollections.EVENTS,
};

//
// ========================== Teacher Events ==========================
//
const EventRegistrationSchema = z.object({
  event_id: z.string(),
  teacher_id: z.string(),
  description: z.string().optional().default("Nessuna descrizione"),
  created_at: TimestampFieldType,
});

export const EventRegistration = {
  schema: EventRegistrationSchema,

  collection: FirebaseCollections.TEACHER_EVENTS,
};
