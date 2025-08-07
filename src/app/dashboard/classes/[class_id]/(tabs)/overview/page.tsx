import MembersTable from "./components/MembersTable/MembersTable";

export default async function OverviewTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <div className="flex tab flex-col">
      <MembersTable class_id={class_id} />
    </div>
  );
}
