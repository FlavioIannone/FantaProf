import { FieldValue } from "firebase-admin/firestore";

// Class doc type
export type ClassData = {
  class_name: string;
  initial_credits: number;
  createdAt: FieldValue; // Server timestamp
  members: number;
};

// Student enrollment doc type
export type StudentEnrollment = {
  uid: string;
  credits: number;
  admin: boolean;
  createdAt: FieldValue; // Server timestamp
  points: number;
};
