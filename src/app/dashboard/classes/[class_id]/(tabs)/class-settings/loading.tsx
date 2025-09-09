import ClassDataSettingsCard from "./components/ClassDataSettingsCard";
import ClassDataTableDivider from "./components/TableDivider";

export default function Loading() {
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-5">
        <span className="bi bi-gear me-2" aria-hidden></span>
        Impostazioni classe
      </h2>
      <div className="d-join flex flex-col border border-base-300 d-rounded-box [&_.d-join-item]:px-4 py-4 bg-base-200">
        <div className="d-join-item space-y-1.5">
          <h2 className="w-75 h-10 d-skeleton"></h2>
          <h3 className="w-50 h-7 d-skeleton"></h3>
        </div>
        <ClassDataTableDivider />
        <div className="d-join-item">
          <ClassDataSettingsCard skeleton />
        </div>
      </div>
    </>
  );
}
