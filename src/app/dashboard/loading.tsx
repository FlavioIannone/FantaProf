import ClassesTableSkeleton from "./components/ClassTable/ClassesTableSkeleton";
import DashboardCard from "./components/DashboardStats/DashboardCard";

export default function DashboardLoading() {
  return (
    <main className="w-full md:h-dvh flex flex-col justify-between">
      <div className="md:w-auto w-full">
        <>
          <nav
            className={`fixed z-50 lg:px-10 md:px-8 sm:px-5 px-2.5 d-navbar bg-base-100 border-0 border-base-300 border-b`}
          >
            <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="bi bi-book me-1.5" aria-hidden></i>
                FantaProf
              </div>
            </div>
          </nav>
          <nav
            className={`lg:px-10 md:px-8 sm:px-5 px-2.5 invisible d-navbar bg-base-100 border-0 border-base-300 border-b`}
          >
            <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="bi bi-book me-1.5" aria-hidden></i>
                FantaProf
              </div>
            </div>
          </nav>
        </>
        <div className="lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 max-h-full">
          <h1 className="text-3xl mb-2.5 font-extrabold invisible">
            Bentornato!
          </h1>
          {/**Stats */}

          <div className="d-card sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 shadow-lg d-skeleton">
            <DashboardCard statValue="stat" description="desc" skeleton />
            <DashboardCard statValue="stat" description="desc" skeleton />
          </div>
          {/**Classes */}
          <ClassesTableSkeleton />
        </div>
      </div>
    </main>
  );
}
