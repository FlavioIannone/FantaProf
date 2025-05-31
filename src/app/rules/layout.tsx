import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReturnToHome from "@/components/ReturnToHome";
import Link from "next/link";
import { ReactNode } from "react";

export default function RulesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar className="lg:px-20 md:px-15 sm:px-10 px-5" showReturnToHome />
      <div className="lg:px-30 md:px-20 px-1.5 py-10 h-dvh flex">
        <aside className="h-full px-5 ">
          <h1 className="text-4xl text-primary mb-2.5">Sezioni</h1>
          <ul className="list-none flex flex-col gap-2">
            <li className="hover:d-btn-primary font-normal d-btn d-btn-ghost">
              <Link className="w-full text-start text-nowrap" href="">
                Composizione della squadra
              </Link>
            </li>
            <li className="hover:d-btn-primary font-normal d-btn d-btn-ghost">
              <Link className="w-full text-start text-nowrap" href="">
                Punteggi: Bonus e Malus
              </Link>
            </li>
            <li className="hover:d-btn-primary font-normal d-btn d-btn-ghost">
              <Link className="w-full text-start text-nowrap" href="">
                Personalizzazione
              </Link>
            </li>
            <li className="hover:d-btn-primary font-normal d-btn d-btn-ghost">
              <Link className="w-full text-start text-nowrap" href="">
                Inizio del Gioco
              </Link>
            </li>
          </ul>
        </aside>
        <main className="w-full">
          <header className="">
            <h1 className="text-6xl text-primary mb-5">
              Regolamento di FantaProf
            </h1>
            <h3 className="opacity-60 text-3xl">
              Prima di iniziare a giocare, leggi il regolamento
            </h3>
          </header>
          <div className="d-divider my-10"></div>
          {children}
        </main>
      </div>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
