import { ReactNode } from "react";

export default function DashboardCard({
  statValue,
  description,
  valueInlineDescription,
  skeleton,
}: Readonly<{
  statValue: ReactNode;
  description: ReactNode;
  valueInlineDescription?: ReactNode;
  skeleton?: boolean;
}>) {
  if (skeleton) {
    return (
      <section className="sm:px-5 sm:py-6 px-3 py-4 grow-1 space-y-2.5">
        <h2 className="w-min d-skeleton">
          <span className="text-4xl invisible">{statValue}</span>
        </h2>
        <div className="space-y-1">
          <p className="h-5 d-skeleton"></p>
          <p className="w-20 h-5 d-skeleton"></p>
        </div>
      </section>
    );
  }

  return (
    <section className="sm:px-5 sm:py-6 px-3 py-4 grow-1">
      <h2 className="text-primary">
        <span className="text-4xl">{statValue}</span>
        {valueInlineDescription}
      </h2>
      <p>{description}</p>
    </section>
  );
}
