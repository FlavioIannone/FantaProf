export default function StatSection({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: string;
  icon: string;
  className: string;
}) {
  return (
    <section
      className={`${className} flex-1 d-card bg-linear-to-r md:p-3 sm:p-2 p-2 flex items-center`}
    >
      <i
        className={`bi ${icon} md:text-6xl sm:text-4xl text-4xl text-white`}
        aria-disabled
      ></i>
      <h1 className="md:text-2xl text-xl text-white opacity-80 text-center">
        {title}
      </h1>
      <h2 className="text-4xl text-white">{value}</h2>
    </section>
  );
}
