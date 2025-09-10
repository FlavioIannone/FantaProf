import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Spiegazione del Sito",
  alternates: {
    canonical: `${siteUrl}/rules/site-explaination`,
  },
  description:
    "Esplora tutte le funzionalità del sito FantaProf: dashboard, gestione squadra, shop professori e aggiornamenti della classifica.",
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "dashboard FantaProf",
    "shop professori",
    "classifica FantaProf",
    "ruoli studenti",
    "spiegazione sito FantaProf",
    "come funziona FantaProf",
  ],
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  openGraph: {
    title: "Spiegazione del Sito",
    description:
      "Esplora tutte le funzionalità del sito FantaProf: dashboard, gestione squadra, shop professori e aggiornamenti della classifica.",
    url: `${siteUrl}/rules/site-explaination`,
    siteName: "FantaProf",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Twitter Image",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    site: "@FantaProf",
    creator: "@FantaProf",
    card: "summary_large_image",
    title: "Spiegazione del Sito",
    description:
      "Personalizza eventi, punteggi e shop professori in FantaProf. Scopri tutte le regole!",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Twitter Image",
      },
    ],
  },
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
  icon?: string;
  newSection?: boolean;
};

const Section = ({ title, children, icon, newSection }: SectionProps) => (
  <section className="mb-10">
    <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary flex items-center mb-4">
      {icon && <i className={`bi ${icon} me-2`} aria-hidden></i>}
      {title}
      {newSection && (
        <span className="d-badge d-badge-primary ms-4 animate-pulse motion-reduce:animate-none">
          New
        </span>
      )}
    </h2>
    <div className="lg:text-lg sm:text-base text-base opacity-90">
      {children}
    </div>
  </section>
);

export default function SiteExplanationRule() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    headline: "Spiegazione del Sito - FantaProf",
    description:
      "Scopri come utilizzare al meglio il sito FantaProf con la nostra guida dettagliata.",
    mainEntity: [
      {
        "@type": "Question",
        name: "Come funziona la dashboard di FantaProf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ogni utente ha accesso a una dashboard personalizzata dove può visualizzare la propria squadra, i professori selezionati, il punteggio attuale e la classifica generale in tempo reale. La dashboard permette anche di navigare facilmente tra le diverse funzionalità del sito.",
        },
      },
      {
        "@type": "Question",
        name: "Quali sono i ruoli degli studenti su FantaProf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gli utenti non admin possono gestire la propria squadra e acquistare professori nello shop. Gli admin hanno accesso a strumenti aggiuntivi come la creazione di eventi, la modifica dei punteggi e la gestione dello shop dei professori.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona lo shop dei professori?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lo shop permette agli studenti di acquistare professori usando un budget virtuale. I prezzi dei professori possono essere aggiornati dagli admin e i nuovi insegnanti assegnati alla scuola vengono aggiunti automaticamente allo shop.",
        },
      },
      {
        "@type": "Question",
        name: "Come viene calcolata la classifica?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La classifica mostra la posizione di tutti i giocatori, il punteggio settimanale e il punteggio totale. Gli aggiornamenti avvengono automaticamente o possono essere gestiti dagli admin tramite la dashboard.",
        },
      },
      {
        "@type": "Question",
        name: "Che cos'è la misura Anti-Cheat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "È una nuova funzionalità introdotta il 10 settembre 2025 che rende le partite più eque e bilanciate, bloccando alcune azioni dopo l'avvio della partita.",
        },
      },
      {
        "@type": "Question",
        name: "Da quando è disponibile l'Anti-Cheat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La misura è disponibile per tutte le classi create a partire dal 10 settembre 2025.",
        },
      },
      {
        "@type": "Question",
        name: "Cosa succede quando l'Anti-Cheat è attivo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dopo che l'amministratore avvia la partita: non è più possibile unirsi alla classe, i crediti iniziali non possono essere modificati e i costi per acquistare professori restano bloccati.",
        },
      },
      {
        "@type": "Question",
        name: "Chi può attivare l'Anti-Cheat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Solo gli amministratori della classe possono attivare l'Anti-Cheat al momento della creazione della classe.",
        },
      },
      {
        "@type": "Question",
        name: "Posso disattivare l'Anti-Cheat dopo l'inizio della partita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, una volta avviata la partita con l'Anti-Cheat attivo, le restrizioni rimangono in vigore fino alla fine della partita.",
        },
      },
    ],
  };
  const teachArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Nuova misura Anti-Cheat in FantaProf",
    description:
      "Scopri la nuova funzionalità Anti-Cheat che garantisce partite eque e bilanciate nelle classi create dal 10 settembre 2025.",
    author: {
      "@type": "Organization",
      name: "FantaProf",
    },
    datePublished: "2025-09-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fantaprof.it/anti-cheat",
    },
  };

  const effectiveDate = "2025-09-10";
  const iso = new Date(effectiveDate).toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, teachArticleJsonLd]),
        }}
      />

      <Section title="Funzionamento del Sito" icon="bi-tools">
        Il sito FantaProf è stato progettato per rendere semplice e divertente
        la gestione della tua squadra di professori. Puoi navigare tra
        dashboard, shop e classifica senza complicazioni, accedendo rapidamente
        a tutte le informazioni necessarie.
      </Section>

      <Section title="Dashboard" icon="bi-speedometer2">
        La dashboard è il cuore della tua esperienza su FantaProf. Qui puoi
        controllare la tua squadra, i professori selezionati, il punteggio
        aggiornato e la posizione in classifica. Tutte le informazioni sono
        presentate in modo chiaro e immediato.
      </Section>

      <Section title="Ruoli degli Studenti" icon="bi-person-badge">
        Su FantaProf esistono ruoli diversi per gli utenti. I non admin
        gestiscono la propria squadra e acquistano professori, mentre gli admin
        hanno la possibilità di creare eventi, aggiornare i punteggi e gestire
        lo shop dei professori, mantenendo il gioco equilibrato e aggiornato.
      </Section>

      <Section title="Shop dei Professori" icon="bi-shop">
        Lo shop dei professori permette di acquistare insegnanti usando il
        budget virtuale a disposizione. Gli admin possono aggiornare i prezzi e
        aggiungere nuovi professori, assicurando che ogni giocatore abbia sempre
        accesso agli ultimi aggiornamenti della scuola.
      </Section>

      <Section title="Classifica" icon="bi-list-ol">
        La classifica visualizza la posizione di tutti i giocatori, il punteggio
        settimanale e il punteggio totale. Gli utenti possono controllare
        facilmente la propria posizione e confrontarsi con gli altri, mentre gli
        admin possono intervenire per aggiornamenti o correzioni.
      </Section>
      <Section title="Misura anti-cheat" icon="bi-shield-lock" newSection>
        <article
          aria-labelledby="anti-cheat-title"
          className="prose max-w-3xl bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 id="anti-cheat-title" className="text-2xl font-semibold">
                Misura Anti-Cheat
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Attivabile sulle nuove classi create a partire dal{" "}
                <time dateTime={iso} className="font-medium">
                  {new Date(effectiveDate).toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </time>
                .
              </p>
            </div>
          </div>

          <section
            id="anti-cheat-details"
            role="region"
            aria-live="polite"
            className={`mt-4`}
          >
            <p className="leading-relaxed">
              La misura anti-cheat è progettata per garantire un gioco equo e
              bilanciato. Vengono utilizzati algoritmi avanzati per rilevare e
              prevenire comportamenti scorretti, assicurando che tutti i
              giocatori rispettino le regole del gioco.
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <dt className="font-semibold">Cosa blocca</dt>
                <dd className="text-sm text-muted-foreground mt-1">
                  <ul className="list-disc ml-5">
                    <li>Nessun nuovo utente può unirsi dopo l'avvio.</li>
                    <li>I crediti iniziali non possono essere modificati.</li>
                    <li>
                      I costi in crediti per acquistare professori sono
                      bloccati.
                    </li>
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="font-semibold">Obiettivi</dt>
                <dd className="text-sm text-muted-foreground mt-1">
                  Rendere la competizione più equa, prevenire manipolazioni e
                  garantire trasparenza nelle classi abilitate.
                </dd>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-md p-3 bg-base-200">
                <h3 className="text-sm font-medium">Regole temporali</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  L'anti-cheat è applicato alle classi create dopo il{" "}
                  <time dateTime={iso}>
                    {new Date(effectiveDate).toLocaleDateString("it-IT")}
                  </time>
                  . Una volta avviata la partita, le restrizioni sono permanenti
                  per la durata della partita.
                </p>
              </div>

              <div className="rounded-md p-3 bg-base-200">
                <h3 className="text-sm font-medium">Per gli admin</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Solo gli amministratori possono abilitare l'anti-cheat durante
                  la creazione della classe e avviare la partita. Le modifiche
                  successive sono bloccate automaticamente.
                </p>
              </div>
            </div>
          </section>
        </article>
      </Section>
    </>
  );
}
