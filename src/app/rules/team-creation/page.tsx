export default function TeamCreationRule() {
  return (
    <>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        <i className="bi bi-bullseye me-1" aria-hidden></i>Obiettivo del Gioco
      </h1>
      <h3 className="motion-safe:opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-10 md:mb-8 sm:mb-7 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <p className="opacity-80">
          L'obiettivo del FantaProf è creare la squadra di professori più
          performante possibile, accumulando il maggior numero di punti durante
          l'anno scolastico. I punti vengono assegnati in base ai comportamenti,
          alle azioni e agli eventi che coinvolgono i professori selezionati dai
          giocatori. Il vincitore sarà colui che alla fine del gioco avrà
          totalizzato il punteggio più alto.
        </p>
      </h3>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 motion-safe:opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        <i className="bi bi-people-fill me-1" aria-hidden></i>Composizione della
        Squadra
      </h1>
      <h3 className="motion-safe:opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-4 md:mb-4 sm:mb-3 mb-2 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <p className="opacity-80">
          Budget Iniziale: Ogni giocatore riceve un budget virtuale per
          acquistare i professori. Questo budget è limitato, quindi la scelta
          dei professori deve essere strategica, bilanciando qualità e prezzo.
          Selezione dei Professori: I giocatori devono scegliere i professori
          dallo shop virtuale. Ogni professore ha un prezzo iniziale e le sue
          prestazioni possono influenzare il valore durante l'anno. Capitano:
          Ogni squadra deve nominare un professore capitano. Il capitano è
          speciale: i punti che guadagna vengono raddoppiati. Tuttavia, anche i
          malus del capitano vengono raddoppiati, quindi la scelta deve essere
          ponderata.
        </p>
      </h3>
    </>
  );
}
