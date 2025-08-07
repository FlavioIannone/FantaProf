import StatsDisplayerSkeleton from "./components/StatsDisplayerSkeleton";
import MembersTableSkeleton from "./components/MembersTable/MembersTableSkeleton";

export default function OverviewLoading() {
  return (
    <div className="flex tab flex-col">
      <StatsDisplayerSkeleton />
      <MembersTableSkeleton />
    </div>
  );
}
