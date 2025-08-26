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
  return (
    <section className="sm:px-5 sm:py-6 px-3 py-4 grow-1">
      <p className={`text-primary ${skeleton && "invisible"}`}>
        <span className="text-4xl">{statValue}</span>
        {valueInlineDescription}
      </p>
      <p className={`${skeleton && "invisible"}`}>{description}</p>
    </section>
  );
}
