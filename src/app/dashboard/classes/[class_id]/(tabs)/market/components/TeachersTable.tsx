import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";
import NoDataUI from "../../../../../../../components/server/NoDataUI";
import TeacherCard from "./TeacherCard";
import TeachersTableHeader from "./TeachersTableHeader";
import { getStudentEnrollmentData } from "@/lib/data/data-layer/user.data-layer";

export default async function TeachersTable({
  class_id,
}: {
  class_id: string;
}) {
  const teachers = await getClassTeachers(class_id);
  const studentEnrollment = await getStudentEnrollmentData(class_id);
  const isAdmin = studentEnrollment?.admin ?? false;

  if ((teachers && teachers.length === 0) || !teachers) {
    return (
      <>
        <TeachersTableHeader
          enrollmentData={studentEnrollment}
          class_id={class_id}
        />
        <NoDataUI
          message="Nessun professore aggiunto in questa classe"
          additionalMessage={isAdmin ? undefined : "Chiedi ad un amministatore"}
        />
      </>
    );
  }

  return (
    <>
      <TeachersTableHeader
        enrollmentData={studentEnrollment}
        class_id={class_id}
      />
      <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2.5">
        {teachers.map((teacher) => {
          return (
            <TeacherCard
              class_id={class_id}
              teacherData={teacher}
              isAdmin={isAdmin}
              key={teacher.teacher_id}
            />
          );
        })}
      </div>
    </>
  );
}
