import ClassesTableRow from "./components/ClassTable/ClassesTableRow";
import DashboardCard from "./components/DashboardStats/DashboardCard";

export default function DashboardLoading() {
  return (
    <div className="w-full md:h-dvh flex flex-col justify-between">
      <div className="md:w-auto w-full">
        {/* Navbar */}
        <header>
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
        </header>
        <main className="lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 max-h-full">
          <h1 className="text-3xl mt-4 mb-2.5 font-extrabold">Bentornato!</h1>
          {/**Stats */}

          <div className="d-card sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 shadow-lg bg-base-200 d-skeleton">
            <DashboardCard statValue="stat" description="desc" skeleton />
            <DashboardCard statValue="stat" description="desc" skeleton />
          </div>
          {/**Classes */}
          <div className="w-full">
            <div className="py-5">
              <div className="mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">
                  <span className="bi bi-people-fill me-2" aria-hidden></span>
                  Classi
                </h1>
              </div>
              <div className="space-y-2.5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <ClassesTableRow key={index} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
