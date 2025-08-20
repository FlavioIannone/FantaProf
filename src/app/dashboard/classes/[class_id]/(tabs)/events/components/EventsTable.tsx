export default function EventsTable({
  children,
  title,
}: {
  children: Readonly<React.ReactNode>;
  title: string;
}) {
  return (
    <>
      <h2 className="md:text-3xl text-2xl font-extrabold mt-5">{title}</h2>
      <div className="flex flex-col gap-4 p-3 max-h-1/2 overflow-auto hide-scrollbar d-rounded-b-box">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
          {children}
        </div>
      </div>
    </>
  );
}
