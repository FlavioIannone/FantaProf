import { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// FAQ JSON-LD
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Come posso modificare i punteggi personalizzati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gli amministratori possono modificare i valori di punteggio di bonus e malus direttamente dalla dashboard di FantaProf, adattandoli al contesto della classe.",
      },
    },
    {
      "@type": "Question",
      name: "È possibile aggiungere nuovi eventi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, gli amministratori possono creare eventi personalizzati positivi o negativi per riflettere situazioni scolastiche reali.",
      },
    },
    {
      "@type": "Question",
      name: "Come funziona l'aggiornamento dello shop dei professori?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gli amministratori possono aggiungere, modificare o rimuovere professori dallo shop in base al rendimento o altri criteri, aggiornando così il catalogo del gioco.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Personalizzazione",
  description:
    "Scopri come funziona la personalizzazione in FantaProf: modifica punteggi, aggiungi eventi e aggiorna lo shop dei professori per adattare il gioco alla tua classe. Adatta il sistema di punteggi, crea eventi realistici e gestisci lo shop dei professori in modo strategico per rendere il gioco più coinvolgente.",
  alternates: {
    canonical: `${siteUrl}/rules/personalization`,
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
    title: "Personalizzazione",
    description:
      "Modifica punteggi, aggiungi eventi e aggiorna lo shop dei professori. Scopri come personalizzare FantaProf per adattarlo alla tua classe!",
    url: `${siteUrl}/rules/personalization`,
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
    title: "Personalizzazione",
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

const sections = [
  {
    title: "Modifica del Valore di Personalizzazione",
    content: `Gli amministratori possono stabilire eventi specifici per i punteggi, ad esempio: 
Assegnare un valore maggiore ai bonus per attività extracurricolari particolarmente rilevanti per la classe. 
Modificare i malus per comportamenti considerati più o meno gravi nel contesto scolastico. 
Questa flessibilità permette di creare un sistema di punteggi strategico e motivante per gli studenti.`,
  },
  {
    title: "Aggiunta di Nuovi Eventi",
    content: `Gli eventi possono essere personalizzati per riflettere situazioni scolastiche reali. 
Ad esempio: Evento positivo: "Il professore organizza una gita scolastica di successo" (+10 punti). 
Evento negativo: "Il professore dimentica di consegnare i compiti corretti" (-5 punti). 
Gli amministratori possono creare e modificare questi eventi direttamente dalla dashboard, rendendo il gioco più dinamico e aderente alla realtà della classe.`,
  },
  {
    title: "Aggiornamento dello Shop",
    content: `Ogni professore nello shop ha un prezzo iniziale che può cambiare nel corso del gioco. 
Gli amministratori possono: aggiungere nuovi professori al catalogo definendo i loro prezzi in base alle performance, 
modificare i prezzi dei professori esistenti per riflettere il loro rendimento o altri fattori, 
rimuovere professori che non fanno più parte della scuola. 
Questo permette di mantenere lo shop sempre aggiornato e interessante per i giocatori.`,
  },
];

export default function PersonalizationRule() {
  return (
    <>
      {/* JSON-LD FAQ */}
      <Script
        id="personalization-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article>
        <header>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary mb-4">
            <i className="bi bi-pencil-square me-2" aria-hidden="true"></i>
            Personalizzazione degli Eventi in FantaProf
          </h1>
          <p className="text-xl opacity-70 mb-8">
            La personalizzazione è uno dei punti di forza di FantaProf. Permette
            agli amministratori di adattare il gioco alle esigenze e alle
            caratteristiche della propria classe, rendendo il sistema più
            coinvolgente e realistico. È possibile modificare punteggi, creare
            eventi e aggiornare lo shop dei professori in base al rendimento e
            al contesto della classe.
          </p>
        </header>

        <section>
          <p className="text-lg opacity-70 mb-6">
            Grazie alla personalizzazione, FantaProf diventa uno strumento
            flessibile che riflette la realtà scolastica. Gli studenti possono
            vedere premiati comportamenti positivi e affrontare sfide
            realistiche, mentre gli amministratori hanno pieno controllo sulla
            dinamica del gioco.
          </p>

          <ul className="space-y-6">
            {sections.map((section, idx) => (
              <li key={idx}>
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  {section.title}
                </h2>
                <p className="text-lg opacity-70">{section.content}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10">
          <p className="text-gray-600 text-sm">
            Questo sistema di personalizzazione permette di rendere FantaProf
            unico per ogni classe, stimolando la strategia e la partecipazione
            attiva degli studenti.
          </p>
        </footer>
      </article>
    </>
  );
}
