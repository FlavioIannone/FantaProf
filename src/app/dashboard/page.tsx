export default function Dashboard() {
  return (
    <>
      <div className="flex grow w-full">
        <aside className="sm:py-5 sm:px-3 p-0 md:flex flex-col justify-between hidden border border-base-200 h-full  ">
          <div>
            <div className="text-primary lg:text-3xl md:text-2xl sm:text-xl mb-5">
              <i className="bi bi-book me-1.5" aria-hidden></i>FantaProf
            </div>
            <div className="space-y-2 mb-5 flex flex-col">
              <button
                type="button"
                className="d-btn d-btn-primary text-xl space-x-1 d-btn-block font-medium"
              >
                <i className="bi bi-plus-circle"></i>
                <p className="w-max">Crea classe</p>
              </button>
              <button
                type="button"
                className="d-btn d-btn-primary text-xl space-x-1 d-btn-block d-btn-outline font-medium"
              >
                <i className="bi bi-person-add"></i>
                <p className="w-max">Aggiungi classe</p>
              </button>
            </div>
            <ul className="d-menu w-full *:text-xl">
              <li className="d-menu-title text-2xl!">Le tue classi</li>
              <li>
                <p>
                  <i className="bi bi-people me-0.5" aria-hidden></i>
                  5A
                </p>
              </li>
              <li>
                <p>
                  <i className="bi bi-people me-0.5" aria-hidden></i>
                  4T
                </p>
              </li>
              <li>
                <p>
                  <i className="bi bi-people me-0.5" aria-hidden></i>
                  5F
                </p>
              </li>
            </ul>
          </div>
          <ul className="d-menu w-full">
            <div className="d-divider"></div>
            <li>
              <p className="text-xl">
                <i className="bi bi-gear me-0.5" aria-hidden></i>Impostazioni
              </p>
            </li>
            <li className="not-hover:text-error">
              <p className="text-xl">
                <i className="bi bi-box-arrow-right me-0.5" aria-hidden></i>
                Logout
              </p>
            </li>
          </ul>
        </aside>
        <main className="w-full md:h-dvh lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 flex flex-col justify-between">
          <div className="md:w-auto w-full">
            <h1 className="text-4xl mb-2.5">Bentornato!</h1>
            <div className="d-stats shadow border border-base-200 sm:mb-3.5 mb-2.5">
              <div className="d-stat">
                <div className="d-stat-title sm:text-lg ">
                  Miglior punteggio
                </div>
                <div className="d-stat-value text-primary">
                  <i className="bi bi-trophy sm:text-5xl stroke-current me-2"></i>
                  720
                </div>
                <div className="d-stat-desc sm:text-lg">Classe 5F</div>
              </div>

              <div className="d-stat">
                <div className="d-stat-title sm:text-lg">
                  Posizione migliore
                </div>
                <div className="d-stat-value sm:text-inherit text-xl text-primary">
                  <span className="text-primary sm:text-6xl text-3xl me-1">
                    #
                  </span>
                  1
                </div>
                <div className="d-stat-desc sm:text-lg">Classe 5F</div>
              </div>

              <div className="d-stat lg:block md:hidden sm:block hidden">
                <div className="d-stat-title sm:text-lg ">
                  Classi di cui fai parte
                </div>
                <div className="d-stat-value text-primary">
                  <i className="bi bi-people sm:text-5xl stroke-current me-2"></i>
                  3
                </div>
                <div className="d-stat-desc sm:text-lg">Classi attive</div>
              </div>
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
      </div>
    </>
  );
}
