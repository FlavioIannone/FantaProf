"use server";
import { admin_auth } from "@/lib/db/firebase-connection.server";
import { DecodedIdToken, FirebaseAuthError } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Creates a session for the user.
 * @param idToken The Firebase ID token to create a session from.
 * @param expiresIn The duration in milliseconds for which the session should be valid. Defaults to 1 hour.
 * @return Returns a promise that resolves when the session is created.
 */
export const createSession = async (
    idToken: string,
    expiresIn: number = 60 * 60 * 1000 // 1 hour default
): Promise<void> => {
    try {
        const sessionCookie = await admin_auth.createSessionCookie(idToken, {
            expiresIn,
        });
        const cookiesStore = await cookies();
        cookiesStore.set("session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: expiresIn / 1000,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * Verifies the user's session by checking the session cookie.
 * @returns Returns a promise that resolves to an object indicating whether the session verification was successful or not.
 */
type SessionVerificationResult =
    | {
        successful: true;
        session: DecodedIdToken;
    }
    | {
        successful: false;
        status: number;
    };
export const verifySession = async (): Promise<SessionVerificationResult> => {
    const cookiesStore = await cookies();
    if (!cookiesStore.has("session")) {
        return { successful: false, status: 400 };
    }
    const session = cookiesStore.get("session")!.value;
    try {
        const verifiedSession = await admin_auth.verifySessionCookie(session, true);
        return { successful: true, session: verifiedSession };
    } catch (error) {
        const authError = error as FirebaseAuthError;
        console.log(authError.message);
        return { successful: false, status: 401 };
    }
};

/**
 * Deletes the current session by revoking the refresh tokens and clearing the session cookie.
 * @returns Returns a promise that resolves when the session is deleted.
 */
export const deleteSession = async (): Promise<boolean> => {
    try {
        const res = await verifySession();
        if (!res.successful) {
            return true; // Redirects to home, no need to continue
        }
        // Revoke refresh tokens (invalidate all sessions)
        await admin_auth.revokeRefreshTokens(res.session.uid);
        const cookiesStore = await cookies();
        // Clear the session cookie
        cookiesStore.delete("session");
        return true;
    } catch (error) {
        console.error("Failed to revoke session:", error);
        return false;
    }
};


