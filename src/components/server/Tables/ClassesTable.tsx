"use client";

import { getClasses } from "@/app/dashboard/(queryHandlers)/handlers";
import { client_auth, client_firestore } from "@/lib/firebase-connection";
import { useQuery, isServer } from "@tanstack/react-query";
import Link from "next/link";
import ClassesTableSkeleton from "./ClassesTableSkeleton";
import { useAuthUser } from "@/lib/useAuthUser";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect } from "react";
import { FirebaseCollections } from "@/lib/types";
import { getQueryClient } from "@/lib/getQueryClient";

export default function ClassesTable({ header }: { header?: React.ReactNode }) {
  const queryClient = getQueryClient();
  const user = useAuthUser();
  const {
    data: rows,
    isLoading: rowsLoading,
    isError: rowsError,
  } = useQuery({
    enabled: !!user,
    queryKey: ["classes", client_auth.currentUser?.uid!],
    queryFn: async () => {
      if (isServer) return undefined;
      return await getClasses(client_auth.currentUser?.uid!);
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    const classesUnsubscribe = onSnapshot(
      collection(client_firestore, FirebaseCollections.CLASSES),
      (snapshot) => {
        queryClient.invalidateQueries({
          queryKey: ["classes", client_auth.currentUser?.uid!],
        });
      }
    );

    return () => {
      classesUnsubscribe();
    }; // clean up the listener on unmount
  }, []);

  if (rowsLoading || !user) {
    return <ClassesTableSkeleton header={header} />;
  }

  return (
    <div className="w-full">
      <div className="py-5">
        {header}
        {!rowsError ? (
          <div className="space-y-2.5">
            {!rows && <>Data not found</>}
            {rows &&
              rows.map((row) => (
                <Link
                  href={`/dashboard/classes/${row.id}`}
                  key={row.id}
                  className="flex justify-between bg-base-200 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="d-avatar md:size-18 sm:size-16 size-12 rounded-full bg-base-300 md:p-4 sm:p-2 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bank size-full text-base-content"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
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
              ))}
          </div>
        ) : (
          <>Error</>
        )}
      </div>
    </div>
  );
}
