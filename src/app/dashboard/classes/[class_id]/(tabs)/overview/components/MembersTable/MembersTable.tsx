import { getClassMembersAction } from "@/lib/data/classes/classes.data";
import MembersTableHeader from "./MembersTableHeader";
import MembersTableRow from "./MembersTableRow";
import { FilteredStudentEnrollmentData } from "@/lib/data/types.data-layer";

export default async function MembersTable({
  class_id,
  studentEnrollment,
}: {
  class_id: string;
  studentEnrollment: FilteredStudentEnrollmentData | undefined;
}) {
  const members = await getClassMembersAction(class_id);

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
        <MembersTableHeader class_id={class_id} />
        <div className="space-y-2.5">
          {/* Show members list or error */}
          <div className="space-y-2.5">
            {members ? (
              members.length === 0 ? (
                <>{noDataUI}</>
              ) : (
                members.map((row) => (
                  <MembersTableRow
                    row={row}
                    key={row.uid}
                    class_id={class_id}
                    isAdmin={
                      studentEnrollment ? studentEnrollment.admin : false
                    }
                  />
                ))
              )
            ) : (
              <>Error</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
