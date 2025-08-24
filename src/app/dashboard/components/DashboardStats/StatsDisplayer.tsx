import { getGlobalStats } from "@/lib/data/data-layer/user.data-layer";
import DashboardCard from "./DashboardCard";

export default async function StatsDisplayer() {
  const { classesCount, bestScore } = await getGlobalStats();
  return (
    <div className="sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 ">
      <DashboardCard
        headingStat="Miglior punteggio"
        mainStat={bestScore.points === -1 ? "N/D" : bestScore.points}
        footerStat={bestScore.points === 0 ? "" : bestScore.className}
      />
      <DashboardCard
        headingStat="Classi attive"
        mainStat={classesCount === -1 ? "N/D" : classesCount}
        footerStat="Di cui fai parte"
      />
    </div>
  );
}
