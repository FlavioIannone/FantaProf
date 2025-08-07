
import MembersTableHeader from "./MembersTableHeader";
import MembersTableRow from "./MembersTableRow";
import NoDataUI from "../../../../components/NoDataUI";
import StatsDisplayer from "../StatsDisplayer";
import { getClassMembersAction } from "@/lib/data/members.data-layer";
import { getStudentEnrollmentDataAction } from "@/lib/data/user.data-layer";

export default async function MembersTable({ class_id }: { class_id: string }) {
  const members = await getClassMembersAction(class_id);
  const studentEnrollment = await getStudentEnrollmentDataAction(class_id);
  if (!members || (members && members.length === 0)) {
    return (
      <>
        <StatsDisplayer
          class_id={class_id}
          studentEnrollment={studentEnrollment}
        />
        <MembersTableHeader class_id={class_id} />
        {/* Show members list or error */}
        <NoDataUI message="Nessun membro aggiunto in questa classe" />
      </>
    );
  }

  return (
    <>
      <StatsDisplayer
        class_id={class_id}
        studentEnrollment={studentEnrollment}
      />
      <MembersTableHeader class_id={class_id} />
      <div className="space-y-2.5">
        {members.map((row) => (
          <MembersTableRow
            member={row}
            key={row.uid}
            class_id={class_id}
            isAdmin={studentEnrollment ? studentEnrollment.admin : false}
          />
        ))}
      </div>
    </>
  );
}
