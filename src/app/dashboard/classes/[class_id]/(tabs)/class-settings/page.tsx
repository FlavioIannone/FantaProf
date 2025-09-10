import { getClassData } from "@/lib/data/data-layer/classes.data-layer";
import { admin_firestore } from "@/lib/db/firebase-connection.server";
import { Class } from "@/lib/db/schema.db";
import ClassDataSettingsCard from "./components/ClassDataSettingsCard";
import ClassDataTableDivider from "./components/TableDivider";
import StartGameButton from "./components/StartGameButton";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import { redirect } from "next/navigation";

export default async function ClassSettingsTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  const [classData, studentEnrollment] = await Promise.all([
    getClassData(class_id, [
      "class_name",
      "members",
      "teachers",
      "initial_credits",
      "game_started",
      "market_locked",
      "use_anti_cheat",
    ]),
    getCurrentUserEnrollmentData(class_id),
  ]);

  if (classData.status !== 200) {
    return null;
  }
  if (studentEnrollment.status !== 200) {
    redirect("/dashboard");
  }

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5">
        <span className="bi bi-gear me-2" aria-hidden></span>
        Impostazioni classe
      </h2>
      <div className="d-join flex flex-col border border-base-300 d-rounded-box [&_.d-join-item]:px-4 py-4 bg-base-200">
        <div className="d-join-item">
          <h2 className="text-3xl font-bold">Informazioni classe</h2>
          <h3 className="text-lg opacity-70">
            Le informazioni di base della classe
          </h3>
        </div>
        <ClassDataTableDivider />
        <div className="d-join-item">
          <ClassDataSettingsCard classData={{ ...classData.data, class_id }} />
        </div>
        {classData.data.use_anti_cheat && (
          <>
            <ClassDataTableDivider />
            <div className="w-full d-join-item">
              <div className="mb-3">
                <h2 className="text-3xl font-bold">
                  Inizia partita
                  <span className="d-badge d-badge-primary ms-1 animate-pulse motion-reduce:animate-none">
                    New
                  </span>
                </h2>
                <h3 className="text-lg opacity-70">
                  Cliccando il pulsante qui sotto, la partita inizierà per tutti
                  gli studenti. Assicurati di aver letto cosa comporta iniziare
                  la partita (vedi info sotto).
                </h3>
              </div>
              <StartGameButton classData={{ ...classData.data, class_id }} />
              <div className="space-y-1.5 mt-5">
                {classData.data.teachers === 0 && (
                  <InfoBox
                    message="Per poter iniziare a giocare, devi prima aggiungere almeno un professore
                  alla classe."
                  />
                )}
                <InfoBox
                  message="Una volta che la partita è iniziata, non sarà più possibile modificare i
                crediti iniziali, modificare il costo dei professori e unirsi
                alla classe."
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const InfoBox = ({ message }: { message: string }) => {
  return (
    <div className="p-2 bg-info/10 border border-info d-rounded-box">
      <p className="flex text-info items-center gap-2">
        <i
          className="bi bi-info bg-info text-info-content rounded-full p-2 size-7 text-lg flex items-center justify-center"
          aria-hidden
        ></i>
        {message}
      </p>
    </div>
  );
};

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore.collection(Class.collection).get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};
