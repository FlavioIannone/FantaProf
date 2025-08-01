export default function StatsDisplayerSkeleton() {
  const skeletons = Array.from({ length: 4 }).map((_, i) => (
    <section
      key={i}
      className="flex-1 d-card d-skeleton md:p-3 sm:p-2 p-2 flex items-center"
    >
      <i className="bi bi-people md:text-6xl sm:text-4xl text-4xl text-white invisible" />
      <h1 className="md:text-2xl text-xl text-white opacity-80 text-center invisible">
        {"<Titolo>"}
      </h1>
      <h2 className="text-4xl text-white invisible">{"<Valore>"}</h2>
    </section>
  ));

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 lg:px-8 md:px-6 sm:px-5 px-4 lg:py-6 md:py-5 sm:py-4 py-3 w-full">
      {skeletons}
    </div>
  );
}
