import { Metadata } from "next";
import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Inizio e Durata del Gioco",
  description:
    "Scopri come iniziare, preparare e gestire la durata del gioco FantaProf per un anno scolastico coinvolgente.",
  alternates: {
    canonical: `${siteUrl}/rules/starting-game`,
  },
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "personalizzazione",
    "personalizzazione FantaProf",
    "bonus malus personalizzati",
    "fantasy school game",
    "gioco studenti professori",
    "classi scolastiche",
    "punteggio insegnanti",
    "personalizzare FantaProf",
    "personalizzazione eventi",
    "personalizzazione punteggi",
    "shop professori",
  ],
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  openGraph: {
    title: "Inizio e Durata del Gioco",

    description:
      "Scopri come iniziare, preparare e gestire la durata del gioco FantaProf per un anno scolastico coinvolgente.",
    url: `${siteUrl}/rules/starting-game`,
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
    title: "Inizio e Durata del Gioco",
    description:
      "Scopri come iniziare, preparare e gestire la durata del gioco FantaProf per un anno scolastico coinvolgente.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quando inizia il gioco FantaProf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il gioco inizia quando tutti i giocatori hanno completato la selezione dei professori per la propria squadra e gli admin verificano il rispetto del budget.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto dura il gioco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La durata può essere personalizzata: trimestre, semestre o anno scolastico, a seconda del livello di coinvolgimento desiderato.",
      },
    },
    {
      "@type": "Question",
      name: "Come si prepara il gioco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gli amministratori devono definire regole, eventi e professori disponibili nello shop. Ogni giocatore deve avere accesso al budget iniziale e al regolamento completo.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa succede alla fine del gioco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alla fine del periodo stabilito, viene proclamato il vincitore. Gli admin possono assegnare premi simbolici per aumentare il coinvolgimento.",
      },
    },
  ],
};

// --- Section Component ---
type SectionProps = {
  title: string;
  children: React.ReactNode;
  icon?: string;
};

const Section = ({ title, children, icon }: SectionProps) => (
  <section className="mb-10">
    <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary flex items-center mb-3">
      {icon && <i className={`bi ${icon} me-2`} aria-hidden="true"></i>}
      {title}
    </h2>
    <div className="lg:text-xl sm:text-lg text-lg opacity-80">
      <p>{children}</p>
    </div>
  </section>
);

// --- Page Component ---
export default function StartingGameRule() {
  return (
    <main className="px-4 lg:px-16 py-8">
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary mb-6">
        Inizio e Durata del Gioco
      </h1>

      {/* Inject JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Section title="Preparazione del Gioco" icon="bi-gear-fill">
        Prima di iniziare, è importante che gli amministratori abbiano definito
        tutte le regole, gli eventi e i professori disponibili nello shop. Ogni
        giocatore deve avere accesso al budget iniziale e al regolamento
        completo.
      </Section>

      <Section title="Avvio del Gioco" icon="bi-play-circle-fill">
        Il gioco inizia quando tutti i giocatori hanno completato la selezione
        dei professori per la propria squadra. I professori selezionati vengono
        bloccati e non possono essere cambiati senza penalità, e gli admin
        verificano che ogni squadra rispetti il budget.
      </Section>

      <Section title="Durata" icon="bi-hourglass-split">
        La durata del FantaProf può essere personalizzata:
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>Trimestre:</strong> Ideale per partite rapide e dinamiche.
          </li>
          <li>
            <strong>Semestre:</strong> Offre abbastanza tempo per accumulare
            punteggi e seguire l'evoluzione delle squadre.
          </li>
          <li>
            <strong>Anno Scolastico:</strong> Perfetto per un coinvolgimento
            costante e per includere tutti gli eventi principali della scuola.
          </li>
        </ul>
      </Section>

      <Section title="Termine del Gioco" icon="bi-flag-fill">
        Alla fine del periodo stabilito, il gioco termina e viene proclamato il
        vincitore. Gli admin possono decidere di assegnare premi simbolici (es.
        riconoscimenti in classe, bonus immaginari) per aumentare il
        coinvolgimento dei partecipanti.
      </Section>
    </main>
  );
}
