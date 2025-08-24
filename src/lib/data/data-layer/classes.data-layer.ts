import "server-only"

import {
    getClassesFromFirestore,
    getClassFromFirestore,
} from "@/lib/db/db.utils/classes.db.utils";
import { withSession } from "../session/session-helpers.data-layer";
import z from "zod";
import { Class } from "@/lib/db/schema.db";

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

export const getClassData = withSession(
    async <K extends keyof ClassType>(uid: string, class_id: string, includeKeys?: readonly K[]): Promise<Pick<ClassType, K> | undefined> => {
    const data = await getClassFromFirestore(class_id);
    if (!data) return undefined;

    if(!includeKeys) {
        return data;
    }
    // Create an object with only the requested keys
    const picked: Partial<ClassType> = {};
    for (const key of includeKeys) {
      picked[key] = data[key];
    }

    return picked as Pick<ClassType, K>;
  }
);
