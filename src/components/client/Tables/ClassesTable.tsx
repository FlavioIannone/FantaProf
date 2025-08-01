"use client";

import { getClasses } from "@/app/dashboard/(queryHandlers)/handlers";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ClassesTableSkeleton from "./ClassesTableSkeleton";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { useCallback } from "react";
import ClassActionsButtons from "@/app/dashboard/components/ClassActionsButtons";
import { queryKeys } from "@/lib/getQueryClient";

export default function ClassesTable() {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();

  // Memoized query function to prevent unnecessary re-creation
  const fetchClasses = useCallback(() => {
    if (!token) throw new Error("Missing token");
    return getClasses(token);
  }, [token]);

  const {
    data: rows,
    isLoading: rowsLoading,
    isFetching: rowsFetching,
    isError: rowsError,
  } = useQuery({
    enabled: !!token,
    queryKey: [queryKeys.classes],
    queryFn: fetchClasses,
  });

  // Show skeleton while loading or fetching
  if (tokenLoading || rowsLoading || rowsFetching) {
    return <ClassesTableSkeleton />;
  }

  // UI when no classes are found
  const noDataUI = (
    <div className="italic text-center text-base-content/70">
      Non fai parte di nessuna classe
    </div>
  );

  // Reusable avatar icon
  const AvatarIcon = () => (
    <div className="d-avatar md:size-18 sm:size-16 size-12 rounded-full bg-base-300 p-2 md:p-4 sm:p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-mortarboard size-full text-base-content"
        viewBox="0 0 16 16"
      >
        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
      </svg>
    </div>
  );

  // Render error fallback
  if (rowsError || tokenError !== null) {
    console.log(rowsError);
    console.log(tokenError);

    return (
      <div className="text-error">Errore nel caricamento delle classi</div>
    );
  }

  return (
    <div className="w-full py-5">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-people-fill me-2" aria-hidden></span>
          Classi
        </h1>
        <ClassActionsButtons />
      </div>

      {!rows || rows.length === 0 ? (
        noDataUI
      ) : (
        <div className="space-y-2.5">
          {rows.map((row) => (
            <Link
              key={row.class_id}
              href={`/dashboard/classes/${
                row.class_id
              }?class_name=${encodeURIComponent(
                row.class_name
              )}&admin=${encodeURIComponent(row.admin)}`}
              className="flex justify-between bg-base-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2">
                <AvatarIcon />
                <div className="flex flex-col justify-end">
                  <h1 className="text-2xl">{row.class_name}</h1>
                  <div className="flex gap-1 text-sm opacity-70">
                    <span>{row.members} membri</span>
                    <i className="bi bi-dot" aria-hidden></i>
                    <span>{row.credits} crediti</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <h1 className="font-bold text-2xl">{row.points}</h1>
                <h2 className="opacity-70">Punti</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
