import { getCurrentUserGlobalStats } from "@/lib/data/data-layer/user.data-layer";
import DashboardCard from "./DashboardCard";

export default async function StatsDisplayer() {
  const { classesCount, bestScore } = await getCurrentUserGlobalStats();
  return (
    <div className="d-card sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 border border-base-300 shadow-lg">
      <DashboardCard
        statValue={bestScore.points === -1 ? "N/D" : bestScore.points}
        valueInlineDescription="pts"
        description={
          bestScore.points === 0
            ? "Ottieni punti"
            : `Miglior punteggio in ${bestScore.className}`
        }
      />
      <DashboardCard
        statValue={classesCount === -1 ? "N/D" : classesCount}
        valueInlineDescription={` class${classesCount > 1 ? "i" : "e"}`}
        description="Di cui fai parte"
      />
    </div>
  );
}
