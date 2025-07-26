import { getBestScore, getClassesEnrollmentCount } from "@/app/api/(api_lib)/api.utils/users.api.utils";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
  const bestScore = await getBestScore(uid);
  const enrollmentCount = await getClassesEnrollmentCount(uid);

  return NextResponse.json({
    bestScore: bestScore,
    enrollmentCount: enrollmentCount,
  });
};
