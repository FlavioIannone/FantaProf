"use client";
import Link from "next/link";
import { client_auth } from "@/lib/firebase-connection.client";
import { useRouter } from "next/navigation";

export default function DashboardAside() {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="text-primary md:text-3xl sm:text-xl text-3xl mb-5 flex justify-between items-center">
          <div>
            <i className="bi bi-book me-1.5" aria-hidden></i>FantaProf
          </div>
          <label
            className="md:hidden block"
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
          >
            <i className="bi bi-x text-base-content text-2xl" aria-hidden></i>
          </label>
        </div>
        <div className="space-y-2 mb-5 flex flex-col">
          <button
            type="button"
            className="d-btn d-btn-primary space-x-1 d-btn-block"
          >
            <i className="bi bi-plus-circle" aria-hidden></i>
            <p className="w-max">Crea classe</p>
          </button>
          <button
            type="button"
            className="d-btn d-btn-primary space-x-1 d-btn-block d-btn-outline"
          >
            <i className="bi bi-person-add" aria-hidden></i>
            <p className="w-max">Aggiungi classe</p>
          </button>
        </div>
      </div>
      <div className="w-full  m-0">
        <p className="d-divider m-0"></p>
        <ul className="d-menu w-full">
          <li>
            <Link href="/settings" className="text-xl">
              <i className="bi bi-gear me-0.5" aria-hidden></i>Impostazioni
            </Link>
          </li>
          <li className="not-hover:text-error">
            <button
              type="button"
              className="text-xl"
              onClick={async () => {
                await client_auth.signOut();
                router.replace("/");
              }}
            >
              <i className="bi bi-box-arrow-right me-0.5" aria-hidden></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
