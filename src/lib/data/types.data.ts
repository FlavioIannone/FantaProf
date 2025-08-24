
// TYPES
export type ClassesTableRowType = {
    class_name: string;
    members: number;
    teachers: number;
    class_id: string;
    currUserData: {
        points: number;
        credits: number;
        admin: boolean;
    }
};

export type MembersTableRowType = {
    display_name: string ;
    credits: number;
    points: number;
    admin: boolean;
    photo_URL: string;
    email: string;
    uid: string;
};

export type TeacherTableRowType = {
    name: string;
    surname: string;
    price: number;
    description: string;
    teacher_id: string;
};

export type FilteredClassData = {
    members: number;
    teachers: number;
};

export type FilteredStudentEnrollmentData = {
    credits: number;
    points: number;
    admin: boolean
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