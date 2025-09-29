import "server-only";

import {
  getClassesFromFirestore,
  getClassFromFirestore,
} from "@/lib/db/db.utils/classes.db.utils";
import { withSession } from "../session/session-helpers.data-layer";
import z from "zod";
import { Class } from "@/lib/db/schema.db";
import { ReadOperationResult } from "@/lib/types";

/**
 * Retrieves all classes the current user is enrolled in.
 *
 * @returns A list of classes.
 * Redirects to login if the session is invalid.
 */
export const getClasses = withSession(async (uid: string) => {
  return await getClassesFromFirestore(uid);
});

/**
 * Retrieves the data of a specific class.
 *
 * @param class_id - The ID of the class.
 * @returns Class data.
 * Redirects to login if the session is invalid.
 */
type ClassType = z.infer<typeof Class.schema>;

export const getClassData = async <K extends keyof ClassType>(
  class_id: string,
  includeKeys?: readonly K[]
): Promise<ReadOperationResult<Pick<ClassType, K>>> => {
  const res = await getClassFromFirestore(class_id);
  if (res.status !== 200) return res;

  if (!includeKeys) {
    return res;
  }
  // Create an object with only the requested keys
  const picked: Partial<ClassType> = {};
  for (const key of includeKeys) {
    picked[key] = res.data[key];
  }

  return { status: 200, data: picked as Pick<ClassType, K> };
};

export const getClassDataWithSession = withSession(
  async <K extends keyof ClassType>(
    uid: string,
    class_id: string,
    includeKeys?: readonly K[]
  ) => {
    return await getClassData(class_id, includeKeys);
  }
);
