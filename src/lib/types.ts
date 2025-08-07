import { UserRecord } from "firebase-admin/auth";
import { ApiError } from "next/dist/server/api-utils";

/**
 * Form data filled by the user on signin
 *  @description This type is used to represent the data that the user fills in the signin form.
 */
export type SignInData = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

/**
 * Form data filled by the user on login
 * @description This type is used to represent the data that the user fills in the login form.
 */
export type LoginData = {
  email: string | undefined;
  password: string | undefined;
};


/**
 * User profile data
 * @description This type is used to represent the user profile data that can be retrieved from Firebase.
 */
export type UserData = {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
};

/**
 * Result type for write operations in Firestore
 * @description Used to indicate whether a write operation was successful or not.
 */
export type WriteOperationResult = {
  successful: true
} | {
  successful: false,
  message: string,
  status: number
}

/**
 * Result type for read operations in Firestore
 * @description Used to indicate whether a read operation was successful or not.
 */
export type TeacherDataInput = { name: string, surname: string, description?: string, price: number }


/**
 * Delays the execution for a specified number of seconds.
 * @param seconds Number of seconds to delay
 * @description Returns a promise that resolves after the specified number of seconds.
 */
export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};


