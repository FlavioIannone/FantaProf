import { UserRecord } from "firebase-admin/auth";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export const reqHasBodyBasedOnPath = (
  req: NextRequest,
  pathToVerify: string,
  methodsToVerify: string[] = [],
  excludePaths: string[] = []
): boolean => {
  const methods = methodsToVerify.map((m) => m.toLowerCase());
  const method = req.method.toLowerCase();
  const contentLength = parseInt(req.headers.get("Content-Length") || "0", 10);
  const path = req.nextUrl.pathname.replace("/api/protected", "");

  const matchesPattern = (pattern: string): boolean => {
    const regex = new RegExp(
      "^" + pattern.split("*").map(escapeRegex).join(".*") + "$"
    );
    return regex.test(path);
  };

  // ✅ Skip verification if path matches any exclusion
  if (excludePaths.some(matchesPattern)) {
    return true;
  }

  // ✅ Continue verification if path matches the main pattern
  if (matchesPattern(pathToVerify)) {
    if (
      methods.length === 0
        ? method === "post" || method === "put"
        : methods.includes(method)
    ) {
      return contentLength > 0;
    }
  }

  return true;
};

function escapeRegex(str: string): string {
  return str.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&");
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

export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
