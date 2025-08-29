// TYPES
export type ClassRowType = {
  class_name: string;
  members: number;
  teachers: number;
  class_id: string;
  currUserData: {
    points: number;
    credits: number;
    admin: boolean;
  };
};

export type MemberRowType = {
  display_name: string;
  credits: number;
  points: number;
  admin: boolean;
  photo_URL: string;
  email: string;
  uid: string;
};

export type TeacherRowType = {
  name: string;
  surname: string;
  price: number;
  description: string;
  teacher_id: string;
};

/**
 * Represents editable teacher data for modification.
 * All fields are optional to allow partial updates.
 */
export type TeacherDataEditForm = {
  name?: string;
  surname?: string;
  description?: string;
  price?: number;
};

export type EventTemplateType = {
  title: string;
  description: string;
  points: number;
  event_id: string;
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
