export default function SiteExplainationRule() {
  return (
    <>
      <h1 className="lg:text-6xl md:text-4xl sm:text-3xl text-3xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        <i className="bi bi-tools me-1" aria-hidden></i>Funzionamento del Sito
      </h1>
      <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <p className="opacity-70">
          Scopri come funziona il sito e tutte le sue funzionalità in questa
          sezione.
        </p>
      </h3>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        Dashboard Personale
      </h1>
      <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <p className="opacity-70">
          Ogni utente ha accesso a una dashboard personalizzata dove può
          visualizzare: Le proprie squadre e i professori selezionati. Il
          punteggio attuale della squadra. La classifica generale dei giocatori.
        </p>
      </h3>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        Ruoli degli Studenti
      </h1>
      <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <div className="opacity-70">
          <strong className="text-primary">Utenti Non Admin:</strong>
          <ul className="list-disc list-inside">
            <li>Possono vedere il punteggio della propria squadra.</li>
            <li>Possono acquistare nuovi professori dallo shop. </li>
            <li>Possono consultare la classifica aggiornata.</li>
          </ul>
          <strong className="text-primary">Admin:</strong>
          <ul className="list-disc list-inside">
            <li>
              Possono modificare i punteggi delle squadre attraverso un'apposita
              pagina della dashboard.
            </li>
            <li>
              Hanno il potere di aggiungere nuovi professori allo shop,
              definendo i loro prezzi.
            </li>
            <li>
              Possono creare nuovi eventi che assegnano bonus o malus ai
              professori.
            </li>
          </ul>
        </div>
      </h3>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        Shop dei Professori
      </h1>
      <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <div className="opacity-70">
          La sezione shop permette ai giocatori di:
          <ul className="list-disc list-inside">
            <li>Acquistare professori con il budget virtuale disponibile.</li>
            <li>
              Visualizzare i prezzi aggiornati dei professori, che possono
              essere modificati dagli admin.
            </li>
            <li>Aggiungere professori recentemente assegnati alla scuola.</li>
          </ul>
        </div>
      </h3>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1 opacity-0 sm:animate-fade-in-top animate-fade-in-left motion-reduce:animate-none">
        Classifica
      </h1>
      <h3 className="opacity-0 lg:text-2xl sm:text-xl text-xl lg:mb-12 md:mb-10 sm:mb-10 mb-6 sm:animate-fade-in-top animate-fade-in-left sm:animation-delay-700 animation-delay-300 motion-reduce:animate-none">
        <div className="opacity-70">
          La classifica mostra in tempo reale il punteggio di tutti i giocatori.
          Gli elementi principali includono:
          <ul className="list-disc list-inside">
            <li>
              Posizione in Classifica: Ogni giocatore viene ordinato in base al
              punteggio totale.
            </li>
            <li>
              Dettaglio dei Punti: La classifica include un riepilogo del
              punteggio settimanale e del punteggio totale accumulato.
            </li>
            <li>
              Aggiornamenti in Tempo Reale: Gli admin possono aggiornare i
              punteggi, e la classifica viene aggiornata automaticamente per
              tutti gli utenti.
            </li>
          </ul>
        </div>
      </h3>
    </>
  );
}
