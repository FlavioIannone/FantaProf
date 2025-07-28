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
      <MembersTable class_id={class_id} />
    </div>
  );
}
