import { redirect } from "next/navigation";
import { verifySession } from "../sessionManagement/session-validation.data-layer";
import { getBestScoreFromFirestore, getClassesEnrollmentCountFromFirestore } from "@/lib.api/api.utils/users.api.utils";

export const getGlobalStats = async () => {
    const res = await verifySession();
    if (!res.successful) {
        redirect("/auth/login?reason=session-expired")
    }
    const bestScore = await getBestScoreFromFirestore(res.session.uid);
    const classesCount = await getClassesEnrollmentCountFromFirestore(res.session.uid);
    return {
        bestScore,
        classesCount
    }
}