import { type NextRequest, NextResponse } from "next/server";
import { admin_auth } from "../../(api_lib)/firebase-connection";

export const GET = async (req: NextRequest) => {
  // console.log("The token is being verified...");
  const token = req.headers
    .get("Authorization")
    ?.replace("Bearer ", "") as string;

  try {
    const verifiedToken = await admin_auth.verifyIdToken(token);

    return NextResponse.json(
      {
        uid: verifiedToken.uid,
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Auth Token is not valid, revoked or expired.",
      },
      {
        status: 401,
      }
    );
  }
};
