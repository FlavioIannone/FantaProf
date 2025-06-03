import { ReactNode } from "react";

export default function RuleCard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="d-card border-2 border-base-content/30 md:py-10 py-5 md:px-5 px-1 lg:mb-10 sm:mb-5 mb-2.5">
      {children}
    </section>
  );
}
