import { ClassesTableRowType } from "@/lib/data/types.data-layer";
import AddClassButton from "@/app/dashboard/components/ClassTable/AddClassButton";
import ClassesTableRow from "./ClassesTableRow";

export default function ClassesTable({
  classes,
}: {
  classes: ClassesTableRowType[] | undefined;
}) {
  // UI when no classes are found
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

  if (classes && classes.length === 0) {
    return noDataUI;
  }

  // Show skeleton while loading or fetching
  if (!classes) {
    return null;
  }

  return (
    <div className="w-full py-5">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-people-fill me-2" aria-hidden></span>
          Classi
        </h1>
        <AddClassButton />
      </div>

      {classes.length === 0 ? (
        noDataUI
      ) : (
        <div className="space-y-2.5">
          {classes.map((row) => (
            <ClassesTableRow key={row.class_id} classData={row} />
          ))}
        </div>
      )}
    </div>
  );
}
