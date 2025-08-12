
// TYPES
export type ClassesTableRowType = {
    class_name: string;
    members: number;
    teachers: number;
    credits: number;
    points: number;
    class_id: string;
    admin: boolean;
};

export type MembersTableRowType = {
    display_name: string;
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