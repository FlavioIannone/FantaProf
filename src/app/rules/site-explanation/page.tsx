import { Metadata } from "next";
import Script from "next/script";
import React from "react";
import FAQItem from "../components/FAQItem";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Spiegazione del Sito",
  description:
    "Esplora tutte le funzionalità del sito FantaProf: dashboard, gestione squadra, shop professori e aggiornamenti della classifica.",
  alternates: { canonical: `${siteUrl}/rules/site-explaination` },
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
    title: "Spiegazione del Sito | Regole FantaProf",
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
    title: "Spiegazione del Sito | Regole FantaProf",
    description:
      "Esplora dashboard, shop professori e classifica di FantaProf con la nostra guida completa.",
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
  const faqList = [
    {
      question: "Come funziona la dashboard di FantaProf?",
      answer:
        "Ogni utente ha accesso a una dashboard personalizzata dove può visualizzare la propria squadra, i professori selezionati, il punteggio attuale e la classifica generale in tempo reale.",
    },
    {
      question: "Quali sono i ruoli degli studenti su FantaProf?",
      answer:
        "I non admin gestiscono la propria squadra e acquistano professori; gli admin hanno accesso a strumenti aggiuntivi come creazione eventi, gestione punteggi e aggiornamento dello shop.",
    },
    {
      question: "Come funziona lo shop dei professori?",
      answer:
        "Lo shop permette agli studenti di acquistare professori con budget virtuale. Gli admin possono aggiornare prezzi e aggiungere nuovi insegnanti.",
    },
    {
      question: "Come viene calcolata la classifica?",
      answer:
        "La classifica mostra la posizione di tutti i giocatori, punteggio settimanale e totale. Gli aggiornamenti possono essere automatici o gestiti dagli admin.",
    },
    {
      question: "Cos'è la misura Anti-Cheat?",
      answer:
        "La misura Anti-Cheat rende le partite più eque bloccando azioni dopo l'avvio della partita, disponibile dal 10 settembre 2025.",
    },
  ];

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

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Nuova misura Anti-Cheat in FantaProf",
    description:
      "Scopri la nuova funzionalità Anti-Cheat che garantisce partite eque e bilanciate.",
    author: { "@type": "Organization", name: "FantaProf" },
    datePublished: "2025-09-10",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://fantaprof.it/anti-cheat",
    },
  };

  const effectiveDate = "2025-09-10";
  const iso = new Date(effectiveDate).toISOString().split("T")[0];

  return (
    <>
      {/* JSON-LD */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary mb-4">
          Spiegazione del Sito
        </h1>
        <p className="text-lg opacity-80">
          Scopri tutte le funzionalità di FantaProf: dashboard, gestione della
          squadra, shop dei professori e aggiornamenti della classifica. Questa
          guida ti aiuta a orientarti rapidamente.
        </p>
      </header>

      <Section title="Funzionamento del Sito" icon="bi-tools">
        Il sito FantaProf è progettato per gestire facilmente la tua squadra.
        Puoi navigare tra dashboard, shop e classifica, accedendo rapidamente a
        tutte le informazioni necessarie.
      </Section>

      <Section title="Dashboard" icon="bi-speedometer2">
        La dashboard è il cuore dell'esperienza: visualizza squadra, professori,
        punteggi e classifica in tempo reale. Tutto è presentato in modo chiaro
        e immediato.
        <img
          src="/rules_media/site-explanation/OverviewPage.webp"
          alt="Vista Dashboard"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </Section>

      <Section title="Ruoli degli Studenti" icon="bi-person-badge">
        I non admin gestiscono la propria squadra e acquistano professori; gli
        admin possono creare eventi, aggiornare punteggi e gestire lo shop,
        mantenendo il gioco equilibrato.
        <img
          src="/rules_media/site-explanation/StudentRoles.webp"
          alt="Ruoli Studenti"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </Section>

      <Section title="Shop dei Professori" icon="bi-shop">
        Lo shop permette di acquistare professori con il budget virtuale. Gli
        admin possono aggiornare prezzi e aggiungere nuovi insegnanti.
      </Section>

      <Section title="Classifica" icon="bi-list-ol">
        La classifica mostra posizione, punteggio settimanale e totale. Gli
        utenti possono confrontarsi facilmente con gli altri giocatori.
      </Section>

      <Section title="Misura Anti-Cheat" icon="bi-shield-lock" newSection>
        <article className="prose max-w-3xl bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <h3 className="text-2xl font-semibold">Anti-Cheat</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Attivabile sulle nuove classi create a partire dal{" "}
            <time dateTime={iso}>
              {new Date(effectiveDate).toLocaleDateString("it-IT")}
            </time>
            .
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <dt className="font-semibold">Cosa blocca</dt>
              <dd className="text-sm text-muted-foreground mt-1">
                <ul className="list-disc ml-5">
                  <li>Nessun nuovo utente può unirsi dopo l'avvio.</li>
                  <li>I crediti iniziali non possono essere modificati.</li>
                  <li>I costi per acquistare professori restano bloccati.</li>
                </ul>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Obiettivi</dt>
              <dd className="text-sm text-muted-foreground mt-1">
                Garantire equità, prevenire manipolazioni e trasparenza nelle
                classi abilitate.
              </dd>
            </div>
          </dl>
        </article>
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
