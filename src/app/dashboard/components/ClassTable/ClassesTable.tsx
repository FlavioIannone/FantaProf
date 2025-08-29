import AddClassButton from "@/app/dashboard/components/ClassTable/AddClassButton";
import ClassesTableRow from "./ClassesTableRow";
import { ClassRowType } from "@/lib/data/types.data";
import { ReadOperationResult } from "@/lib/types";
import NoDataUI from "@/components/server/NoDataUI";

export default function ClassesTable({
  classes,
}: {
  classes: ReadOperationResult<ClassRowType[]>;
}) {
  return (
    <div className="w-full py-5">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-people-fill me-2" aria-hidden></span>
          Classi
        </h1>
        <AddClassButton />
      </div>

      {classes.status === 200 ? (
        <div className="space-y-2.5">
          {classes.data.map((row) => (
            <ClassesTableRow key={row.class_id} classData={row} />
          ))}
        </div>
      ) : (
        <>
          {classes.status === 404 && (
            <NoDataUI shrink message="Nessuna classe trovata" />
          )}
          {classes.status === 500 && (
            <NoDataUI shrink message="Errore durante l'ottenimento dei dati" />
          )}
        </>
      )}
    </div>
  );
}
