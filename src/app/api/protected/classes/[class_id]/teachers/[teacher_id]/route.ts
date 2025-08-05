import { deleteTeacher, modifyTeacher } from "@/app/api/(api_lib)/api.utils/classes.api.utils";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ class_id: string, teacher_id: string }> }): Promise<NextResponse> => {
    const { class_id, teacher_id } = await params;

    return await deleteTeacher(teacher_id, class_id);
}

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ class_id: string, teacher_id: string }> }): Promise<NextResponse> => {
    const { class_id, teacher_id } = await params;
    const teacherData = await req.json();

    return await modifyTeacher(teacher_id, class_id, teacherData);
}