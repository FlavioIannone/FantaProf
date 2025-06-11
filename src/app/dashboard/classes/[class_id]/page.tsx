export default async function ClassTab({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  await delay();
  return class_id;
}

async function delay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 5000);
  });
}
