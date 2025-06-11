import { ReactNode } from "react";

export default function DashboardCard({
  headingStat,
  footerStat,
  mainStat,
}: Readonly<{
  headingStat: ReactNode;
  footerStat: ReactNode;
  mainStat: ReactNode;
}>) {
  return (
    <section className="d-stat">
      <div className="d-stat-title sm:text-lg ">{headingStat}</div>
      <div className="d-stat-value text-primary">{mainStat}</div>
      <div className="d-stat-desc sm:text-lg">{footerStat}</div>
    </section>
  );
}
