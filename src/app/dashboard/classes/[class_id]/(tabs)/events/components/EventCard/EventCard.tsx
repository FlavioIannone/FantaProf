export default function EventCard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="d-card bg-base-200 md:d-card-md border border-base-300 shadow-md d-card-sm flex flex-row">
      {/* <div className="bg-primary h-full w-1"></div> */}
      <div className="d-card-body">{children}</div>
    </div>
  );
}
