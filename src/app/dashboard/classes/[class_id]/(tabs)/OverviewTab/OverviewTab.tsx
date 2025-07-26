import StatSection from "@/app/dashboard/classes/[class_id]/(tabs)/OverviewTab/components/StatSection";
import MembersTable from "@/components/client/Tables/MembersTable";
import Stats from "./components/StatsDisplayer";

export default function OverviewTab({
  id,
  class_id,
}: {
  id: string;
  class_id: string;
}) {
  return (
    <div id={id} className="d-carousel-item flex flex-col overflow-y-scroll">
      <Stats />
      <MembersTable
        class_id={class_id}
        header={
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">
              <span className="bi bi-people-fill me-2" aria-disabled></span>
              Membri
            </h1>
            <button type="button" className="d-btn d-btn-primary">
              <i className="bi bi-share"></i>
              <p className="md:block sm:hidden hidden">Invita</p>
            </button>
          </div>
        }
      />
    </div>
  );
}
