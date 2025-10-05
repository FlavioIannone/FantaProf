import { getClassDataWithSession } from "@/lib/data/data-layer/classes.data-layer";
import { getCurrentUserEnrollmentData } from "@/lib/data/data-layer/user.data-layer";
import { redirect } from "next/navigation";

export default async function TeamStats({
  class_id,
  skeleton,
}: {
  class_id: string;
  skeleton?: boolean;
}) {
  if (skeleton) {
    return (
      <div className="d-rounded-box flex items-center shadow-lg border border-base-200 p-5">
        <section className="grow space-y-1.5">
          <h2 className="w-min d-skeleton">
            <span className="text-4xl invisible">stat</span>
          </h2>
          <div className="space-y-1">
            <p className="h-5 d-skeleton w-30"></p>
          </div>
        </section>
        <section className="grow space-y-1.5">
          <h2 className="w-min d-skeleton">
            <span className="text-4xl invisible">stat</span>
          </h2>
          <div className="space-y-1">
            <p className="h-5 d-skeleton w-30"></p>
          </div>
        </section>
      </div>
    );
  }

  const [classRes, studentEnrollmentRes] = await Promise.all([
    getClassDataWithSession<"initial_credits">(class_id),
    getCurrentUserEnrollmentData(class_id),
  ]);

  // Redirect if enrollment isn't valid
  if (studentEnrollmentRes.status !== 200) {
    redirect("/dashboard");
  }

  if (classRes.status !== 200) {
    return null;
  }

  return (
    <div className="d-rounded-box flex items-center shadow-lg border border-base-200 p-5">
      <section className="grow">
        <p className="text-primary">
          <span className="text-4xl">{studentEnrollmentRes.data.points}</span>
          pts
        </p>
        <p>Il tuo punteggio</p>
      </section>
      <section className="grow">
        <p className="text-primary">
          <span className="text-4xl">{studentEnrollmentRes.data.credits}</span>/
          {classRes.data.initial_credits}
        </p>
        <p>Crediti rimanenti</p>
      </section>
    </div>
  );
}
