import { Metadata } from "next";
import Script from "next/script";
import FAQItem from "../components/FAQItem";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Creazione del Team",
  description:
    "Scopri come creare il tuo team di professori su FantaProf. Guida completa su budget, selezione dei docenti, capitano e strategie vincenti.",
  keywords: [
    "FantaProf",
    "regole FantaProf",
    "creazione team",
    "come creare squadra FantaProf",
    "fantasy school game",
    "capitano FantaProf",
    "gioco professori",
    "strategie FantaProf",
  ],
  alternates: {
    canonical: `${siteUrl}/rules/team-creation`,
  },
  openGraph: {
    title: "Creazione del Team | Regole FantaProf",
    description:
      "Guida dettagliata per creare il tuo team di professori su FantaProf e ottimizzare la tua strategia di gioco.",
    url: `${siteUrl}/rules/team-creation`,
    siteName: "FantaProf",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Regole - Creazione Team",
      },
    ],
    locale: "it_IT",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creazione del Team | Regole FantaProf",
    description:
      "Impara a creare la tua squadra di professori in FantaProf: consigli pratici, regole e strategie.",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        alt: "FantaProf Team Creation",
      },
    ],
  },
};

const faqList = [
  {
    question: "Come funziona la creazione del team in FantaProf?",
    answer:
      "Ogni giocatore riceve un budget iniziale per acquistare professori. L'obiettivo è formare la squadra migliore bilanciando costo e rendimento.",
  },
  {
    question: "Posso cambiare i professori dopo averli scelti?",
    answer:
      "Sì, ma solo durante il periodo di mercato aperto. Durante il gioco, le modifiche non sono permesse.",
  },
  {
    question: "Cosa succede se scelgo un professore come capitano?",
    answer:
      "Il capitano riceve il doppio dei punti (bonus e malus). È quindi fondamentale scegliere con attenzione.",
  },
  {
    question: "Come viene calcolato il valore dei professori?",
    answer:
      "Il prezzo dei professori può variare nel tempo in base ai punteggi ottenuti e alla domanda nel mercato.",
  },
  {
    question: "Cosa succede se un professore viene rimosso dal gioco?",
    answer:
      "Il suo punteggio resta valido e viene inserito in una lista di professori non più attivi. I crediti non vengono rimborsati.",
  },
  {
    question: "È possibile avere più squadre?",
    answer:
      "No, ogni utente può creare una sola squadra per classe. Tuttavia, è possibile partecipare a più classi contemporaneamente.",
  },
];

const jsonLd = {
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

export default function TeamCreationRule() {
  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <Script
        id="ld-json-team-creation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* INTRODUZIONE */}
      <section className="mb-12">
        <h1 className="text-primary lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold mb-4">
          <i className="bi bi-people-fill me-2" aria-hidden></i> Creazione del
          Team
        </h1>
        <p className="opacity-80 lg:text-2xl sm:text-xl text-lg mb-6">
          La creazione del team è il cuore del gioco <strong>FantaProf</strong>.
          Ogni studente deve formare una squadra di professori scegliendo con
          attenzione chi inserire in base al budget disponibile e alle
          caratteristiche di ciascun docente. Una buona pianificazione è la
          chiave per il successo.
        </p>
        <img
          src="/rules_media/team-creation/FantaProf-TeamCreation.gif"
          alt="Illustrazione creazione team"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </section>

      {/* BUDGET */}
      <section className="mb-12">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-3">
          <i className="bi bi-wallet2 me-2" aria-hidden></i> Budget iniziale
        </h2>
        <p className="opacity-80 lg:text-xl sm:text-lg text-base mb-4">
          Ogni giocatore riceve un <strong>budget virtuale</strong> da spendere
          per acquistare professori dallo shop. Il budget varia in base alle
          impostazioni della classe, e una gestione oculata può determinare il
          vantaggio competitivo durante la stagione.
        </p>
        <img
          src="/rules_media/team-creation/FantaProf-ShowCredits.gif"
          alt="Gestione budget FantaProf"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </section>

      {/* SELEZIONE PROFESSORI */}
      <section className="mb-12">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-3">
          <i className="bi bi-person-lines-fill me-2" aria-hidden></i> Selezione
          dei professori
        </h2>
        <p className="opacity-80 lg:text-xl sm:text-lg text-base mb-4">
          I professori disponibili sono visibili nello <strong>shop</strong>.
          Ogni docente ha un prezzo e un punteggio basato sulle sue prestazioni.
          Durante l’anno scolastico, il loro valore può aumentare o diminuire in
          base ai risultati ottenuti negli eventi.
        </p>
        <ul className="list-disc list-inside lg:text-xl sm:text-lg text-base opacity-80 space-y-2 mb-6">
          <li>Puoi acquistare i professori fino a esaurimento del budget.</li>
          <li>
            Una volta chiuso il mercato, le modifiche non saranno più
            consentite.
          </li>
          <li>
            Alcuni professori potrebbero ricevere <strong>bonus</strong> o{" "}
            <strong>malus</strong> speciali in base agli eventi.
          </li>
        </ul>
        <img
          src="/rules_media/team-creation/MarketPage.webp"
          alt="Selezione professori FantaProf"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </section>

      {/* CAPITANO */}
      <section className="mb-12">
        <h2 className="text-primary lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-semibold mb-3">
          <i className="bi bi-star-fill me-2" aria-hidden></i> Il Capitano
        </h2>
        <p className="opacity-80 lg:text-xl sm:text-lg text-base mb-4">
          Ogni squadra deve nominare un <strong>capitano</strong>. Il suo
          punteggio verrà <strong>raddoppiato</strong> in caso di bonus o malus,
          rendendo la scelta strategica cruciale. È consigliabile selezionare un
          docente che abbia dimostrato costanza nelle performance.
        </p>
        <img
          src="/rules_media/team-creation/FantaProf-MakeCaptain.gif"
          alt="Selezione capitano FantaProf"
          className="rounded-2xl shadow-md mx-auto my-6"
          width={800}
          height={400}
        />
      </section>

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

      {/* FAQ */}
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
