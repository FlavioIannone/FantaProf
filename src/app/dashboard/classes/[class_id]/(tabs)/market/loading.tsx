import TeacherCard from "./components/TeacherCard";

export default function MarketLoading() {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Professori
        </h1>
      </div>
      <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <TeacherCard key={index} />
        ))}
      </div>
    </>
  );
}
