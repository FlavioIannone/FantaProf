// TYPES

export type ClassData = {
  class_name: string;
  initial_credits: number;
  members: number;
  game_started: boolean;
  market_locked: boolean;
  teachers: number;
  class_id: string;
  use_anti_cheat: boolean;
};

export type UserData = {
  display_name: string;
  email: string;
  photo_URL: string;
  uid: string;
};

export type ClassRowType = Pick<
  ClassData,
  "class_id" | "class_name" | "teachers" | "members" | "initial_credits"
> & {
  currUserData: { credits: number; points: number; admin: boolean };
};

export type MemberRowType = UserData & {
  credits: number;
  points: number;
  admin: boolean;
};

export type TeacherRowType = {
  teacher_id: string;
  name: string;
  surname: string;
  price: number;
  description: string;
  deleted: boolean;
  points: number;
};

export type EventTemplateType = {
  title: string;
  description: string;
  points: number;
  event_id: string;
};

export type TeamEnrollment = TeacherRowType & {
  captain: boolean;
};

/**
 * Formats the date into a string
 * @param date - The date to format
 * @returns The `date` formatted into a DD-MM-YYYY style
 */
export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
