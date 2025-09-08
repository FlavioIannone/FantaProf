import StatSection from "./StatSection";

export default function StatsDisplayerSkeleton() {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatSection key={index} />
      ))}
    </div>
  );
}
