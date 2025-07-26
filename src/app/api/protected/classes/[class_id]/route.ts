import { getClass } from "@/app/api/(api_lib)/classes.api.utils";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> }
): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
  const { class_id } = await params;
  return getClass(class_id);
};
