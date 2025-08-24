import MembersTableHeader from "./MembersTableHeader";
import MembersTableRow from "./MembersTableRow";

import StatsDisplayer from "../StatsDisplayer";
import { getClassMembers } from "@/lib/data/data-layer/members.data-layer";
import { getStudentEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import NoDataUI from "../../../components/NoDataUI";

export default async function MembersTable({ class_id }: { class_id: string }) {
  const members = await getClassMembers(class_id);
  const studentEnrollment = await getStudentEnrollmentData(class_id);
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
