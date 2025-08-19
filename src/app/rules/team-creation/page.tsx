import { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Creazione del Team",
  description:
    "Guida completa alla creazione del tuo team di professori in FantaProf. Impara a gestire il budget, selezionare i docenti migliori e nominare il capitano per raddoppiare i punti e vincere.",
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "creazione team",
    "formazione squadra",
    "fantasy school game",
    "gioco studenti professori",
    "classe scolastica",
    "capitano squadra",
    "punteggio insegnanti",
  ],
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  alternates: {
    canonical: `${siteUrl}/rules/team-creation`,
  },
  openGraph: {
    title: "Creazione del Team",
    description:
      "Scopri come costruire la tua squadra di professori in FantaProf, gestire il budget, scegliere i docenti e nominare il capitano per massimizzare i punti.",
    url: `${siteUrl}/rules/team-creation`,
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
    title: "Creazione del Team",
    description:
      "Guida alla creazione della tua squadra di professori in FantaProf: strategie, regole e consigli pratici.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qual è l’obiettivo del gioco FantaProf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'obiettivo è creare la squadra di professori più performante, accumulando il maggior numero di punti durante l'anno scolastico grazie a strategie accurate e scelte ponderate.",
      },
    },
    {
      "@type": "Question",
      name: "Come si compone la squadra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ogni giocatore riceve un budget virtuale per acquistare professori dallo shop. La squadra deve includere docenti con diverse caratteristiche e abilità, bilanciando qualità e costo.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa significa nominare un capitano?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il capitano è un professore speciale i cui punti vengono raddoppiati, sia bonus che malus. Sceglierlo con strategia è fondamentale per massimizzare il punteggio complessivo della squadra.",
      },
    },
    {
      "@type": "Question",
      name: "Quali strategie usare per la selezione dei professori?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "È importante bilanciare il budget con le performance attese dei docenti, considerare il rendimento passato e scegliere un capitano che possa portare vantaggi significativi.",
      },
    },
  ],
};

export default function TeamCreationRule() {
  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <Script
        id="ld-json-team-creation-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="mb-10">
        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary mb-3">
          <i className="bi bi-bullseye me-1" aria-hidden></i> Obiettivo del
          Gioco
        </h1>
        <p className="opacity-80 lg:text-2xl sm:text-xl text-xl">
          L'obiettivo del <strong>FantaProf</strong> è costruire la squadra di
          professori più performante, accumulando punti durante l'anno
          scolastico. I punti vengono calcolati in base alle azioni, ai
          comportamenti e agli eventi che coinvolgono i docenti selezionati.
          Pianificare strategicamente la squadra e scegliere il capitano giusto
          può fare la differenza tra vincere o perdere.
        </p>
      </section>

      <section>
        <h2 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary mb-3">
          <i className="bi bi-people-fill me-1" aria-hidden></i> Composizione
          della Squadra
        </h2>
        <p className="opacity-80 lg:text-2xl sm:text-xl text-xl mb-4">
          <strong>Budget iniziale:</strong> Ogni giocatore riceve un budget
          virtuale limitato per acquistare professori. La scelta deve essere
          strategica, bilanciando qualità e prezzo per massimizzare i punti
          della squadra.
        </p>
        <p className="opacity-80 lg:text-2xl sm:text-xl text-xl mb-4">
          <strong>Selezione dei professori:</strong> I docenti possono essere
          acquistati dallo shop virtuale. Ogni docente ha un costo iniziale e il
          suo valore può variare in base alle prestazioni durante l’anno.
          Scegliere saggiamente i membri della squadra è essenziale per ottenere
          un punteggio elevato.
        </p>
        <p className="opacity-80 lg:text-2xl sm:text-xl text-xl">
          <strong>Capitano:</strong> Ogni squadra deve nominare un professore
          come capitano. I suoi punti vengono raddoppiati, sia i bonus che i
          malus, rendendo la scelta strategica fondamentale per il successo.
        </p>
      </section>
    </>
  );
}
