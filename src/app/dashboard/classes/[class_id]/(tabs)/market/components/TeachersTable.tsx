import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";
import NoDataUI from "../../../../../../../components/server/NoDataUI";
import TeacherCard from "./TeacherCard";
import TeachersTableHeader from "./TeachersTableHeader";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import { redirect } from "next/navigation";

export default async function TeachersTable({
  class_id,
}: {
  class_id: string;
}) {
  const teachersRes = await getClassTeachers(class_id);
  const studentEnrollmentRes = await getCurrentUserEnrollmentData(class_id);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  const isAdmin = studentEnrollmentRes.data.admin;

  if (teachersRes.status !== 200)
    return (
      <>
        <TeachersTableHeader
          enrollmentData={studentEnrollmentRes.data}
          class_id={class_id}
        />
        <NoDataUI
          message="Nessun professore aggiunto in questa classe"
          additionalMessage={isAdmin ? undefined : "Chiedi ad un amministatore"}
        />
      </>
    );

  return (
    <>
      <TeachersTableHeader
        enrollmentData={studentEnrollmentRes.data}
        class_id={class_id}
      />
      <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2.5">
        {teachersRes.data.map((teacher) => {
          return (
            <TeacherCard
              class_id={class_id}
              teacherData={teacher}
              studentEnrollment={studentEnrollmentRes.data}
              key={teacher.teacher_id}
            />
          );
        })}
      </div>
    </>
  );
}
