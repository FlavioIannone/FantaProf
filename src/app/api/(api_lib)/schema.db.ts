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
 * ├── Teachers (teacher_id, name, surname, description)
 * ├── Classes (class_name, initial_credits, members, createdAt)
 * ├── StudentEnrollments (uid, admin, credits, createdAt, points)
 * ├── TeacherEnrollments (teacher_id, class_id, cost)
 * ├── Events (name, description, logical_removal)
 * ├── EventRegistrations (event_id, class_id, points)
 * ├── TeacherEvents (event_id, teacher_id, points)
 * ├── Teams (team_id, uid)
 * └── TeacherTeamEnrollments (team_id, teacher_id, captain)
 */

import { Timestamp, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { z } from "zod";

// 🕒 Custom Zod validator for Firestore Timestamps
const TimestampType = z.custom<Timestamp>((value) => value instanceof Timestamp);

//
// ========================== Teachers ==========================
//
const TeacherSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
});
export type Teacher = z.infer<typeof TeacherSchema>;

export const teacherConverter: FirestoreDataConverter<Teacher> = {
  toFirestore: (teacher: Teacher) => teacher,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    TeacherSchema.parse(snapshot.data()),
};

//
// ========================== Classes ==========================
//
const ClassSchema = z.object({
  class_name: z.string().min(1),
  initial_credits: z.number().int().positive(),
  members: z.number().int().positive().optional().default(0),
  createdAt: TimestampType,
});
export type Class = z.infer<typeof ClassSchema>;

export const classConverter: FirestoreDataConverter<Class> = {
  toFirestore: (classData: Class) => classData,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    ClassSchema.parse(snapshot.data()),
};

//
// ========================== Student Enrollments ==========================
//
const StudentEnrollmentSchema = z.object({
  uid: z.string(),
  admin: z.boolean(),
  credits: z.number().int(),
  createdAt: TimestampType,
  points: z.number().int().positive().default(0),
});
export type StudentEnrollment = z.infer<typeof StudentEnrollmentSchema>;

export const studentEnrollmentConverter: FirestoreDataConverter<StudentEnrollment> = {
  toFirestore: (studentEnrollment: StudentEnrollment) => studentEnrollment,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    StudentEnrollmentSchema.parse(snapshot.data()),
};

//
// ========================== Teacher Enrollments ==========================
//
const TeacherEnrollmentSchema = z.object({
  teacher_id: z.string(),
  class_id: z.string(),
  cost: z.number().int(),
  createdAt: TimestampType
});
export type TeacherEnrollment = z.infer<typeof TeacherEnrollmentSchema>;

export const teacherEnrollmentConverter: FirestoreDataConverter<TeacherEnrollment> = {
  toFirestore: (teacherEnrollment: TeacherEnrollment) => teacherEnrollment,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    TeacherEnrollmentSchema.parse(snapshot.data()),
};

//
// ========================== Events ==========================
//
const EventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default("Nessuna descrizione"),
  logical_removal: z.boolean().optional().default(false),
  createdAt: TimestampType
});
export type Event = z.infer<typeof EventSchema>;

export const eventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (event: Event) => event,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    EventSchema.parse(snapshot.data()),
};

//
// ========================== Event Registrations ==========================
//
const EventRegistrationSchema = z.object({
  event_id: z.string(),
  class_id: z.string(),
  points: z.number().int(),
  createdAt: TimestampType
});
export type EventRegistration = z.infer<typeof EventRegistrationSchema>;

export const eventRegistrationConverter: FirestoreDataConverter<EventRegistration> = {
  toFirestore: (event: EventRegistration) => event,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    EventRegistrationSchema.parse(snapshot.data()),
};

//
// ========================== Teacher Events ==========================
//
const TeacherEventSchema = z.object({
  event_id: z.string(),
  teacher_id: z.string(),
  points: z.number().int(),
  createdAt: TimestampType
});
export type TeacherEvent = z.infer<typeof TeacherEventSchema>;

export const teacherEventConverter: FirestoreDataConverter<TeacherEvent> = {
  toFirestore: (teacherEvent: TeacherEvent) => teacherEvent,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    TeacherEventSchema.parse(snapshot.data()),
};

//
// ========================== Teams ==========================
//
const TeamSchema = z.object({
  team_id: z.string(),
  uid: z.string(),
  createdAt: TimestampType
});
export type Team = z.infer<typeof TeamSchema>;

export const teamConverter: FirestoreDataConverter<Team> = {
  toFirestore: (team: Team) => team,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    TeamSchema.parse(snapshot.data()),
};

//
// ========================== Teacher Team Enrollments ==========================
//
const TeacherTeamEnrollmentSchema = z.object({
  team_id: z.string(),
  teacher_id: z.string(),
  captain: z.boolean().optional().default(false),
  createdAt: TimestampType
});
export type TeacherTeamEnrollment = z.infer<typeof TeacherTeamEnrollmentSchema>;

export const teacherTeamEnrollmentConverter: FirestoreDataConverter<TeacherTeamEnrollment> = {
  toFirestore: (teacherTeamEnrollment: TeacherTeamEnrollment) =>
    teacherTeamEnrollment,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    TeacherTeamEnrollmentSchema.parse(snapshot.data()),
};
