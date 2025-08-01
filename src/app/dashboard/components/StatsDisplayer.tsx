"use client";

import { getGlobalStats } from "@/app/dashboard/(queryHandlers)/handlers";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { useIdToken } from "@/lib/hooks/useIdToken";
import ClassActionsButtons from "./ClassActionsButtons";
import { queryKeys } from "@/lib/getQueryClient";

export default function StatsDisplayer() {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    isFetching: statsFetching,
  } = useQuery({
    enabled: !!token,
    queryKey: [queryKeys.globalStats],
    queryFn: async () => {
      return await getGlobalStats(token!);
    },
  });
  if (statsLoading || tokenLoading || statsFetching) {
    return (
      <div className="sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid sm:grid-cols-3 grid-cols-2 md:w-full">
        <section className="d-card d-skeleton space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 grow-1">
          <div className="lg:text-2xl md:text-xl sm:text-md text-md invisible">
            Heading
          </div>
          <div className="text-primary lg:text-4xl md:text-xl text-2xl invisible">
            Main
          </div>
          <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 invisible">
            Footer
          </div>
        </section>

        <section className="d-card d-skeleton space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 grow-1">
          <div className="lg:text-2xl md:text-xl sm:text-md text-md invisible">
            Heading
          </div>
          <div className="text-primary lg:text-4xl md:text-xl text-2xl invisible">
            Main
          </div>
          <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 invisible">
            Footer
          </div>
        </section>

        <section className="d-card d-skeleton space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 grow-1 sm:block hidden">
          <div className="lg:text-2xl md:text-xl sm:text-md text-md invisible">
            Heading
          </div>
          <div className="text-primary lg:text-4xl md:text-xl text-2xl invisible">
            Main
          </div>
          <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 invisible">
            Footer
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 ">
      <DashboardCard
        headingStat="Miglior punteggio"
        mainStat={
          !statsError
            ? stats?.bestScore.points === -1
              ? "N/D"
              : stats?.bestScore.points
            : "Errore"
        }
        footerStat={
          !statsError
            ? stats?.bestScore.className === ""
              ? "N/D"
              : stats?.bestScore.className
            : "Errore"
        }
      />
      <DashboardCard
        headingStat="Classi attive"
        mainStat={
          !statsError
            ? stats?.enrollmentCount === 0
              ? "N/D"
              : stats?.enrollmentCount
            : "Errore"
        }
        footerStat="Di cui fai parte"
      />
    </div>
  );
}
