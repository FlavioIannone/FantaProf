import { makeUserAdmin } from "@/app/api/(api_lib)/api.utils/classes.api.utils";
import { type NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const { uid } = await req.json() as { uid: string };
    return await makeUserAdmin(uid, class_id);
}