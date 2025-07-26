import { UserRecord } from "firebase-admin/auth";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export const reqHasBodyBasedOnPath: (
  req: NextRequest,
  pathToVerify: string,
  methodsToVerify: string[]
) => boolean = (
  req: NextRequest,
  pathToVerify: string,
  methodsToVerify: string[] = []
) => {
    // Lower case every element of the array
    methodsToVerify = methodsToVerify.map((value) => value.toLowerCase());

    // Obtain the path
    const path = req.nextUrl.pathname.replace("/api/protected", "");

    // Verify if the path is in this list
    if (path.startsWith(pathToVerify)) {
      if (methodsToVerify.length === 0) {
        // If the methodsToVerify is empty, verify both methods
        if (req.method === "POST" || req.method === "PUT") {
          if (parseInt(req.headers.get("Content-Length")!) === 0) {
            return false;
          }
        }
      } else {
        // If the methodsToVerify is not empty, verify the correct methods
        if (methodsToVerify.includes(req.method.toLowerCase())) {
          // Verify the content length
          if (parseInt(req.headers.get("Content-Length")!) === 0) {
            return false;
          }
        }
      }
    }
    return true; //If the path doesn't include pathToVerify or the request defines a body, just return true
  };

export class FirebaseCollections {
  // *CLASSES* collections
  static readonly CLASSES = "classes";
  // *STUDENTS* collections
  static readonly STUDENT_ENROLLMENTS = "students_enrollment";
  static readonly TEAMS = "teams";
  // *TEACHERS* collections
  static readonly TEACHERS = "teachers";
  static readonly TEACHER_EVENTS = "teacher_events";
  static readonly TEACHER_ENROLLMENT = "teacher_enrollment";
  static readonly TEACHER_TEAM_ENROLLMENT = "teacher_team_enrollment";
  // *EVENTS* collections
  static readonly EVENTS = "events";
  static readonly EVENT_REGISTRATIONS = "event_registrations";
}

export type SignInData = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

export type LoginData = {
  email: string | undefined;
  password: string | undefined;
};

export type UserData = {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
};

export const FirestoreCollections = {
  usersCollection: "Users",
};

export const ApiFirestoreErrorCodes = {
  NO_DATA_IN_DOC: "db/no-data-found-in-doc",
  DOC_NOT_FOUND: "db/no-doc-found",
  INVALID_DATA: "db/invalid-data-format",
} as const;

export const ResultType = {
  successful: "successful",
  unsuccessful: "unsuccessful",
} as const; // Use `as const` to make the object read-only and infer literal types

// Define a type to represent the values of ResultType
export type ResultType = (typeof ResultType)[keyof typeof ResultType];

//* Unsuccessful Result Type
export type UnsuccessfulResult = {
  type: typeof ResultType.unsuccessful;
  error: ApiError;
};

//* Successful Read User Data Result Type
export type SuccessfulUserDataReadResult = {
  type: typeof ResultType.successful;
  data: UserRecord;
};

//* Successful Write User Data Result Type
export type SuccessfulUserDataWriteResult = {
  type: typeof ResultType.successful;
  message?: string;
};
