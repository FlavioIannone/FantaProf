import MembersTable from "@/components/client/Tables/MembersTable";
import StatsDisplayer from "./components/StatsDisplayer";

export default function OverviewTab({
  id,
  class_id,
}: {
  id: string;
  class_id: string;
}) {
  return (
    <div id={id} className="d-carousel-item flex flex-col overflow-y-scroll">
      <StatsDisplayer class_id={class_id} />
      <MembersTable class_id={class_id} />
    </div>
  );
}
