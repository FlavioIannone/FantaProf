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
    <section
      className={`d-card border-2 group border-base-content/30 py-16 flex-1 animate-fade-in-bottom motion-safe:opacity-0 animation-delay-400 motion-reduce:animate-none`}
    >
      <div className="d-card-body items-center justify-center">
        <div className="group-hover:animate-wiggle motion-reduce:animate-none">
          {icon}
        </div>
        <h1 className="text-3xl">{title}</h1>
        <p className="text-xl text-center opacity-50">{subtitle}</p>
      </div>
    </section>
  );
}
