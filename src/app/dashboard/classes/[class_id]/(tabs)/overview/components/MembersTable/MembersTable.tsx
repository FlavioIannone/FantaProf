"use client";

import { useIdToken } from "@/lib/hooks/useIdToken";
import { useQuery } from "@tanstack/react-query";
import {
  getClassMembers,
  getStudentEnrollmentData,
} from "@/app/dashboard/(queryHandlers)/handlers";
import MmbersTableSkeleton from "./MembersTableSkeleton";
import { useModal } from "@/components/client/Modal/ModalContext";
import MembersTableRow from "./MembersTableRow";
import { queryKeys } from "@/lib/getQueryClient";

export default function MembersTable({ class_id }: { class_id: string }) {
  // Get user token and loading state
  const { token, loading: tokenLoading } = useIdToken();

  // Query to fetch class members data
  const {
    data: rows,
    isLoading: rowsLoading,
    isError: rowsError,
  } = useQuery({
    enabled: token !== null,
    queryKey: [queryKeys.members, class_id],
    queryFn: async () => {
      return await getClassMembers(token!, class_id);
    },
  });

  // Query to fetch student's enrollment data (includes admin status)
  const {
    data: enrollmentData,
    isLoading: enrollmentLoading,
    isError: enrollmentError,
  } = useQuery({
    queryKey: [queryKeys.studentEnrollment, class_id],
    enabled: token !== null,
    queryFn: async () => await getStudentEnrollmentData(token!, class_id),
  });

  // Modal context for showing modals
  const modal = useModal();

  // While loading any data or token, show a skeleton loader
  if (
    rowsLoading ||
    tokenLoading ||
    enrollmentLoading ||
    !rows ||
    !enrollmentData
  ) {
    return <MmbersTableSkeleton />;
  }

  // UI to show if no user belongs to this class
  const noDataUI = (
    <div className="flex flex-col justify-center items-center">
      <i className="size-24" aria-disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle text-error size-full"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </i>
      <p className="text-lg opacity-70">Non fai parte di nessuna classe</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="py-5">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">
            <span className="bi bi-people-fill me-2" aria-hidden></span>
            Membri
          </h1>
          <button
            type="button"
            className="d-btn d-btn-primary"
            onClick={() => {
              // Open modal on button click, using a separate ModalContent component
              modal.setModal(true, {
                title: "Invita un amico",
                content: <ModalContent class_id={class_id} />,
                confirmButtonText: "Copia link",
                onClose: () => {
                  // Copy invite link to clipboard on modal close
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/classes/${class_id}/join`
                  );
                },
              });
            }}
          >
            <p className="md:block sm:hidden hidden">Invita</p>
            <i className="bi bi-share" aria-hidden></i>
          </button>
        </div>
        <div className="space-y-2.5">
          {/* Show members list or error */}
          {!rowsError && !enrollmentError ? (
            <div className="space-y-2.5">
              {(!rows || rows.length === 0) && <>{noDataUI}</>}
              {rows &&
                rows.map((row) => (
                  <MembersTableRow
                    row={row}
                    key={row.uid}
                    class_id={class_id}
                    isAdmin={enrollmentData?.admin!}
                  />
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

// Separate component for the modal content shown when inviting a friend
const ModalContent = ({ class_id }: { class_id: string }) => {
  return (
    <p>
      Per invitare altri membri, copia il link e invialo a loro:
      <br />
      <code className="break-all">
        {`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/classes/${class_id}/join`}
      </code>
    </p>
  );
};
