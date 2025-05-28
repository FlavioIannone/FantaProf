import React from "react";

export default function LandingCard({
  icon,
  title,
  subtitle,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}>) {
  return (
    <section className="d-card border-2  border-base-content/30 py-16 flex-1">
      <div className="d-card-body items-center justify-center">
        {icon}
        <h1 className="text-3xl">{title}</h1>
        <h3 className="text-xl text-center opacity-50">{subtitle}</h3>
      </div>
    </section>
  );
}
