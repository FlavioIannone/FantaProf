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
};

const Section = ({ title, children, icon }: SectionProps) => (
  <section className="mb-10">
    <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary flex items-center mb-4">
      {icon && <i className={`bi ${icon} me-2`} aria-hidden></i>}
      {title}
    </h2>
    <p className="lg:text-lg sm:text-base text-base opacity-90">{children}</p>
  </section>
);

export default function SiteExplanationRule() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
    </>
  );
}
