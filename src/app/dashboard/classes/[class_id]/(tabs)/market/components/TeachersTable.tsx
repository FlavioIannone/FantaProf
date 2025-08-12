import TeacherCard from "./TeacherCard";
import TeachersTableHeader from "./TeachersTableHeader";
import NoDataUI from "../../../components/NoDataUI";
import { getClassTeachersAction } from "@/lib/data/teachers.data-layer";
import { getStudentEnrollmentDataAction } from "@/lib/data/user.data-layer";

export default async function TeachersTable({
  class_id,
}: {
  class_id: string;
}) {
  const teachers = await getClassTeachersAction(class_id);
  const studentEnrollment = await getStudentEnrollmentDataAction(class_id);

  if ((teachers && teachers.length === 0) || !teachers) {
    return (
      <>
        <TeachersTableHeader
          enrollmentData={studentEnrollment}
          class_id={class_id}
        />
        <NoDataUI
          message="Nessun professore aggiunto in questa classe"
          additionalMessage="Chiedi ad un amministatore"
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
              isAdmin={studentEnrollment ? studentEnrollment.admin : false}
              key={teacher.teacher_id}
            />
          );
        })}
      </div>
    </>
  );
}
