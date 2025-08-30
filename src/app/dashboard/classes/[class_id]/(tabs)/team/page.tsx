import { admin_firestore } from "@/lib/db/firebase-connection.server";
import { Class } from "@/lib/db/schema.db";
import TeacherTeamTableRow from "./components/TeacherTeamTableRow";
import { getTeam } from "@/lib/data/data-layer/team.data-layer";
import NoDataUI from "@/components/server/NoDataUI";
import { getClassData } from "@/lib/data/data-layer/classes.data-layer";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import { redirect } from "next/navigation";
import { calculatePointsBasedOnTeachersInTeamInFirestore } from "@/lib/db/db.utils/members.db.utils";

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
  const [teamRes, classRes, studentEnrollmentRes] = await Promise.all([
    getTeam(class_id),
    getClassData(class_id, ["initial_credits"]),
    getCurrentUserEnrollmentData(class_id),
  ]);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  if (classRes.status !== 200) {
    return null;
  }

  const renderTeamTableUI = () => {
    if (teamRes.status === 200) {
      const notDeletedTeachers = teamRes.data.filter(
        (teacher) => !teacher.deleted
      );

      return (
        <>
          {notDeletedTeachers.map((teacherData) => (
            <TeacherTeamTableRow
              class_id={class_id}
              key={teacherData.teacher_id}
              teacherData={teacherData}
            />
          ))}
        </>
      );
    }
    if (teamRes.status === 404) {
      return (
        <NoDataUI
          message="Il tuo team è vuoto"
          additionalMessage="Aggiungi dei professori al team per vederli qui"
        />
      );
    }
    return (
      <NoDataUI message="Si è verificato un errore durante il caricamento del team" />
    );
  };

  const renderDeletedTeachersUI = () => {
    if (teamRes.status === 200) {
      const deletedTeachers = teamRes.data.filter((teacher) => teacher.deleted);

      if (deletedTeachers.length === 0) return null;

      return (
        <>
          <h2 className="text-2xl font-extrabold mt-5 flex items-center gap-1">
            Professori eliminati
            <div className="d-tooltip sm:d-tooltip-right d-tooltip-left">
              <button
                type="button"
                className="d-btn d-btn-soft d-btn-primary d-btn-circle rounded-full border-0"
              >
                <i className="bi bi-info text-3xl"></i>
              </button>
              <div className="d-tooltip-content text-center">
                Professori non più in classe, ma validi per i tuoi punti
              </div>
            </div>
            :
          </h2>
          <div className="space-y-1.5 mt-2">
            {deletedTeachers.map((teacherData) => (
              <TeacherTeamTableRow
                class_id={class_id}
                key={teacherData.teacher_id}
                teacherData={teacherData}
              />
            ))}
          </div>
        </>
      );
    }
    if (teamRes.status === 404) {
      return (
        <>
          <h2 className="text-3xl font-extrabold mt-5">
            <span className="bi bi-backpack3 me-2" aria-hidden></span>
            Professori eliminati:
          </h2>
          <NoDataUI
            message="Il tuo team è vuoto"
            additionalMessage="Aggiungi dei professori al team per vederli qui"
          />
        </>
      );
    }
    return (
      <>
        <h2 className="text-3xl font-extrabold mt-5">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Professori eliminati:
        </h2>
        <NoDataUI message="Si è verificato un errore durante il caricamento del team" />
      </>
    );
  };

  return (
    <>
      <div className="d-rounded-box flex items-center shadow-lg border border-base-300 p-5">
        <div className="grow">
          <p className="text-primary">
            <span className="text-4xl">
              {calculatePointsBasedOnTeachersInTeamInFirestore(
                studentEnrollmentRes.data.uid,
                class_id
              )}
            </span>
            pts
          </p>
          <p>Il tuo punteggio</p>
        </div>
        <div className="grow">
          <p className="text-primary">
            <span className="text-4xl">
              {studentEnrollmentRes.data.credits}
            </span>
            /{classRes.data.initial_credits}
          </p>
          <p>Crediti rimanenti</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Il tuo team
        </h2>
        <div className="space-y-1.5 mt-2">{renderTeamTableUI()}</div>
        {/* Deleted Teachers */}
        {renderDeletedTeachersUI()}
      </div>
    </>
  );
}
