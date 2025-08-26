import { admin_firestore } from "@/lib/db/firebase-connection.server";
import { Class } from "@/lib/db/schema.db";
import TeacherTeamTableRow from "./components/TeacherTeamTableRow";

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore.collection(Class.collection).get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

export default async function TeamTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <>
      <div className="d-rounded-box flex justify-between items-center shadow-lg border border-base-300 p-5">
        <div>
          <p className="text-primary">
            <span className="text-4xl">230</span>pts
          </p>
          <p>Il tuo punteggio</p>
        </div>
        <div>
          <p className="text-primary">
            <span className="text-4xl">100</span>/200
          </p>
          <p>Crediti rimanenti</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Il tuo team
        </h2>
        <div className="space-y-1.5 mt-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <TeacherTeamTableRow
              key={index}
              teacherData={{
                name: "Prof",
                surname: `${index + 1}`,
                price: (index + 1) * 10,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
