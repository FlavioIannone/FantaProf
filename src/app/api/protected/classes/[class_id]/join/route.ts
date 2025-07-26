import { joinClass } from "@/app/api/(api_lib)/api.utils/classes.api.utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> }
): Promise<NextResponse> => {
  const { class_id } = await params;
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
  return joinClass(class_id, uid)
};
