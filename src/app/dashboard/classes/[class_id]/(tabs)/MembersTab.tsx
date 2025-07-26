import MembersTable from "@/components/server/Tables/MembersTable";

export default function MembersTab() {
  return (
    <div id="tab1" className="d-carousel-item w-full overflow-scroll">
      <MembersTable
        header={
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">
              <span className="bi bi-people-fill me-2" aria-disabled></span>
              Membri
            </h1>
            <button type="button" className="d-btn d-btn-primary">
              <i className="bi bi-share"></i>
              <p className="md:block sm:hidden hidden">Invita</p>
            </button>
          </div>
        }
        rows={[
          {
            name: "Mario Rossi",
            credits: 10,
            points: 150,
          },
          {
            name: "Luca Bianchi",
            credits: 8,
            points: 120,
          },
          {
            name: "Giulia Verdi",
            credits: 5,
            points: 100,
          },
          {
            name: "Anna Neri",
            credits: 3,
            points: 80,
          },

          {
            name: "Marco Gialli",
            credits: 1,
            points: 50,
          },
          {
            name: "Sara Blu",
            credits: 0,
            points: 30,
          },
          {
            name: "Giovanni Verdi",
            credits: 2,
            points: 60,
          },
          {
            name: "Elena Rosa",
            credits: 4,
            points: 90,
          },
          {
            name: "Marco Gialli",
            credits: 1,
            points: 50,
          },
          {
            name: "Sara Blu",
            credits: 0,
            points: 30,
          },
        ]}
      />
    </div>
  );
}
