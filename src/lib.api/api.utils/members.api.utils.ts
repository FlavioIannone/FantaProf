import { MembersTableRowType } from "@/lib/data/types.data-layer";
import { cache } from "react";
import { admin_firestore, admin_auth } from "../firebase-connection";
import { Class, StudentEnrollment } from "../schema.db";

/**
 * Retrieves every member of an existing class from Firestore + Auth.
 */
export const getClassMembersFromFirestore = cache(async (
    class_id: string
): Promise<MembersTableRowType[] | undefined> => {
    try {
        // Get all student enrollments ordered by points desc
        const membersEnrollmentSnapshot = await admin_firestore
            .collection(Class.collection)
            .doc(class_id)
            .collection(StudentEnrollment.collection)
            .orderBy("points", "desc")
            .get();

        if (membersEnrollmentSnapshot.empty) {
            return [];
        }

        // Extract UIDs from enrollment docs
        const uids = membersEnrollmentSnapshot.docs.map(doc => {
            const data = StudentEnrollment.schema.parse(doc.data());
            return { uid: data.uid };
        });

        // Fetch user accounts in bulk
        const getUserResult = await admin_auth.getUsers(uids);

        // Defensive: If users length mismatches enrollment, map by UID instead
        const userMap = new Map(getUserResult.users.map(user => [user.uid, user]));

        // Combine Firestore + Auth data
        const members: MembersTableRowType[] = [];

        for (const enrollmentDoc of membersEnrollmentSnapshot.docs) {
            const enrollment = StudentEnrollment.schema.parse(enrollmentDoc.data());
            const user = userMap.get(enrollment.uid);

            if (!user) {
                console.warn(`[getClassMembersFromFirestore] Missing auth user for uid ${enrollment.uid}`);
                continue;
            }

            members.push({
                display_name: user.displayName ?? "No name",
                photo_URL: user.photoURL ?? "",
                credits: enrollment.credits ?? 0,
                points: enrollment.points ?? 0,
                admin: enrollment.admin ?? false,
                email: user.email ?? "No email",
                uid: user.uid,
            });
        }

        return members;
    } catch (err) {
        console.error("[getClassMembersFromFirestore]", err);
        return undefined;
    }
});

/**
 * Makes a member admin in a class by setting admin = true in enrollment doc.
 */
export const makeUserAdminInFirestore = async (uid: string, class_id: string): Promise<boolean> => {
    try {
        const studentDocRef = admin_firestore
            .collection(Class.collection)
            .doc(class_id)
            .collection(StudentEnrollment.collection)
            .doc(uid);

        await studentDocRef.update({ admin: true });
        return true;
    } catch (err) {
        console.error("[makeUserAdminInFirestore]", err);
        return false;
    }
};
