import TeacherTeamTableRow from "./components/TeacherTeamTableRow";
import TeamStats from "./components/TeamStat";

export default function TeamTabLoading() {
  return (
    <>
      <TeamStats class_id="" skeleton />
      {/* Team Section */}
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
                captain: false,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
