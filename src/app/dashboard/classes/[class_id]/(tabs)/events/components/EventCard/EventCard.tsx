export default function EventCard({
  children,
  skeleton,
}: {
  children: Readonly<React.ReactNode>;
  skeleton?: boolean;
}) {
  return (
    <div
      className={`${
        skeleton && "d-skeleton"
      } d-join-item bg-base-200 flex flex-row`}
    >
      {/* <div className="bg-primary h-full w-1"></div> */}
      <div className="d-card-body">{children}</div>
    </div>
  );
}
