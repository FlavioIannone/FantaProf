import DashboardNavbar from "@/app/dashboard/components/DashboardNavbar";
import ClassesTable from "./components/ClassTable/ClassesTable";
import StatsDisplayer from "./components/DashboardStats/StatsDisplayer";
import { getClasses } from "@/lib/data/data-layer/classes.data-layer";
import UsernameDisplayer from "./components/UsernameDisplayer";

export default async function Dashboard() {
  const classes = await getClasses();
  return (
    <>
      <main className="w-full md:h-dvh flex flex-col justify-between">
        <div className="md:w-auto w-full">
          <DashboardNavbar className="lg:px-10 md:px-8 sm:px-5 px-2.5" fixed />
          <div className="lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 max-h-full">
            <UsernameDisplayer />
            {/**Stats */}
            <StatsDisplayer />
            {/**Classes */}
            <ClassesTable classes={classes} />
          </div>
        </div>
      </main>
    </>
  );
}
