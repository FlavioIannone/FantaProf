import { UserRecord } from "firebase-admin/auth";
import { ApiError } from "next/dist/server/api-utils";

/**
 * Form data filled by the user on signin
 */
export type SignInData = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

/**
 * Form data filled by the user on login
 */
export type LoginData = {
  email: string | undefined;
  password: string | undefined;
};


/**
 * User profile data
 */
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

export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
