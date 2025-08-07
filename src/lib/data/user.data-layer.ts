"use server";
import { redirect } from "next/navigation";
import { verifySession } from "./session/session-manager.data-layer";
import {
  getBestScoreFromFirestore,
  getClassesEnrollmentCountFromFirestore,
  getStudentEnrollmentDataFromFirestore,
} from "@/lib.api/api.utils/users.api.utils";


/**
 * Fetches global statistics for the currently authenticated user.
 * 
 * @returns An object containing:
 * - bestScore: the user's highest score across all classes
 * - classesCount: the total number of classes the user is enrolled in
 * 
 * Redirects to the login page if the session is invalid.
 */
export const getGlobalStatsAction = async () => {
  const res = await verifySession();
  if (!res.successful) {
    redirect("/auth/login?reason=session-expired");
  }

  const bestScore = await getBestScoreFromFirestore(res.session.uid);
  const classesCount = await getClassesEnrollmentCountFromFirestore(res.session.uid);

  return {
    bestScore,
    classesCount,
  };
};

/**
 * Fetches the enrollment data of the currently authenticated student
 * for a specific class.
 * 
 * @param class_id - The ID of the class
 * @returns Enrollment data for the user in the given class
 * 
 * Redirects to the login page if the session is invalid.
 */
export const getStudentEnrollmentDataAction = async (class_id: string) => {
  const res = await verifySession();
  if (!res.successful) {
    redirect("/auth/login?reason=session-expired");
  }

  return await getStudentEnrollmentDataFromFirestore(class_id, res.session.uid);
};
