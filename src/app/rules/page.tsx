import Footer from "@/components/Footer";
import ReturnToHome from "@/components/ReturnToHome";
import RuleCard from "@/components/RuleCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regole",
  description: "Rules page",
};

export default function RulesPage() {
  return (
    <>
      <nav className="lg:px-5 px-1.5 d-navbar ">
        <ReturnToHome />
      </nav>
      <main className="lg:px-5 px-1.5 lg:mt-14 md:mt-10 sm:mt-5 mt-0">
        <header className="md:mb-8 mb-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl md:mb-2 mb-2 font-bold">
            Come funziona Fanta Prof
          </h1>
          <h3 className="lg:text-4xl md:text-2xl text-xl  md:w-2/3 w-full opacity-50">
            Comprendi le regole e i meccaniscmi prima di poter giocare
          </h3>
        </header>
        <RuleCard>
          <h1 className="d-card-title font-bold lg:text-4xl md:text-2xl text-xl lg:mb-5 mb-2.5 inline-block align-bottom">
            <i
              className="bi bi-mortarboard md:me-4 me-2 text-teal-700"
              aria-hidden="true"
            ></i>
            Composizione della Squadra
          </h1>
          <ul className="list-disc list-inside opacity-50 lg:text-2xl md:text-xl text-lg">
            <li>
              Budget iniziale: Ogni giocatore dispone di un budget virtuale (es.
              20 crediti) per "acquistare" professori.
            </li>
            <li>
              Selezione dei professori: Ogni giocatore sceglie un numero
              prestabilito di professori (es. 4) da inserire nella propria
              squadra. Il costo di ciascun professore può variare in base al
              numero di ore di lezione settimanali o alla popolarità.
            </li>
            <li>
              Capitano: Uno dei professori scelti viene nominato capitano,
              raddoppiando i punti (positivi o negativi) ottenuti.
            </li>
          </ul>
        </RuleCard>
        <RuleCard>
          <h1 className="d-card-title font-bold lg:text-4xl md:text-2xl text-xl lg:mb-5 mb-2.5 inline-block align-bottom">
            <i
              className="bi bi-bullseye md:me-4 me-2 text-amber-800"
              aria-hidden="true"
            ></i>
            Punteggi: Bonus e Malus
          </h1>
          <h3 className="opacity-70 lg:text-2xl md:text-xl text-lg mb-1.5">
            I punti vengono assegnati in base a comportamenti osservati durante
            le lezioni. Ecco alcuni esempi:
          </h3>
          <h1 className="lg:text-3xl md:text-2xl text-xl">
            <i
              className="bi bi-check-square text-success md:me-2.5 me-1.5"
              aria-hidden="true"
            ></i>
            Bonus:
          </h1>
          <ul className="list-disc list-inside opacity-50 lg:text-2xl md:text-xl text-lg">
            <li>Assenza (variazione orario, buco): +20</li>
            <li>Relax (no spiegazione, ripasso): +15</li>
            <li>Parolaccia (non citazione): +30</li>
            <li>Gergo giovanile: +15</li>
            <li>Capriola sulla cattedra: +1000</li>
            <li>Si sente male in classe: +200</li>
            <li>Ci porta in gita: +50</li>
          </ul>
          <h1 className="lg:text-3xl md:text-2xl text-xl">
            <i
              className="bi bi-x-square text-error md:me-2.5 me-1.5"
              aria-hidden="true"
            ></i>
            Malus:
          </h1>
          <ul className="list-disc list-inside opacity-50 lg:text-2xl md:text-xl text-lg">
            <li>Sbaglia nome/cognome: -10</li>
            <li>Poco preavviso per verifiche/compiti: -15</li>
            <li>Battuta da boomer: -15</li>
            <li>Mette una nota: -30</li>
            <li>Dimentica verifiche: -20</li>
            <li>Insulto / presa in giro: -10</li>
            <li>Non manda in bagno: -15</li>
          </ul>
        </RuleCard>
        <RuleCard>
          <h1 className="d-card-title font-bold lg:text-4xl md:text-2xl text-xl lg:mb-5 mb-2.5 inline-block align-bottom">
            <i
              className="bi bi-pencil-square md:me-4 me-2 text-blue-600"
              aria-hidden="true"
            ></i>
            Personalizzazione
          </h1>
          <h3 className="opacity-70 lg:text-2xl md:text-xl text-lg">
            Le regole, i punteggi, i bonus e i malus possono essere adattati in
            base alle dinamiche specifiche della tua classe o scuola.
            L'importante è mantenere lo spirito del gioco e garantire il
            divertimento per tutti i partecipanti.
          </h3>
        </RuleCard>
        <RuleCard>
          <h1 className="d-card-title font-bold lg:text-4xl md:text-2xl lg:mb-5 mb-2.5 text-xl inline-block align-bottom">
            <i
              className="bi bi-clock md:me-4 me-2 text-rose-700"
              aria-hidden="true"
            ></i>
            Inizio del Gioco
          </h1>
          <h3 className="opacity-70 lg:text-2xl md:text-xl text-lg">
            Dopo aver formato le squadre e assegnato i professori, il gioco può
            iniziare. Ogni giorno, osserva i comportamenti dei professori
            durante le lezioni e aggiorna i punteggi in base ai bonus e ai malus
            stabiliti.
          </h3>
        </RuleCard>
        <RuleCard>
          <h1 className="d-card-title font-bold lg:text-4xl md:text-2xl lg:mb-5 mb-2.5 text-xl inline-block align-bottom">
            <i
              className="bi bi-exclamation-triangle md:me-4 me-2 text-warning"
              aria-hidden="true"
            ></i>
            Nota
          </h1>
          <h3 className="opacity-70 lg:text-2xl md:text-xl text-lg">
            Assicurati che il gioco sia svolto nel rispetto dei professori e
            dell'ambiente scolastico. Il FantaProf è pensato per aggiungere un
            tocco di divertimento alla routine scolastica, senza arrecare
            disturbo o mancare di rispetto a nessuno.
          </h3>
        </RuleCard>
      </main>
      <Footer className="lg:px-5 px-1.5"></Footer>
    </>
  );
}
