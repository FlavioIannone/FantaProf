import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ClassData,
  createClass,
  getClasses,
} from "../../(api_lib)/classes.api.utils";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;

  return await getClasses(uid);
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const uid = req.headers.get("Authorization")?.replace("Bearer ", "")!;
  console.log(uid);

  const body = (await req.json()) as ClassData;

  return await createClass({
    uid,
    classData: body,
  });
};
