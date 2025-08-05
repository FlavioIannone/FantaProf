import TeacherTable from "./components/TeacherTable";

export default async function MarketTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  return (
    <div className="flex flex-col">
      <TeacherTable class_id={class_id} />
    </div>
  );
}
