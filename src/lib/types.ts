import { deleteSession } from "./data/session/session-manager.data-layer";
import { client_auth } from "./firebase-connection.client";

type ErrorStatuses = 400 | 402 | 403 | 404 | 409 | 500;
type SuccessStatuses = 200;
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
export type WriteOperationResult<T = void> =
  | {
      message: string;
      status: ErrorStatuses;
    }
  | {
      status: SuccessStatuses;
      data?: T;
    };

/**
 * Result type for read operations in Firestore
 * @description Used to indicate whether a read operation was successful or not.
 */
export type ReadOperationResult<T> =
  | {
      message: string;
      status: ErrorStatuses;
    }
  | {
      status: SuccessStatuses;
      data: T;
    };

/**
 * Result type for read operations in Firestore
 * @description Used to indicate whether a read operation was successful or not.
 */
export type TeacherDataInput = {
  name: string;
  surname: string;
  description?: string;
  price: number;
};

export type EventRegistrationRowType = {
  registration_id: string;
  title: string;
  points: number;
  description: string;
  teacher_name: string;
  created_at: Date;
};

/**
 * Delays the execution for a specified number of seconds.
 * @param seconds Number of seconds to delay
 * @description Returns a promise that resolves after the specified number of seconds.
 */
export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const licenses = [
  {
    name: "questo sito",
    link: "https://github.com/FlavioIannone/FantaProf/blob/main/LICENSE",
  },
  {
    name: "Next.js",
    link: "https://github.com/vercel/next.js/blob/canary/license.md",
  },
  {
    name: "React.js",
    link: "https://github.com/reactjs/react.dev/blob/main/LICENSE-DOCS.md",
  },
  {
    name: "Tailwind.css",
    link: "https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE",
  },
  {
    name: "DaisyUI",
    link: "https://github.com/saadeghi/daisyui/blob/master/LICENSE",
  },
  {
    name: "Bootstrap Icons",
    link: "https://github.com/twbs/bootstrap/blob/main/LICENSE",
  },
];

export class AuthenticationWorkflowCodes {
  static readonly joinClass = "join-class";
  static readonly sessionExpired = "session-expired";
  static readonly reauthenticationNeeded = "reauthentication-needed";
}

export const handleLogout = async () => {
  // Delete the session
  const sessionDeletionRes = await deleteSession();
  try {
    if (sessionDeletionRes) {
      // Sign out from Firebase client
      await client_auth.signOut();
    }
    return true;
  } catch (error) {
    return false;
  }
};
