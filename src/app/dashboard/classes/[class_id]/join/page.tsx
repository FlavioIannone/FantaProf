import JoinClassComponent from "./JoinClassComponent";

export default async function JoinClass({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;

  return <JoinClassComponent class_id={class_id} />;
}
