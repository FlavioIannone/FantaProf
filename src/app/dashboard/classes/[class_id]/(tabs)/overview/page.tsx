import { admin_firestore } from "@/lib/db/firebase-connection.server";
import MembersTable from "./components/MembersTable/MembersTable";
import { Class } from "@/lib/db/schema.db";

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore
    .collection(Class.collection)
    .get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

export default async function OverviewTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <div className="flex tab flex-col">
      <MembersTable class_id={class_id} />
    </div>
  );
}
