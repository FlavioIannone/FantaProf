import { admin_firestore } from "@/lib/db/firebase-connection.server";
import TeachersTable from "./components/TeachersTable";

import { Class } from "@/lib/db/schema.db";
import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";
import { getStudentEnrollmentData } from "@/lib/data/data-layer/user.data-layer";

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore
    .collection(Class.collection)
    .get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

export default async function MarketTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;

  return (
    <div className="flex tab flex-col">
      <TeachersTable class_id={class_id} />
    </div>
  );
}
