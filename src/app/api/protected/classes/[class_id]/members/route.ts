import { getClassMembers } from "@/app/api/(api_lib)/api.utils/classes.api.utils";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,

  { params }: { params: Promise<{ class_id: string }> }
): Promise<NextResponse> => {
  const { class_id } = await params;
  return getClassMembers(class_id);
};
