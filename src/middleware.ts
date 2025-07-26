import { NextRequest, NextResponse } from "next/server";
import { reqHasBodyBasedOnPath } from "./lib/types";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const classesRequestHasBody = reqHasBodyBasedOnPath(req, "/classes", [
    "POST",
  ]);

  // Verify if the reqeust has a body (applied only for certain endpoints and methods)
  if (!classesRequestHasBody) {
    return NextResponse.json(
      {
        message: "A body is required for this endpoint.",
      },
      {
        status: 400,
      }
    );
  }

  // True if the middleware is disabled.
  // If the middleware is disabled, the idToken won't be verified.
  const isMiddlewareDisabled = process.env.DISABLE_MIDDLEWARE === "true";
  // !DEBUG:
  // console.log("Middleware on: " + !isMiddlewareDisabled);

  if (
    !isMiddlewareDisabled &&
    req.nextUrl.pathname.startsWith("/api/protected")
  ) {
    if (!req.headers.has("Authorization")) {
      //? const modalTitle = "Errore di autenticazione";
      //? const modalBody = "Non sei autorizzato a compiere questa azione";
      //? const res = NextResponse.redirect(
      //?   `${process.env.BASE_URL}/auth/login?showModal=true&modalTitle=${modalTitle}&modalBody=${modalBody}`
      //? );
      //? res.headers.set("Method", "GET");
      return NextResponse.json(
        {
          message: "Auth Token is not present in the request headers.",
        },
        {
          status: 401,
        }
      );
    }

    const token = req.headers.get("Authorization")!.replace("Bearer ", "");
    // Verify the token
    const verifyTokenRes = await fetch(
      `${process.env.BASE_URL}/api/verify-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // If the token is not verified, return unauthorized error
    if (verifyTokenRes.status !== 200) {
      //? const modalTitle = "Errore di autenticazione";
      //? const modalBody = "Non sei autorizzato a compiere questa azione";
      //? const res = NextResponse.redirect(
      //?   `${process.env.BASE_URL}/auth/login?showModal=true&modalTitle=${modalTitle}&modalBody=${modalBody}`
      //? );
      return NextResponse.json(
        {
          message: "Auth Token is not valid, revoked or expired.",
        },
        {
          status: verifyTokenRes.status,
        }
      );
    }

    // Obtain the uid and pass it to the api endpoint as a cookie
    const { uid } = await verifyTokenRes.json();

    const response = NextResponse.next();
    response.headers.set("Authorization", `Bearer ${uid}`);
    return response;
  }

  //Continue with the flow
  const response = NextResponse.next();
  return response;
};

export const config = {
  matcher: "/api/protected/:path*",
};
