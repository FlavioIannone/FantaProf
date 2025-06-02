export default function PersonalizationRule() {
  return (
    <>
      <div>
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
          <i className="bi bi-pencil-square me-1" aria-hidden></i>
          Personalizzazione degli Eventi
        </h1>
        <h3 className="motion-safe:opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
          <p className="lg:text-2xl sm:text-xl text-xl opacity-70">
            La personalizzazione è uno dei punti di forza del FantaProf, poiché
            consente agli amministratori di adattare il gioco alle esigenze e
            alle particolarità della propria classe o contesto scolastico. Ecco
            in dettaglio come funziona:
          </p>
        </h3>
        <ul>
          <li className="lg:mb-7 md:mb-6 sm:mb-5 mb-5">
            <h4 className="lg:text-4xl md:text-2xl sm:text-xl text-xl text-primary lg:mb-2 md:mb-2 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
              Modifica del Valore di Bonus e Malus
            </h4>
            <ul>
              <li className="motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left animation-delay-300 motion-reduce:animate-none">
                <p className="lg:text-2xl sm:text-xl text-xl opacity-70">
                  Gli amministratori possono stabilire eventi specifici per i
                  punteggi, ad esempio: Assegnare un valore maggiore ai bonus
                  per attività extracurricolari se sono particolarmente
                  rilevanti per la classe. Modificare i malus per comportamenti
                  considerati più o meno gravi nel contesto scolastico. Questa
                  flessibilità permette di creare un sistema di punteggi che
                  motiva i giocatori a scegliere strategicamente.
                </p>
              </li>
            </ul>
          </li>
          <li className="lg:mb-7 md:mb-6 sm:mb-5 mb-5">
            <h4 className="lg:text-4xl md:text-2xl sm:text-xl text-xl text-primary lg:mb-2 md:mb-2 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
              Aggiunta di Nuovi Eventi
            </h4>
            <ul>
              <li className="motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left animation-delay-300 motion-reduce:animate-none">
                <p className="lg:text-2xl sm:text-xl text-xl opacity-70">
                  Gli eventi possono essere personalizzati per riflettere
                  situazioni scolastiche reali. Ad esempio: Evento positivo: "Il
                  professore organizza una gita scolastica di successo" (+10
                  punti). Evento negativo: "Il professore dimentica di
                  consegnare i compiti corretti" (-5 punti). Gli amministratori
                  possono creare e modificare questi eventi direttamente dalla
                  dashboard.
                </p>
              </li>
            </ul>
          </li>
          <li className="lg:mb-7 md:mb-6 sm:mb-5 mb-5">
            <h4 className="lg:text-4xl md:text-2xl sm:text-xl text-xl text-primary lg:mb-2 md:mb-2 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
              Aggiornamento dello Shop
            </h4>
            <ul>
              <li className="motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left animation-delay-300 motion-reduce:animate-none">
                <p className="lg:text-2xl sm:text-xl text-xl opacity-70">
                  Ogni professore nello shop ha un prezzo iniziale che può
                  cambiare nel corso del gioco. Gli amministratori possono:
                  Aggiungere nuovi professori al catalogo, definendo i loro
                  prezzi in base alle performance. Modificare i prezzi dei
                  professori esistenti per riflettere il loro rendimento o altri
                  fattori. Rimuovere professori che non fanno più parte della
                  scuola.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
