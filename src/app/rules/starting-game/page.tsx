import { Metadata } from "next";
import Script from "next/script";
import React from "react";
import FAQItem from "../components/FAQItem";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Inizio e Durata del Gioco",
  description:
    "Scopri come iniziare, preparare e gestire la durata del gioco FantaProf per un anno scolastico coinvolgente.",
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "inizio gioco",
    "durata gioco",
    "fantasy school game",
    "gioco studenti professori",
    "classi scolastiche",
    "punteggio insegnanti",
  ],
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  alternates: {
    canonical: `${siteUrl}/rules/starting-game`,
  },
  openGraph: {
    title: "Inizio e Durata del Gioco | Regole FantaProf",
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
    title: "Inizio e Durata del Gioco | Regole FantaProf",
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

const faqList = [
  {
    question: "Quando inizia il gioco FantaProf?",
    answer:
      "Il gioco inizia quando tutti i giocatori hanno completato la selezione dei professori e gli admin verificano il rispetto del budget.",
  },
  {
    question: "Quanto dura il gioco?",
    answer:
      "La durata può essere personalizzata: trimestre, semestre o anno scolastico, a seconda del livello di coinvolgimento desiderato.",
  },
  {
    question: "Come si prepara il gioco?",
    answer:
      "Gli admin devono definire regole, eventi e professori disponibili nello shop. Ogni giocatore deve avere accesso al budget iniziale e al regolamento completo.",
  },
  {
    question: "Cosa succede alla fine del gioco?",
    answer:
      "Alla fine del periodo stabilito viene proclamato il vincitore e gli admin possono assegnare premi simbolici per aumentare il coinvolgimento.",
  },
];

// FAQ JSON-LD
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ...faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      {icon && <i className={`bi ${icon} me-2`} aria-hidden></i>}
      {title}
    </h2>
    <div className="lg:text-xl sm:text-lg text-lg opacity-80">{children}</div>
  </section>
);

// --- Page Component ---
export default function StartingGameRule() {
  return (
    <>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary mb-6">
        Inizio e Durata del Gioco
      </h1>

      {/* JSON-LD FAQ */}
      <Script
        id="starting-game-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Introduzione */}
      <p className="text-xl opacity-80 mb-6">
        Scopri come preparare, avviare e gestire la durata di{" "}
        <strong>FantaProf</strong> per rendere il gioco più coinvolgente durante
        l’anno scolastico. La pianificazione accurata assicura partite
        equilibrate e divertenti per tutti i partecipanti.
      </p>
      <img
        src="/rules_media/personalization/ClassSettingsPage.webp"
        alt="Preparazione FantaProf"
        className="rounded-2xl shadow-md mx-auto my-6"
        width={800}
        height={400}
      />

      {/* Sezioni */}
      <Section title="Preparazione del Gioco" icon="bi-gear-fill">
        Gli amministratori devono definire regole, eventi e professori
        disponibili nello shop. Ogni giocatore deve avere accesso al budget
        iniziale e al regolamento completo.
      </Section>

      <Section title="Avvio del Gioco" icon="bi-play-circle-fill">
        Il gioco inizia quando tutti i giocatori hanno completato la selezione
        dei professori. I professori selezionati vengono bloccati e non possono
        essere cambiati senza penalità. Gli admin verificano che ogni squadra
        rispetti il budget.
      </Section>

      <Section title="Durata del Gioco" icon="bi-hourglass-split">
        La durata può essere personalizzata:
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>Trimestre:</strong> Partite rapide e dinamiche.
          </li>
          <li>
            <strong>Semestre:</strong> Tempo sufficiente per accumulare punteggi
            e monitorare le squadre.
          </li>
          <li>
            <strong>Anno Scolastico:</strong> Coinvolgimento costante e
            copertura di tutti gli eventi principali.
          </li>
        </ul>
      </Section>

      <Section title="Termine del Gioco" icon="bi-flag-fill">
        Alla fine del periodo stabilito, il gioco termina e viene proclamato il
        vincitore. Gli admin possono assegnare premi simbolici per aumentare il
        coinvolgimento dei partecipanti.
      </Section>

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

      {/* FAQ Visiva */}
      <section className="my-6">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-6">
          <i className="bi bi-question-circle-fill me-2" aria-hidden></i>{" "}
          Domande frequenti
        </h2>
        {faqList.map((faqItem, i) => (
          <FAQItem key={i} {...faqItem} />
        ))}
      </section>
    </>
  );
}
