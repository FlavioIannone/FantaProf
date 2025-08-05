import { type NextRequest, NextResponse } from "next/server";
import { revokeSessionAndClearCookie, setSessionCookie } from "@/lib.api/session.utils";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/data/sessionManagement/session-validation.data-layer";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
        return NextResponse.json({ message: "Id token not specified" }, { status: 400 });
    }

    const idToken = authHeader.replace("Bearer ", "");

    return await setSessionCookie(idToken);
}


export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    const cookiesStore = await cookies();

    if (!cookiesStore.has("session")) {
        // Already logged out, return success anyway
        return NextResponse.json({ message: "Already logged out" }, { status: 200 });
    }

    const res = await verifySession();

    if (!res.successful) {
        // Session invalid or expired — treat as logged out
        return NextResponse.json({ message: "Already logged out" }, { status: 200 });
    }

    return revokeSessionAndClearCookie(res.session.uid);
};
