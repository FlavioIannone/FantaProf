import BackToPathArrow from "@/components/server/BackToPathArrow";
import ClassNameDisplayer from "./(tabs)/overview/components/ClassNameDisplayer";
import StatsDisplayerSkeleton from "./(tabs)/overview/components/StatsDisplayerSkeleton";
import DashboardTabsNavigator from "./components/DashboardTabsNavigator";
import LeaveClassButton from "./components/LeaveClassButton";
import MembersTableSkeleton from "./(tabs)/overview/components/MembersTable/MembersTableSkeleton";

export default function ClassSkeleton() {
  return (
    <>
      <div className="w-full max-h-dvh flex flex-col overflow-hidden">
        <header>
          <nav className="d-navbar border-b border-base-300 flex justify-between items-center">
            <div className="flex">
              <button
                type="button"
                disabled
                className={`flex items-center justify-center`}
                aria-label="Torna alla home"
              >
                <div
                  className={`group flex gap-1 p-0 justify-center items-center`}
                >
                  <i
                    className={`opacity-70 group-hover:opacity-100 bi bi-arrow-left-short text-4xl`}
                    aria-hidden
                  ></i>
                  <p
                    className={`opacity-70 group-hover:opacity-100 me-1.5 md:block hidden`}
                  >
                    Torna alle classi
                  </p>
                </div>
              </button>
              <div className="d-divider d-divider-horizontal mx-2 h-full"></div>
              <div className="flex flex-col space-y-1">
                <h1 className="sm:text-2xl text-xl d-skeleton">
                  <p className="invisible">{"<class_name>"}</p>
                </h1>
                <h2 className="text-md opacity-70 d-skeleton">
                  <p className="invisible">Gestisci la classe</p>
                </h2>
              </div>
            </div>
          </nav>
        </header>

        <DashboardTabsNavigator className="md:block hidden" />
        <main className="grow-1 [&_.tab]:w-full [&_.tab]:max-h-full lg:px-8 md:px-6 sm:px-5 px-4 lg:py-6 md:py-5 sm:py-4 py-3 overflow-auto hide-scrollbar">
          <div className="flex tab flex-col">
            <StatsDisplayerSkeleton />
            <MembersTableSkeleton />
          </div>
        </main>
        <DashboardTabsNavigator className="md:hidden block" />
      </div>
    </>
  );
}
