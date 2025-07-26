import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClass, getClasses } from "../../(api_lib)/api.utils/classes.api.utils";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;

  return await getClasses(uid);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;

  const body = (await req.json()) as {
    name: string;
    initial_credits: number;
  };

  return await createClass({
    uid,
    classData: body,
  });
};
