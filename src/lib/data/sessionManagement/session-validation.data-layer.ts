"use server";
import { admin_auth } from "@/lib.api/firebase-connection";
import { DecodedIdToken, FirebaseAuthError } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


type SessionVerificationResult = {
    successful: true;
    session: DecodedIdToken;
} | {
    successful: false;
    status: number
}


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
        console.log(authError);
        return { successful: false, status: 401 };
    }
};

