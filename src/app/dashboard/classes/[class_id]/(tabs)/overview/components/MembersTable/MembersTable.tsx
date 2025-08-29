import MembersTableHeader from "./MembersTableHeader";
import MembersTableRow from "./MembersTableRow";

import StatsDisplayer from "../StatsDisplayer";
import { getClassMembers } from "@/lib/data/data-layer/members.data-layer";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import NoDataUI from "@/components/server/NoDataUI";
import { redirect } from "next/navigation";

export default async function MembersTable({ class_id }: { class_id: string }) {
  const [membersRes, studentEnrollmentRes] = await Promise.all([
    getClassMembers(class_id),
    getCurrentUserEnrollmentData(class_id),
  ]);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  if (membersRes.status !== 200) {
    return (
      <>
        <StatsDisplayer
          class_id={class_id}
          studentEnrollment={studentEnrollmentRes}
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
        studentEnrollment={studentEnrollmentRes}
      />
      <MembersTableHeader class_id={class_id} />
      <div className="space-y-1.5">
        {membersRes.data.map((row) => (
          <MembersTableRow
            member={row}
            key={row.uid}
            class_id={class_id}
            isAdmin={
              studentEnrollmentRes ? studentEnrollmentRes.data.admin : false
            }
          />
        ))}
      </div>
    </>
  );
}
