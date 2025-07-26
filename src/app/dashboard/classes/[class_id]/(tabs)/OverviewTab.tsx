import StatSection from "@/components/server/OverviewTab/StatSection";
import MembersTable from "@/components/server/Tables/MembersTable";

export default function OverviewTab({ id }: { id: string }) {
  return (
    <div id={id} className="d-carousel-item flex flex-col overflow-y-scroll">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 lg:px-8 md:px-6 sm:px-5 px-4 lg:py-6 md:py-5 sm:py-4 py-3 w-full">
        <StatSection
          title="Membri"
          value={3}
          icon="bi-people"
          className="bg-linear-to-r from-purple-500 to-purple-600 shadow-xl shadow-purple-500/50"
        />
        <StatSection
          title="Crediti"
          value={10}
          icon="bi-credit-card"
          className="bg-linear-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/50"
        />
        <StatSection
          title="Punti"
          value={150}
          icon="bi-trophy"
          className="bg-linear-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/50"
        />
        <StatSection
          title="Professori"
          value={5}
          icon="bi-mortarboard"
          className="bg-linear-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50"
        />
      </div>
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
