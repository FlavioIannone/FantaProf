import TeacherTeamTableRow from "./components/TeacherTeamTableRow";

export default function TeamTabLoading() {
  return (
    <>
      <div className="d-rounded-box flex justify-between items-center shadow-lg border border-base-300 p-5 d-skeleton">
        <div className="invisible">
          <p className="text-primary">
            <span className="text-4xl">230</span>pts
          </p>
          <p>Il tuo punteggio</p>
        </div>
        <div className="invisible">
          <p className="text-primary">
            <span className="text-4xl">100</span>/200
          </p>
          <p>Crediti rimanenti</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-extrabold">
          <span className="bi bi-backpack3 me-2" aria-hidden></span>
          Il tuo team
        </h2>
        <div className="space-y-1.5 mt-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <TeacherTeamTableRow
              skeleton
              key={index}
              class_id=""
              teacherData={{
                name: "Prof",
                surname: `${index + 1}`,
                points: (index + 1) * 10,
                deleted: false,
                teacher_id: "",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
