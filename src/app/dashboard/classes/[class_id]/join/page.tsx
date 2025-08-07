import { joinClassAction } from "@/lib/data/classes.data-layer";
// TODO: add metadata for the page
export default async function JoinClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  await joinClassAction(class_id);

  return (
    <main className="flex justify-center items-center size-full">
      <span className="d-loading d-loading-ring d-loading-xl"></span>
    </main>
  );
}
