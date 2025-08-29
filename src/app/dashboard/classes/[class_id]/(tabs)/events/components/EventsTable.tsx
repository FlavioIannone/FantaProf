export default function EventsTable({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 py-3 max-h-1/2 overflow-auto hide-scrollbar">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
          {children}
        </div>
      </div>
    </>
  );
}
