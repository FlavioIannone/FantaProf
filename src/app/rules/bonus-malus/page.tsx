export default function BonusMalusRule() {
  return (
    <>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        <i className="bi bi-graph-up-arrow me-1" aria-hidden></i>
        Punteggi: Bonus e Malus
      </h1>
      <div className="mb-7">
        <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl mb-0.5 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
          <i className="bi bi-check-square text-success me-1" aria-hidden></i>
          Bonus:
        </h3>
        <h4 className="opacity-0 text-xl lg:mb-3 md:mb-3 sm:mb-2 mb-1 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
          <p className="opacity-90">
            I punti bonus vengono assegnati ai professori che eseguono azioni
            positive, come:
          </p>
        </h4>
        <ul className="list-disc list-inside">
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-400">
            <span className="opacity-80">
              Assenza (variazione orario, buco): +20
            </span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-400">
            <span className="opacity-80">
              Relax (no spiegazione, ripasso): +15
            </span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-500">
            <span className="opacity-80">Parolaccia (non citazione): +30</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-500">
            <span className="opacity-80">Gergo giovanile: +15</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-600">
            <span className="opacity-80">Capriola sulla cattedra: +200</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-600">
            <span className="opacity-80">Si sente male in classe: +200</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-700">
            <span className="opacity-80">Fa un complimento: +10</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-700">
            <span className="opacity-80">Ci porta in gita: +50</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-800">
            <span className="opacity-80">Inciampa/cade: +20</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-800">
            <span className="opacity-80">Vediamo film/video: +15</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-900">
            <span className="opacity-80">
              Esercitazione antincendio nella sua ora: +20
            </span>
          </li>
        </ul>
      </div>
      <div className="mb-7">
        <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl mb-0.5 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
          <i
            className="bi bi-x-square bi bi-x-square text-error me-1"
            aria-hidden
          ></i>
          Malus:
        </h3>
        <h4 className="opacity-0 text-xl lg:mb-3 md:mb-3 sm:mb-2 mb-1 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
          <p className="opacity-90">
            I punti malus vengono attribuiti ai professori che commettono errori
            o si comportano in modo negativo, come:
          </p>
        </h4>
        <ul className="list-disc list-inside">
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-400">
            <span className="opacity-80">Sbaglia nome/cognome: -10</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-400">
            <span className="opacity-80">
              Poco preavviso per verifiche/compiti: -15
            </span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-500">
            <span className="opacity-80">Battuta da boomer: -15</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-500">
            <span className="opacity-80">Mette una nota: -30</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-600">
            <span className="opacity-80">Manca, ma c’è il supplente: -10</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-600">
            <span className="opacity-80">Lavoro di gruppo: -15</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-700">
            <span className="opacity-80">Catastrofe naturale: -100</span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-700">
            <span className="opacity-80">Non manda in bagno: -15 </span>
          </li>
          <li className="opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none animation-delay-800">
            <span className="opacity-80">Litiga con alunno: -50</span>
          </li>
        </ul>
      </div>
    </>
  );
}
