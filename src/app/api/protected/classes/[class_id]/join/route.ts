import { joinClassInFirestore } from "@/lib.api/api.utils/classes.api.utils";
import { verifySession } from "@/lib/data/sessionManagement/session-validation.data-layer";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const sessionRes = await verifySession();
    const joinClassEndpoint = `/api/protected/classes/${class_id}/join`;
    console.log("URI: " + joinClassEndpoint);

    if (!sessionRes.successful) {
        return NextResponse.json({ redirect: `${process.env.BASE_URL}/auth/login?callbackUrl=${encodeURIComponent(joinClassEndpoint)}` }, { status: 303 });
    }
    return await joinClassInFirestore(sessionRes.session.uid, class_id);
}   