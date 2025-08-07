import TeachersTable from "./components/TeachersTable";

export default async function MarketTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;

  return (
    <div className="flex tab flex-col">
      <TeachersTable class_id={class_id} />
    </div>
  );
}
