"use client";

import { useIdToken } from "@/lib/hooks/useIdToken";
import { useQuery } from "@tanstack/react-query";
import { getClassMembers } from "@/app/dashboard/(queryHandlers)/handlers";
import MmbersTableSkeleton from "./MembersTableSkeleton";
import { useModal } from "../Modal/ModalContext";
import MembersTableRow from "./MembersTableRow";
import { queryKeys } from "@/lib/getQueryClient";

export default function MembersTable({ class_id }: { class_id: string }) {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();
  const {
    data: rows,
    isLoading: rowsLoading,
    isError: rowsError,
  } = useQuery({
    enabled: !!token,
    queryKey: [queryKeys.members],
    queryFn: async () => {
      return await getClassMembers(token!, class_id);
    },
  });
  const modal = useModal();

  if (rowsLoading || tokenLoading) {
    return <MmbersTableSkeleton />;
  }

  const noDataFoundUI = (
    <div className="italic">Non fai parte di nessuna classe</div>
  );

  return (
    <div className="lg:px-8 md:px-6 sm:px-5 px-4 w-full">
      <div className="py-5">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">
            <span className="bi bi-people-fill me-2" aria-disabled></span>
            Membri
          </h1>
          <button
            type="button"
            className="d-btn d-btn-primary"
            onClick={() => {
              modal.setModal(true, {
                title: "Invita un amico",
                content:
                  "Per invitare altri membri, copia il link e invialo a loro",
                onCloseButtonText: "Copia link",
                onClose: () => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/classes/${class_id}/join`
                  );
                },
              });
            }}
          >
            <i className="bi bi-share"></i>
            <p className="md:block sm:hidden hidden">Invita</p>
          </button>
        </div>
        <div className="space-y-2.5">
          {!rowsError ? (
            <div className="space-y-2.5">
              {(!rows || rows.length === 0) && <>{noDataFoundUI}</>}
              {rows &&
                rows.map((row, index) => {
                  return (
                    <MembersTableRow
                      row={row}
                      key={index}
                      class_id={class_id}
                    />
                  );
                })}
            </div>
          ) : (
            <>Error</>
          )}
        </div>
      </div>
    </div>
  );
}
