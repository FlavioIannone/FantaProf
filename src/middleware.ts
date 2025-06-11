import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized", status: 401 }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path+",
};
