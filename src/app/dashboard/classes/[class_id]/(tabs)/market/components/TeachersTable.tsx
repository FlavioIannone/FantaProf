import { getClassTeachers } from "@/lib/data/data-layer/teachers.data-layer";
import NoDataUI from "../../../../../../../components/server/NoDataUI";
import TeacherCard from "./TeacherCard";
import TeachersTableHeader from "./TeachersTableHeader";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import { redirect } from "next/navigation";
import { getClassData } from "@/lib/data/data-layer/classes.data-layer";
import Link from "next/link";
import { getRandomAmazonAd } from "@/lib/types";
import AmazonAdJoinRow from "@/components/client/Ads/AmazonAdJoinRow";

export default async function TeachersTable({
  class_id,
}: {
  class_id: string;
}) {
  const [teachersRes, studentEnrollmentRes, classRes] = await Promise.all([
    getClassTeachers(class_id),
    getCurrentUserEnrollmentData(class_id),
    getClassData(class_id, ["game_started", "market_locked"]),
  ]);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  if (classRes.status !== 200) {
    return null;
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
        {await Promise.all(
          teachersRes.data.map(async (teacher) => {
            return (
              <div
                key={teacher.teacher_id}
                className="d-join d-join-vertical d-card-md shadow-sm d-rounded-box"
              >
                <TeacherCard
                  class_id={class_id}
                  teacherData={teacher}
                  studentEnrollment={studentEnrollmentRes.data}
                  classData={classRes.data}
                />
                <AmazonAdJoinRow />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
