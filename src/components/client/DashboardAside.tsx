import Link from "next/link";

export default function DashboardAside() {
  return (
    <aside className="sm:py-5 sm:px-3 p-0 md:flex flex-col justify-between hidden border border-base-200 h-full  ">
      <div>
        <div className="text-primary lg:text-3xl md:text-2xl sm:text-xl mb-5">
          <i className="bi bi-book me-1.5" aria-hidden></i>FantaProf
        </div>
        <div className="space-y-2 mb-5 flex flex-col">
          <button
            type="button"
            className="d-btn d-btn-primary space-x-1 d-btn-block"
          >
            <i className="bi bi-plus-circle"></i>
            <p className="w-max">Crea classe</p>
          </button>
          <button
            type="button"
            className="d-btn d-btn-primary space-x-1 d-btn-block d-btn-outline"
          >
            <i className="bi bi-person-add"></i>
            <p className="w-max">Aggiungi classe</p>
          </button>
        </div>
        <ul className="d-menu w-full *:text-xl">
          <li className="d-menu-title text-2xl!">Le tue classi</li>
          <li>
            <Link href="/dashboard/classes/1">
              <i className="bi bi-people me-0.5" aria-hidden></i>
              5A
            </Link>
          </li>
          <li>
            <Link href="/dashboard/classes/2">
              <i className="bi bi-people me-0.5" aria-hidden></i>
              4T
            </Link>
          </li>
          <li>
            <Link href="/dashboard/classes/3">
              <i className="bi bi-people me-0.5" aria-hidden></i>
              5F
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full  m-0">
        <p className="d-divider"></p>
        <ul className="d-menu w-full">
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
      </div>
    </aside>
  );
}
