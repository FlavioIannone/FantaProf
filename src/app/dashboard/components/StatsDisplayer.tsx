"use client";

import { getGlobalStats } from "@/app/dashboard/(queryHandlers)/handlers";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "./DashboardCard";
import { useIdToken } from "@/lib/hooks/useIdToken";

export default function StatsDisplayer() {
  const { token, loading: tokenLoading, error: tokenError } = useIdToken();

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    enabled: !!token,
    queryKey: ["globalStats"],
    queryFn: async () => {
      return await getGlobalStats(token!);
    },
  });
  if (statsLoading || tokenLoading) {
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
    <div className="sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid sm:grid-cols-3 grid-cols-2 md:w-full">
      <DashboardCard
        headingStat="Miglior punteggio"
        mainStat={stats ? stats.bestScore.points : "Errore"}
        footerStat={stats ? stats.bestScore.className : "Errore"}
      />
      <DashboardCard
        headingStat="Classi attive"
        mainStat={stats ? stats.enrollmentCount : "Errore"}
        footerStat="Di cui fai parte"
        className="sm:block hidden"
      />
      <section className={`space-y-2.5 grow-1 flex flex-col justify-center`}>
        <button
          type="button"
          className="d-btn d-btn-primary space-x-1 d-btn-block"
        >
          <i className="bi bi-plus-circle" aria-hidden></i>
          <p className="w-max">Crea classe</p>
        </button>
        <button
          type="button"
          className="d-btn d-btn-primary space-x-1 d-btn-block d-btn-outline"
        >
          <i className="bi bi-building-add" aria-hidden></i>
          <p className="w-max">Aggiungi classe</p>
        </button>
      </section>
    </div>
  );
}
