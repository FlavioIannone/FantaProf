import "server-only";
import {
  getBestScoreFromFirestore,
  getClassesEnrollmentCountFromFirestore,
  getStudentEnrollmentDataFromFirestore,
} from "@/lib/db/db.utils/users.db.utils";
import { withSession } from "../session/session-helpers.data-layer";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "@/lib/db/db.utils/members.db.utils";

/**
 * Fetches global statistics for the currently authenticated user.
 *
 * @returns An object containing:
 * - bestScore: the user's highest score across all classes
 * - classesCount: the total number of classes the user is enrolled in
 *
 * Redirects to the login page if the session is invalid.
 */
export const getCurrentUserGlobalStats = withSession(async (uid: string) => {
  const bestScore = await getBestScoreFromFirestore(uid);
  const classesCount = await getClassesEnrollmentCountFromFirestore(uid);

  return {
    bestScore,
    classesCount,
  };
});

/**
 * Fetches the enrollment data of the currently authenticated student
 * for a specific class.
 *
 * @param class_id - The ID of the class
 * @returns Enrollment data for the user in the given class
 *
 * Redirects to the login page if the session is invalid.
 */
export const getCurrentUserEnrollmentData = withSession(
  async (uid: string, class_id: string) => {
    return await getStudentEnrollmentDataFromFirestore(class_id, uid);
  }
);

export const getCurrentUserPoints = withSession(
  async (uid: string, class_id: string) => {
    return await calculatePointsBasedOnTeachersInTeamInFirestore(uid, class_id);
  }
);
