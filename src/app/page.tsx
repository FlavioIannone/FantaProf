import Footer from "@/components/Footer";
import LandingCard from "@/components/LandingCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-dvh lg:px-20 md:px-15 sm:px-10 px-5 lg:m-0 my-20 flex flex-col justify-center items-center">
        <header className="flex flex-col md:mb-9 mb-5 items-center">
          <h1 className="lg:text-9xl md:text-6xl text-5xl md:mb-4 mb-2 text-center font-bold ">
            Fanta Prof
          </h1>
          <h3 className="lg:text-4xl md:text-2xl text-xl text-center md:w-2/3 w-full opacity-50">
            Crea il tuo team composto dai tuoi professori e competi con i tuoi
            compagni di classe!
          </h3>
        </header>
        <div className="flex md:mb-12 mb-7 gap-5">
          <Link href="/rules" className="flex">
            <button type="button" className="d-btn d-btn-ghost text-lg">
              <i className="bi bi-journals" aria-hidden="true"></i>
              Regole
            </button>
          </Link>
          <Link href="/auth/login">
            <button type="button" className="d-btn d-btn-primary text-lg">
              <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
              Login
            </button>
          </Link>
        </div>
        <div className="flex lg:flex-row flex-col justify-between w-full lg:gap-10 md:gap-7 gap-5">
          <LandingCard
            icon={
              <i
                className="bi bi-trophy text-orange-700 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden="true"
              ></i>
            }
            title="Crea il tuo team"
            subtitle="Selezione i professori per creare il tuo team dei sogni"
          ></LandingCard>
          <LandingCard
            icon={
              <i
                className="bi bi-people text-green-800 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden="true"
              ></i>
            }
            title="Competi"
            subtitle="Sfida i tuoi compagni di classe e scala la classifica fino al primo posto"
          ></LandingCard>
          <LandingCard
            icon={
              <i
                className="bi bi-star text-yellow-400 lg:text-8xl md:text-7xl text-6xl"
                aria-hidden="true"
              ></i>
            }
            title="Ottieni punti"
            subtitle="Guarda il tuo punteggio salire mentre i tuoi professori compioni azioni in classe"
          ></LandingCard>
        </div>
      </main>
      <Footer classlist="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
