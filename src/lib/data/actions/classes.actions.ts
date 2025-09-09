"use server";

import {
  createClassInFirestore,
  joinClassInFirestore,
  leaveClassInFirestore,
  startGameInFirestore,
  updateClassInFirestore,
} from "@/lib/db/db.utils/classes.db.utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { withSession } from "../session/session-helpers.data-layer";
import { verifySession } from "../session/session-manager.data-layer";
import { AuthenticationWorkflowCodes } from "@/lib/types";

/**
 * Creates a new class for the current user.
 *
 * @param class_data - Contains name and initial credits of the class.
 * Redirects to login if the session is invalid.
 * Revalidates dashboard on success.
 */
export const addClassAction = withSession(
  async (
    uid: string,
    class_data: {
      class_name: string;
      initial_credits: number;
      use_anti_cheat: boolean;
    }
  ) => {
    const res = await createClassInFirestore(uid, class_data);
    if (res.status === 200) {
      revalidatePath(`/dashboard`);
      revalidatePath(`/dashboard/classes/${res.data!.class_id}/overview`);
      revalidatePath(`/dashboard/classes/${res.data!.class_id}/events`);
      revalidatePath(`/dashboard/classes/${res.data!.class_id}/market`);
      revalidatePath(`/dashboard/classes/${res.data!.class_id}/join`);
    }
    return res;
  }
);

/**
 * Updates class data. Only name and initial credits can be updated.
 * @param class_id - The ID of the class to update.
 * @param class_data - The new class data. Only name and initial credits can be updated.
 * Revalidates all class pages on success.
 */
export const updateClassAction = withSession(
  async (
    uid: string,
    class_id: string,
    class_data: {
      class_name?: string;
      initial_credits?: number;
    }
  ) => {
    const res = await updateClassInFirestore(class_id, class_data);
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
      revalidatePath(`/dashboard/classes/${class_id}/events`);
      revalidatePath(`/dashboard/classes/${class_id}/market`);
      revalidatePath(`/dashboard/classes/${class_id}/join`);
      revalidatePath(`/dashboard/classes/${class_id}/class-settings`);
    }
    return res;
  }
);

export const startGameAction = withSession(
  async (uid: string, class_id: string) => {
    const res = await startGameInFirestore(class_id);
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
      revalidatePath(`/dashboard/classes/${class_id}/events`);
      revalidatePath(`/dashboard/classes/${class_id}/market`);
      revalidatePath(`/dashboard/classes/${class_id}/join`);
      revalidatePath(`/dashboard/classes/${class_id}/class-settings`);
    }
    return res;
  }
);

/**
 * Enrolls the user into a class.
 *
 * @param class_id - The ID of the class to join.
 * Redirects to login if the session is invalid.
 * If the write is unsuccessful, the two possible status are: 404, the class is not found; 409, the user is already part of the class; 423, the game has already started
 * Revalidates dashboard on success.
 * @returns Promise resolving to WriteOperationResult indicating success or failure
 */
export const joinClassAction = async (class_id: string) => {
  const res = await verifySession();
  if (!res.successful) {
    redirect(
      `/auth/login?reason=${encodeURIComponent(
        AuthenticationWorkflowCodes.joinClass
      )}&class_id=${encodeURIComponent(class_id)}`
    );
  }
  const joinResult = await joinClassInFirestore(res.session.uid, class_id);
  if (joinResult.status === 200) {
    revalidatePath("/dashboard");
  }
  return joinResult;
};

/**
 * Attempts to removes the user from a class. If the user is the only admin, he will not be removed
 *
 * @param class_id - The ID of the class to leave.
 * Redirects to login if the session is invalid.
 * Revalidates dashboard on success.
 * If the write is unsuccessful, the two possible status are: 404, the class is not found; 409, the user is  the only admin
 * @returns Promise resolving to WriteOperationResult indicating success or failure
 *
 */
export const leaveClassAction = withSession(
  async (uid: string, class_id: string) => {
    const leaveResult = await leaveClassInFirestore(uid, class_id);
    if (leaveResult.status === 200) {
      revalidatePath("/dashboard");
    }
    return leaveResult;
  }
);
