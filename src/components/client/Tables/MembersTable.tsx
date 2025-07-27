"use client";

import { useIdToken } from "@/lib/hooks/useIdToken";
import { useQuery } from "@tanstack/react-query";
import { getClassMembers } from "@/app/dashboard/(queryHandlers)/handlers";
import MmbersTableSkeleton from "./MembersTableSkeleton";

export default function MembersTable({
  header,
  class_id,
}: {
  header?: React.ReactNode;
  class_id: string;
}) {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();

  const {
    data: rows,
    isLoading: rowsLoading,
    isError: rowsError,
  } = useQuery({
    enabled: !!token,
    queryKey: ["members"],
    queryFn: async () => {
      return await getClassMembers(token!, class_id);
    },
  });

  if (rowsLoading || tokenLoading) {
    return <MmbersTableSkeleton header={header} />;
  }
  return (
    <div className="lg:px-8 md:px-6 sm:px-5 px-4 w-full">
      <div className="py-5">
        {header}
        <div className="space-y-2.5">
          {!rowsError ? (
            <div className="space-y-2.5">
              {(!rows || rows.length === 0) && <>Data not found</>}
              {rows &&
                rows.map((row, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-base-200 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="d-avatar d-avatar-online size-12 bg-amber-200 rounded-full"></div>
                      <div className="flex flex-col">
                        <h1 className="text-2xl">{row.display_name}</h1>
                        <h2 className="opacity-70">
                          Crediti rimanenti: {row.credits}
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <h1 className="font-bold text-2xl">{row.points}</h1>
                      <h2 className="opacity-70">Punti</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>Error</>
          )}
        </div>
      </div>
    </div>
  );
}
