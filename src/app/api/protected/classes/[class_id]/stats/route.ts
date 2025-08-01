
import { getClassStats } from "@/app/api/(api_lib)/api.utils/users.api.utils";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
    return getClassStats(class_id, uid);
}