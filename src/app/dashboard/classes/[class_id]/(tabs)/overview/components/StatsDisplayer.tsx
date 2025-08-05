import {
  getClassAction,
  getStudentEnrollmentDataAction,
} from "@/lib/data/classes/classes.data";
import StatSection from "./StatSection";
import { FilteredStudentEnrollmentData } from "@/lib/data/types.data-layer";

export default async function Stats({
  class_id,
  studentEnrollment,
}: {
  class_id: string;
  studentEnrollment: FilteredStudentEnrollmentData | undefined;
}) {
  const classRes = await getClassAction(class_id);

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 w-full">
      <StatSection
        title="Membri"
        value={!classRes ? "N/D" : `${classRes.members ?? "?"}`}
        icon="bi-people"
        className="bg-linear-to-r from-purple-500 to-purple-600 shadow-xl shadow-purple-500/50"
      />
      <StatSection
        title="Crediti"
        value={
          !studentEnrollment ? "N/D" : `${studentEnrollment.credits ?? "?"}`
        }
        icon="bi-credit-card"
        className="bg-linear-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/50"
      />
      <StatSection
        title="Punti"
        value={
          !studentEnrollment ? "N/D" : `${studentEnrollment.points ?? "?"}`
        }
        icon="bi-trophy"
        className="bg-linear-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/50"
      />
      <StatSection
        title="Professori"
        value={!classRes ? "N/D" : `${classRes.teachers ?? "?"}`}
        icon="bi-mortarboard"
        className="bg-linear-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50"
      />
    </div>
  );
}
