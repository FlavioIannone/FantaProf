import OverviewTab from "./(tabs)/OverviewTab/OverviewTab";
import BackToPathArrow from "@/components/server/BackToPathArrow";
import DashboardTabsNavigator from "@/app/dashboard/classes/[class_id]/(tabs)/DashboardTabsNavigator";
import ClassNameDisplayer from "./(tabs)/OverviewTab/components/ClassNameDisplayer";

export default async function ClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;

  return (
    <div className="w-full h-dvh flex flex-col">
      <header>
        <nav className="d-navbar border-b border-base-300 flex justify-between items-center">
          <div className="flex">
            <BackToPathArrow
              href={`/dashboard`}
              className="lg:text-xl md:text-lg sm:text-lg text-md"
              text="Torna alle classi"
            />
            <div className="d-divider d-divider-horizontal mx-2 h-full"></div>
            <div className="flex flex-col">
              <ClassNameDisplayer />
              <h2 className="text-md opacity-70">Gestisci la classe</h2>
            </div>
          </div>
          <label
            htmlFor="dashboard-drawer"
            role="button"
            className="lg:hidden block"
          >
            <i className="bi bi-list text-2xl" aria-hidden></i>
          </label>
        </nav>
      </header>

      <DashboardTabsNavigator />
      <main className="grow-1 d-carousel [&_.d-carousel-item]:w-full [&_.d-carousel-item]:max-h-full overflow-hidden">
        <OverviewTab id="tab0" class_id={class_id} />
        <div id="tab1" className="d-carousel-item"></div>
        <div id="tab2" className="d-carousel-item"></div>
      </main>
    </div>
  );
}
