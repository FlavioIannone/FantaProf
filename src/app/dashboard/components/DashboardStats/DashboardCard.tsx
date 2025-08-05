import { ReactNode } from "react";

export default function DashboardCard({
  headingStat,
  footerStat,
  mainStat,
  className,
}: Readonly<{
  headingStat: ReactNode;
  footerStat: ReactNode;
  mainStat: ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={`d-card space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 shadow-lg border border-base-content/10 grow-1 ${className}`}
    >
      <div className="lg:text-2xl md:text-xl sm:text-md text-md">
        {headingStat}
      </div>
      <div className="text-primary lg:text-4xl md:text-3xl text-2xl">
        {mainStat}
      </div>
      <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70">
        {footerStat}
      </div>
    </section>
  );
}
