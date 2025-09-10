import CookieConsentModal from "@/components/client/CookieConsentModal";
import Footer from "@/components/server/Footer";
import LandingCard from "@/components/server/LandingCard";
import Navbar from "@/components/server/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <Navbar className="lg:px-20 md:px-15 sm:px-10 px-5"></Navbar>
      </header>
      <main className="w-full min-h-dvh lg:px-20 md:px-15 sm:px-10 px-5 lg:m-0 my-20 flex flex-col justify-center items-center">
        <div className="flex flex-col md:mb-9 mb-5 items-center animate-fade-in-bottom motion-reduce:animate-none">
          <h1 className="lg:text-7xl md:text-5xl text-4xl md:mb-4 mb-2 text-center font-bold ">
            Fanta Prof
          </h1>
          <h2 className="lg:text-3xl md:text-2xl text-xl text-center md:w-2/3 w-full opacity-70">
            Crea il tuo team composto dai tuoi professori e competi con i tuoi
            compagni di classe!
          </h2>
        </div>
        <div className="flex md:mb-12 mb-7 gap-5">
          <Link href="/rules/team-creation" className="flex">
            <button className="group d-btn d-btn-ghost d-btn-lg text-xl motion-safe:opacity-0 animate-fade-in-bottom animation-delay-200 motion-reduce:animate-none">
              <i
                className="bi bi-journals group-hover:animate-bounce"
                aria-hidden
              ></i>
              Regolamento
            </button>
          </Link>
        </div>
        <div className="flex lg:flex-row flex-col justify-between w-full lg:gap-10 md:gap-7 gap-5">
          <LandingCard
            icon={
              <i
                className="bi bi-trophy text-orange-700 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden
              ></i>
            }
            title="Crea il tuo team"
            subtitle="Selezione i professori per creare il tuo team dei sogni"
          ></LandingCard>
          <LandingCard
            icon={
              <i
                className="bi bi-people text-teal-700 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden
              ></i>
            }
            title="Competi"
            subtitle="Sfida i tuoi compagni di classe e scala la classifica fino al primo posto"
          ></LandingCard>
          <LandingCard
            icon={
              <i
                className="bi bi-star text-yellow-400 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden
              ></i>
            }
            title="Ottieni punti"
            subtitle="Guarda il tuo punteggio salire mentre i tuoi professori compioni azioni in classe"
          ></LandingCard>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
      <CookieConsentModal defaultChecked />
    </>
  );
}
