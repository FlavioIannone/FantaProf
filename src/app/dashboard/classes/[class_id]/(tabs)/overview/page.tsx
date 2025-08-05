import { getStudentEnrollmentDataAction } from "@/lib/data/classes/classes.data";
import MembersTable from "./components/MembersTable/MembersTable";
import StatsDisplayer from "./components/StatsDisplayer";

export default async function OverviewTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  const studentEnrollmentRes = await getStudentEnrollmentDataAction(class_id);

  return (
    <div className="flex tab flex-col">
      <StatsDisplayer
        class_id={class_id}
        studentEnrollment={studentEnrollmentRes}
      />
      <MembersTable
        class_id={class_id}
        studentEnrollment={studentEnrollmentRes}
      />
    </div>
  );
}
