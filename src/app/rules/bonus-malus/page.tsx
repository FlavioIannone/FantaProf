import { Metadata } from "next";
import Script from "next/script";
import React from "react";
import FAQItem from "../components/FAQItem";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ---------------- Metadata ----------------
export const metadata: Metadata = {
  title: "Bonus e Malus",
  alternates: { canonical: `${siteUrl}/rules/bonus-malus` },
  description:
    "Scopri come funzionano i bonus e malus in FantaProf e come influenzano la classifica.",
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "Bonus e Malus",
    "bonus malus FantaProf",
    "punteggi professori FantaProf",
    "punteggio insegnanti",
    "punteggi scuola gioco",
    "fantasy school game",
    "gioco studenti e professori",
    "classi scolastiche",
    "gestione punti professori",
    "regole punteggio scuola",
    "bonus insegnanti",
    "malus insegnanti",
    "punteggio studenti",
    "regole gioco FantaProf",
    "come funzionano bonus e malus FantaProf",
  ],
  openGraph: {
    title: "Bonus e Malus",
    description:
      "Scopri come funzionano i bonus e malus in FantaProf e come influenzano la classifica.",
    url: `${siteUrl}/rules/bonus-malus`,
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
    card: "summary_large_image",
    title: "Bonus e Malus",
    description:
      "Scopri come funzionano i bonus e malus in FantaProf e come influenzano la classifica.",
    site: "@FantaProf",
    creator: "@FantaProf",
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

// ---------------- Types ----------------
type PointsListItem = {
  name: string;
  points: number;
  description: string;
};

// ---------------- Data ----------------
const bonusItems: PointsListItem[] = [
  {
    name: "Assenza (variazione orario, buco)",
    points: 20,
    description:
      "Il professore salta una lezione programmata o cambia orario, causando un buco in classe.",
  },
  {
    name: "Relax (no spiegazione, ripasso)",
    points: 15,
    description:
      "La lezione è leggera e gli studenti ripassano senza spiegazioni particolari.",
  },
  {
    name: "Parolaccia (non citazione)",
    points: 30,
    description:
      "Uso di linguaggio informale o espressioni goliardiche senza ledere la classe.",
  },
  {
    name: "Gergo giovanile",
    points: 15,
    description:
      "Il professore usa termini moderni o slang per coinvolgere gli studenti.",
  },
  {
    name: "Capriola sulla cattedra",
    points: 200,
    description:
      "Un gesto spettacolare che entusiasma gli studenti e porta grande morale.",
  },
  {
    name: "Si sente male in classe",
    points: 200,
    description:
      "Evento raro ma drammatico che aumenta la tensione e la curiosità degli studenti.",
  },
  {
    name: "Fa un complimento",
    points: 10,
    description: "Il professore loda gli studenti o crea un momento positivo.",
  },
  {
    name: "Ci porta in gita",
    points: 50,
    description: "Organizza una gita o attività speciale fuori dalla classe.",
  },
  {
    name: "Inciampa/cade",
    points: 20,
    description:
      "Evento buffo che intrattiene la classe senza conseguenze serie.",
  },
  {
    name: "Vediamo film/video",
    points: 15,
    description: "Proiezione di un film o video didattico in classe.",
  },
  {
    name: "Esercitazione antincendio nella sua ora",
    points: 20,
    description:
      "Simulazione di emergenza per aumentare la sicurezza e il coinvolgimento.",
  },
];

const malusItems: PointsListItem[] = [
  {
    name: "Sbaglia nome/cognome",
    points: -10,
    description:
      "Errore nel chiamare gli studenti, riduce il punteggio per attenzione.",
  },
  {
    name: "Poco preavviso per verifiche/compiti",
    points: -15,
    description:
      "Le verifiche o compiti vengono comunicati all'ultimo momento.",
  },
  {
    name: "Battuta da boomer",
    points: -15,
    description: "Commento fuori contesto che non coinvolge gli studenti.",
  },
  {
    name: "Mette una nota",
    points: -30,
    description: "Segnalazione disciplinare che penalizza la classe.",
  },
  {
    name: "Manca, ma c’è il supplente",
    points: -10,
    description: "Assenza del professore con supplente presente.",
  },
  {
    name: "Lavoro di gruppo",
    points: -15,
    description: "Attività non gestita correttamente causando confusione.",
  },
  {
    name: "Catastrofe naturale",
    points: -100,
    description:
      "Evento raro e imprevedibile che impatta pesantemente la classe.",
  },
  {
    name: "Non manda in bagno",
    points: -15,
    description: "Rifiuto di concedere pausa bagno agli studenti.",
  },
  {
    name: "Litiga con alunno",
    points: -50,
    description:
      "Conflitto diretto con uno studente, con impatto negativo sulla classe.",
  },
];

const faqItems = [
  {
    question:
      "Cosa succede se un professore riceve bonus e malus nello stesso giorno?",
    answer:
      "I punti si sommano e influiscono sulla classifica complessiva del professore.",
  },
  {
    question: "I punti bonus influiscono sulla classifica finale?",
    answer:
      "Sì, tutti i punti accumulati dai professori determinano la classifica finale della squadra.",
  },
  {
    question: "I malus si possono annullare?",
    answer:
      "No, i malus rimangono sul punteggio, ma i bonus futuri possono compensarli.",
  },
  {
    question: "È possibile guadagnare più bonus nello stesso giorno?",
    answer:
      "Sì, ogni evento positivo viene sommato al punteggio totale del professore.",
  },
];

// ---------------- Components ----------------
const PointsList = ({
  title,
  icon,
  items,
  positive = true,
}: {
  title: string;
  icon: string;
  items: PointsListItem[];
  positive?: boolean;
}) => (
  <div className="mb-7">
    <h2 className="text-xl mb-2">
      <i className={`${icon} me-1`} aria-hidden></i>
      {title}:
    </h2>
    <ul className="list-disc list-inside">
      {items.map((item, i) => (
        <li key={i} className="mb-1 opacity-80">
          <strong>{item.name}</strong>{" "}
          <span
            className={`d-badge ${
              positive ? "d-badge-success" : "d-badge-error"
            }`}
          >
            {positive ? `+${item.points}` : item.points}
          </span>
          <p className="text-sm opacity-70 mt-1">{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

// ---------------- Page ----------------
export default function BonusMalusRule() {
  const bonusMalusListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Esempi Bonus e Malus FantaProf",
    itemListElement: [
      ...bonusItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.name} (+${item.points})`,
      })),
      ...malusItems.map((item, index) => ({
        "@type": "ListItem",
        position: bonusItems.length + index + 1,
        name: `${item.name} (${item.points})`,
      })),
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1">
        <i className="bi bi-graph-up-arrow me-1" aria-hidden></i>
        Punteggi: Bonus e Malus
      </h1>
      <p className="mb-6">
        In FantaProf, i professori possono guadagnare o perdere punti in base al
        loro comportamento in classe. I bonus premiano gesti positivi, mentre i
        malus penalizzano errori o comportamenti non ottimali. Scopri tutti i
        dettagli qui sotto!
      </p>

      <PointsList
        title="Bonus"
        icon="bi bi-check-square text-success"
        items={bonusItems}
      />
      <PointsList
        title="Malus"
        icon="bi bi-x-square text-error"
        items={malusItems}
        positive={false}
      />

      {/* VIDEO DEMO */}
      {/* <section className="mb-16">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-4">
          <i className="bi bi-play-circle-fill me-2" aria-hidden></i> Guarda
          come creare il tuo team
        </h2>
        <p className="opacity-80 lg:text-xl sm:text-lg text-base mb-6">
          Dai un'occhiata a questo breve video dimostrativo che mostra passo per
          passo come creare e gestire il tuo team su FantaProf.
        </p>
        <div className="aspect-video rounded-2xl shadow-md overflow-hidden mx-auto max-w-4xl">
          <iframe
            src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO"
            title="Come creare il team FantaProf"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section> */}

      <section className="my-6">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-6">
          <i className="bi bi-question-circle-fill me-2" aria-hidden></i>{" "}
          Domande frequenti
        </h2>
        {faqItems.map((faqItem, i) => (
          <FAQItem key={i} {...faqItem} />
        ))}
      </section>

      <Script type="application/ld+json">
        {JSON.stringify(bonusMalusListJsonLd)}
      </Script>
      <Script type="application/ld+json">{JSON.stringify(faqJsonLd)}</Script>
    </>
  );
}
