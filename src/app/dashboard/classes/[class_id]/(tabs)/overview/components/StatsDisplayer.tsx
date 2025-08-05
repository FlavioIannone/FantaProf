"use client";

import {
  getClassData,
  getStudentEnrollmentData,
} from "@/app/dashboard/(queryHandlers)/handlers";
import StatSection from "./StatSection";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { useQueries } from "@tanstack/react-query";
import StatsDisplayerSkeleton from "./StatsDisplayerSkeleton";
import { queryKeys } from "@/lib/getQueryClient";

export default function Stats({ class_id }: { class_id: string }) {
  const { token, loading: tokenLoading } = useIdToken();

  const [classData, classStats] = useQueries({
    queries: [
      {
        queryKey: [queryKeys.classData, class_id],
        enabled: token !== null,
        queryFn: () => getClassData(token!, class_id),
      },
      {
        queryKey: [queryKeys.studentEnrollment, class_id],
        enabled: token !== null,
        queryFn: () => getStudentEnrollmentData(token!, class_id),
      },
    ],
  });

  if (
    tokenLoading ||
    classData.isLoading ||
    classStats.isLoading ||
    classData.isFetching ||
    classStats.isFetching
  ) {
    return <StatsDisplayerSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 w-full">
      <StatSection
        title="Membri"
        value={classData.error ? "N/D" : `${classData.data?.members ?? "?"}`}
        icon="bi-people"
        className="bg-linear-to-r from-purple-500 to-purple-600 shadow-xl shadow-purple-500/50"
      />
      <StatSection
        title="Crediti"
        value={classStats.error ? "N/D" : `${classStats.data?.credits ?? "?"}`}
        icon="bi-credit-card"
        className="bg-linear-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/50"
      />
      <StatSection
        title="Punti"
        value={classStats.error ? "N/D" : `${classStats.data?.points ?? "?"}`}
        icon="bi-trophy"
        className="bg-linear-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/50"
      />
      <StatSection
        title="Professori"
        value={classData.error ? "N/D" : `${classData.data?.teachers ?? "?"}`}
        icon="bi-mortarboard"
        className="bg-linear-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50"
      />
    </div>
  );
}
