import { leaveClassInFirestore } from "@/lib.api/api.utils/classes.api.utils";
import { verifySession } from "@/lib/data/sessionManagement/session-validation.data-layer";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ class_id: string }> }): Promise<NextResponse> => {
    const { class_id } = await params;
    const sessionRef = await verifySession();
    if (!sessionRef.successful) {
        return NextResponse.redirect("/auth/login?reason=session-expired")
    }
    revalidatePath("/dashboard")
    return leaveClassInFirestore(sessionRef.session.uid, class_id)
}