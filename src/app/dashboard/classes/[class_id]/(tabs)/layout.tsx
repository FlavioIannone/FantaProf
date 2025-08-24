import BackToPathArrow from "@/components/server/BackToPathArrow";
import { ReactNode } from "react";

import { getClassData } from "@/lib/data/data-layer/classes.data-layer";
import DashboardTabsNavigator from "./components/DashboardTabsNavigator";
import LeaveClassButton from "./components/LeaveClassButton";

export default async function ClassLayout({
  children,
  params,
}: {
  children: Readonly<ReactNode>;
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  const classData = await getClassData(class_id);

  return (
    <div className="w-full max-h-dvh flex flex-col overflow-hidden">
      <header>
        <div className="d-navbar border-b border-base-300 flex justify-between items-center lg:px-8 md:px-6 sm:px-5 px-4">
          <div className="flex">
            <BackToPathArrow
              href={`/dashboard`}
              className="lg:text-xl md:text-lg sm:text-lg text-md"
              text="Torna alle classi"
            />
            <div className="d-divider d-divider-horizontal mx-2 h-full"></div>
            <div className="flex flex-col">
              <h1 className="sm:text-2xl text-xl">{`Classe ${
                classData ? classData.class_name : "N/D"
              }`}</h1>

              <h2 className="text-md opacity-70">Gestisci la classe</h2>
            </div>
          </div>
          <LeaveClassButton class_id={class_id} />
        </div>
      </header>

      <DashboardTabsNavigator className="md:block hidden" />
      <main className="grow-1 max-h-dvh [&_.tab]:w-full [&_.tab]:max-h-full lg:px-8 md:px-6 sm:px-5 px-4 lg:py-6 md:py-5 sm:py-4 py-3 overflow-auto hide-scrollbar">
        {children}
      </main>
      <DashboardTabsNavigator className="md:hidden block" />
    </div>
  );
}
