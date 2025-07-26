import DashboardNavbar from "@/app/dashboard/components/DashboardNavbar";
import ClassesTable from "@/components/client/Tables/ClassesTable";
import StatsDisplayer from "./components/StatsDisplayer";

export default function Dashboard() {
  return (
    <>
      <main className="w-full md:h-dvh flex flex-col justify-between">
        <div className="md:w-auto w-full">
          <DashboardNavbar className="lg:px-10 md:px-8 sm:px-5 px-2.5" fixed />
          <div className="lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 max-h-full">
            <h1 className="text-3xl mb-2.5 font-extrabold">Bentornato!</h1>
            {/**Stats */}
            <StatsDisplayer />
            <ClassesTable
              header={
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="text-3xl font-extrabold">
                    <span
                      className="bi bi-people-fill me-2"
                      aria-disabled
                    ></span>
                    Classi
                  </h1>
                </div>
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}
