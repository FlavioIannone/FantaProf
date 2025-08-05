import { delay } from "@/lib/types";
import MembersTable from "./components/MembersTable/MembersTable";
import StatsDisplayer from "./components/StatsDisplayer";

export default async function OverviewTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <div className="flex tab flex-col">
      <StatsDisplayer class_id={class_id} />
      <MembersTable class_id={class_id} />
    </div>
  );
}
