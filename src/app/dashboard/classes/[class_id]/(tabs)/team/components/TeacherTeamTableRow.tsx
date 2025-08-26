export default function TeacherTeamTableRow({
  teacherData,
}: {
  teacherData: {
    name: string;
    surname: string;
    price: number;
  };
}) {
  return (
    <div className="flex justify-between bg-base-200 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="d-avatar size-14 rounded-full">
          <span className="size-full flex items-center justify-center bg-base-300 rounded-full text-3xl">
            {teacherData.name.charAt(0) + teacherData.surname.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="md:text-2xl text-xl">
            {teacherData.name} {teacherData.surname}
          </h1>
          <p>Costo: {teacherData.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button type="button" className="d-btn d-btn-ghost p-0">
          <i className="bi bi-trash3 text-error text-3xl"></i>
        </button>
      </div>
    </div>
  );
}
