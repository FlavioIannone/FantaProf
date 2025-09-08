import MembersTableRow from "./MembersTableRow";

export default function MembersTableSkeleton() {
  return (
    <>
      <div className="my-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-people-fill me-2" aria-hidden></span>
          Membri
        </h1>
        <button
          type="button"
          className="d-btn d-btn-primary"
          disabled
          aria-disabled
        >
          <p className="md:block sm:hidden hidden">Invita</p>
          <i className="bi bi-share" aria-hidden></i>
        </button>
      </div>
      <div className="space-y-2.5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MembersTableRow key={index} />
        ))}
      </div>
    </>
  );
}
