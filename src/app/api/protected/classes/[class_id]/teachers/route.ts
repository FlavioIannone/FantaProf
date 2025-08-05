import { addTeacher, deleteTeacher, getTeachers, TeacherDataInput } from "@/app/api/(api_lib)/api.utils/classes.api.utils";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
    return await getTeachers(uid, class_id);
}

export const POST = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const teacherData = await req.json() as TeacherDataInput;

    return await addTeacher(class_id, teacherData);
}

