export default function TeacherTableSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2.5">
      {children}
    </div>
  );
}
