import DashboardCard from "@/components/client/DashboardCard";

export default function Dashboard() {
  return (
    <>
      <main className="w-full md:h-dvh lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 flex flex-col justify-between">
        <div className="md:w-auto w-full">
          <h1 className="text-4xl mb-2.5">Bentornato!</h1>
          {/**Stats */}
          <div className="d-stats shadow border border-base-200 sm:mb-3.5 mb-2.5">
            <DashboardCard
              headingStat="Miglior punteggio"
              mainStat={
                <>
                  <i className="bi bi-trophy sm:text-5xl stroke-current me-2"></i>
                  720
                </>
              }
              footerStat="Classe 5F"
            />
            <DashboardCard
              headingStat="Posizione migliore"
              mainStat={
                <p className="text-primary sm:text-6xl text-4xl me-1">
                  #<span className="lg:text-3xl text-lg"> 1</span>
                </p>
              }
              footerStat="Classe 5F"
            />
            <DashboardCard
              headingStat="Classi di cui fai parte"
              mainStat={
                <>
                  <i className="bi bi-people sm:text-5xl stroke-current me-2"></i>
                  3
                </>
              }
              footerStat="Classi attive"
            />
          </div>

          {/**Classes table */}
          <div>
            <h1 className="text-3xl mb-2.5">Le tue classi</h1>
            <div className="overflow-auto">
              <table className="d-table d-table-xs d-table-pin-rows d-table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <td>Nome</td>
                    <td>Membri</td>
                    <td>Il tuo posto</td>
                    <td>I tuoi punti</td>
                    <td className="sm:block hidden">Crediti residui</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>5F</td>
                    <td>18</td>
                    <td>1</td>
                    <td>720</td>
                    <td className="sm:block hidden">7</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={6}
                      className="w-full border bg-base-300 rounded-2xl"
                    >
                      Advertisement
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <td>Nome</td>
                    <td>Membri</td>
                    <td>Il tuo posto</td>
                    <td>I tuoi punti</td>
                    <td className="sm:block hidden">Crediti residui</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full h-[10rem] py-4.5">
          <div className="size-full border rounded-2xl flex items-center justify-center">
            Advertisement
          </div>
        </div>
      </main>
    </>
  );
}
