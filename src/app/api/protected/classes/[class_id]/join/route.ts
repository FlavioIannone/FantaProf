import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> }
): Promise<NextResponse> => {
  const { class_id } = await params;
  return NextResponse.json(
    {
      message: `Class ${class_id} joined.`,
    },
    {
      status: 200,
    }
  );
};
