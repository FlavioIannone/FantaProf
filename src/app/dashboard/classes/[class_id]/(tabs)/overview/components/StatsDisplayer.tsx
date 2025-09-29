import {
  getClassData,
  getClassDataWithSession,
} from "@/lib/data/data-layer/classes.data-layer";
import StatSection from "./StatSection";
import { getCurrentUserPoints } from "@/lib/data/data-layer/user.data-layer";
import { ReadOperationResult } from "@/lib/types";

type FilteredStudentEnrollmentData = {
  credits: number;
  admin: boolean;
};

export default async function Stats({
  class_id,
  studentEnrollment: studentEnrollmentRes,
}: {
  class_id: string;
  studentEnrollment: ReadOperationResult<FilteredStudentEnrollmentData>;
}) {
  const [classRes, points] = await Promise.all([
    getClassDataWithSession<"members" | "teachers">(class_id),
    getCurrentUserPoints(class_id),
  ]);

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 w-full">
      <StatSection
        title="Membri"
        value={classRes.status !== 200 ? "N/D" : `${classRes.data.members}`}
        icon="bi-people"
        className="bg-linear-to-r from-purple-500 to-purple-600 shadow-xl shadow-purple-500/50"
      />
      <StatSection
        title="Crediti"
        value={
          studentEnrollmentRes.status !== 200
            ? "N/D"
            : `${studentEnrollmentRes.data.credits}`
        }
        icon="bi-credit-card"
        className="bg-linear-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/50"
      />
      <StatSection
        title="Punti"
        value={!points ? "N/D" : points.toString()}
        icon="bi-trophy"
        className="bg-linear-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/50"
      />
      <StatSection
        title="Professori"
        value={classRes.status !== 200 ? "N/D" : `${classRes.data.teachers}`}
        icon="bi-mortarboard"
        className="bg-linear-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50"
      />
    </div>
  );
}
