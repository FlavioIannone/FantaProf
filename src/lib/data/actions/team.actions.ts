"use server";
import {
  addTeacherToTeamInFirestore,
  makeTeacherCaptainInFirestore,
  removeTeacherFromTeamInFirestore,
} from "@/lib/db/db.utils/team.db.utils";
import { withSession } from "../session/session-helpers.data-layer";
import { revalidatePath } from "next/cache";

export const addTeacherToTeam = withSession(
  async (uid: string, class_id: string, teacher_id: string) => {
    const res = await addTeacherToTeamInFirestore(uid, class_id, teacher_id);
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/team`);
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
    }
    return res;
  }
);

export const removeTeacherFromTeam = withSession(
  async (uid: string, class_id: string, teacher_id: string) => {
    const res = await removeTeacherFromTeamInFirestore(
      uid,
      class_id,
      teacher_id
    );
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/team`);
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
    }
    return res;
  }
);

export const makeTeacherCaptain = withSession(
  async (uid: string, class_id: string, teacher_id: string) => {
    const res = await makeTeacherCaptainInFirestore(uid, class_id, teacher_id);
    if (res.status === 200) {
      revalidatePath(`/dashboard/classes/${class_id}/team`);
      revalidatePath(`/dashboard/classes/${class_id}/overview`);
    }
    return res;
  }
);
