import ThemeController from "@/components/client/Theme/ThemeController";
import ThemeDisplayer from "@/components/client/Theme/ThemeDisplayer";
import UserDataSettingsCard from "@/components/client/Settings/UserDataSettingsCard";
import Link from "next/link";
import LogoutButton from "@/components/client/Settings/LogoutButton";

export default function SettingsPage() {
  return (
    <div className="min-h-dvh w-full flex justify-center">
      <div className="lg:w-2/4 sm:w-3/4 w-full">
        <nav className="d-navbar rounded-sm border-b border-base-content/10">
          <Link href="/dashboard">
            <button type="button" className="d-btn d-btn-ghost p-0">
              <i className="bi bi-arrow-left-short text-4xl" aria-hidden></i>
            </button>
          </Link>
          <p className="text-2xl ms-2">Impostazioni</p>
        </nav>
        <main className="px-5 py-2.5 space-y-8 [&_.settings-card]:rounded-sm [&_.settings-card]:border-b [&_.settings-card]:border-base-content/5">
          <UserDataSettingsCard />
          <div className="sm:px-5 pb-3 settings-card">
            <h1 className="text-lg font-medium opacity-70 mb-2">ASPETTO</h1>
            <div className="flex justify-between">
              <div className="flex flex-row justify-center items-center gap-2">
                <div className="bg-base-300 rounded-full p-1.5 size-12 flex justify-center items-center">
                  <i className="bi bi-palette text-2xl" aria-hidden></i>
                </div>
                <div>
                  <h1 className="sm:text-3xl text-2xl font-bold">Tema</h1>
                  <ThemeDisplayer className="opacity-50" />
                </div>
              </div>
              <ThemeController />
            </div>
          </div>
          <div className="sm:px-5 pb-3 settings-card">
            <h1 className="text-lg font-medium opacity-70 mb-2">
              PRIVACY e SICUREZZA
            </h1>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard">
                <div className="flex justify-between">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <div className="bg-red-500/20 rounded-full p-1.5 size-12 flex justify-center items-center">
                      <i
                        className="bi bi-shield text-red-500 text-2xl"
                        aria-hidden
                      ></i>
                    </div>
                    <div>
                      <h1 className="sm:text-3xl text-2xl font-bold">
                        Cambia password
                      </h1>
                      <h1 className="opacity-50">Modifica la tua password</h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <i
                      className="bi bi-chevron-right align-text-bottom"
                      aria-hidden
                    ></i>
                  </div>
                </div>
              </Link>
              <div className="d-divider opacity-40"></div>
              <Link href="/dashboard">
                <div className="flex justify-between">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <div className="bg-blue-500/20 rounded-full p-1.5 size-12 flex justify-center items-center">
                      <i
                        className="bi bi-person text-blue-500 text-3xl"
                        aria-hidden
                      ></i>
                    </div>
                    <div>
                      <h1 className="sm:text-3xl text-2xl font-bold">
                        Cambia email
                      </h1>
                      <h1 className="opacity-50">Modifica la tua email</h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <i
                      className="bi bi-chevron-right align-text-bottom"
                      aria-hidden
                    ></i>
                  </div>
                </div>
              </Link>
              <div className="d-divider opacity-40"></div>
              <Link href="/dashboard">
                <div className="flex justify-between">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <div className="bg-teal-500/20 rounded-full p-1.5 size-12 flex justify-center items-center">
                      <i
                        className="bi bi-telephone-plus text-teal-500 text-2xl"
                        aria-hidden
                      ></i>
                    </div>
                    <div>
                      <h1 className="sm:text-3xl text-2xl font-bold">
                        Cambia numero di telefono
                      </h1>
                      <h1 className="opacity-50">
                        Modifica il tuo numero di telefono
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <i
                      className="bi bi-chevron-right align-text-bottom"
                      aria-hidden
                    ></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="sm:px-5 py-8 mb-4 settings-card flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mb-5">
              <div className="size-32 bg-base-300 d-avatar-placeholder d-avatar rounded-full p-6 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book size-full"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
              </div>
              <h1 className="opacity-80 font-medium">
                Con amore dal team di <strong>FantaProf</strong>
              </h1>
            </div>
            <div className="w-full mb-5 space-y-4">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col space-y-0.5">
                  <h1 className="text-2xl font-medium">Next.js</h1>
                  <h2 className="opacity-70">Vedi licenza</h2>
                </div>
                <Link href="">
                  <button type="button" className="d-btn d-btn-ghost">
                    <i className="bi bi-box-arrow-up-right text-2xl"></i>
                  </button>
                </Link>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col space-y-0.5">
                  <h1 className="text-2xl font-medium">React.js</h1>
                  <h2 className="opacity-70">Vedi licenza</h2>
                </div>
                <Link href="">
                  <button type="button" className="d-btn d-btn-ghost">
                    <i className="bi bi-box-arrow-up-right text-2xl"></i>
                  </button>
                </Link>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col space-y-0.5">
                  <h1 className="text-2xl font-medium">Tailwindcss</h1>
                  <h2 className="opacity-70">Vedi licenza</h2>
                </div>
                <Link href="">
                  <button type="button" className="d-btn d-btn-ghost">
                    <i className="bi bi-box-arrow-up-right text-2xl"></i>
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <LogoutButton />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
