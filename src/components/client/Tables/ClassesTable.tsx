"use client";

import { getClasses } from "@/app/dashboard/(queryHandlers)/handlers";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ClassesTableSkeleton from "./ClassesTableSkeleton";
import { useIdToken } from "@/lib/hooks/useIdToken";

export default function ClassesTable() {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();

  const {
    data: rows,
    isLoading: rowsLoading,
    isError: rowsError,
    isFetching: rowsFetching,
  } = useQuery({
    enabled: !!token,
    queryKey: ["classes"],
    queryFn: async () => {
      return await getClasses(token!);
    },
  });

  if (rowsLoading || tokenLoading || rowsFetching) {
    return <ClassesTableSkeleton />;
  }

  const noDataFoundUI = (
    <div className="italic">Non fai parte di nessuna classe</div>
  );

  return (
    <div className="w-full">
      <div className="py-5">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">
            <span className="bi bi-people-fill me-2" aria-disabled></span>
            Classi
          </h1>
        </div>
        {!rowsError ? (
          <div className="space-y-2.5">
            {rows?.length === 0 ? (
              <>{noDataFoundUI}</>
            ) : (
              rows &&
              rows.map((row) => (
                <Link
                  href={`/dashboard/classes/${row.class_id}?class_name=${row.class_name}&admin=${row.admin}&members=${row.members}&initial_credits=${row.credits}&curuser_points=${row.points}`}
                  key={row.class_id}
                  className="flex justify-between bg-base-200 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="d-avatar md:size-18 sm:size-16 size-12 rounded-full bg-base-300 md:p-4 sm:p-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-mortarboard size-full text-base-content"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-end">
                      <h1 className="text-2xl">{row.class_name}</h1>
                      <div className="flex">
                        <h2 className="opacity-70">{row.members} membri</h2>
                        <i className="bi bi-dot" aria-disabled></i>
                        <h2 className="opacity-70">{row.credits} crediti</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <h1 className="font-bold text-2xl">{row.points}</h1>
                    <h2 className="opacity-70">Punti</h2>
                  </div>
                </Link>
              ))
            )}
          </div>
        ) : (
          <>Error</>
        )}
      </div>
    </div>
  );
}
