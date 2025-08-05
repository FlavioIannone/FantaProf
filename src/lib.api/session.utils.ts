import { NextResponse } from "next/server";
import { admin_auth } from "@/lib.api/firebase-connection";

// Used in the session endpoint


export const setSessionCookie = async (
    idToken: string,
    expiresIn: number = 60 * 60 * 1000 // 1 hour default
): Promise<NextResponse> => {
    try {
        const sessionCookie = await admin_auth.createSessionCookie(idToken, { expiresIn });

        const res = NextResponse.json({ message: "Session cookie set" });

        res.cookies.set({
            name: "session",
            value: sessionCookie,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: expiresIn / 1000,
        });

        return res;
    } catch {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
};


export const revokeSessionAndClearCookie = async (uid: string) => {
    try {
        // Revoke refresh tokens (invalidate all sessions)
        await admin_auth.revokeRefreshTokens(uid);

        // Prepare response with cookie cleared
        const res = NextResponse.json({ message: "Session revoked and cookie cleared" }, { status: 200 });

        res.cookies.set({
            name: "session",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0, // Expire immediately
        });

        return res;
    } catch (error) {
        console.error("Failed to revoke session:", error);
        return NextResponse.json({ message: "Failed to revoke session" }, { status: 500 });
    }
};
