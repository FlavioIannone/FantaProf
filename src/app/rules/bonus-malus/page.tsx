import { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ---------------- Metadata ----------------
export const metadata: Metadata = {
  title: "Bonus e Malus",
  alternates: { canonical: `${siteUrl}/rules/bonus-malus` },
  description: "Scopri come funzionano i bonus e malus in FantaProf.",
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
    description: "Scopri come funzionano i bonus e malus in FantaProf.",
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
    description: "Scopri come funzionano i bonus e malus in FantaProf.",
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

// ---------------- Data ----------------
const bonusItems = [
  { name: "Assenza (variazione orario, buco)", points: 20 },
  { name: "Relax (no spiegazione, ripasso)", points: 15 },
  { name: "Parolaccia (non citazione)", points: 30 },
  { name: "Gergo giovanile", points: 15 },
  { name: "Capriola sulla cattedra", points: 200 },
  { name: "Si sente male in classe", points: 200 },
  { name: "Fa un complimento", points: 10 },
  { name: "Ci porta in gita", points: 50 },
  { name: "Inciampa/cade", points: 20 },
  { name: "Vediamo film/video", points: 15 },
  { name: "Esercitazione antincendio nella sua ora", points: 20 },
];

const malusItems = [
  { name: "Sbaglia nome/cognome", points: -10 },
  { name: "Poco preavviso per verifiche/compiti", points: -15 },
  { name: "Battuta da boomer", points: -15 },
  { name: "Mette una nota", points: -30 },
  { name: "Manca, ma c’è il supplente", points: -10 },
  { name: "Lavoro di gruppo", points: -15 },
  { name: "Catastrofe naturale", points: -100 },
  { name: "Non manda in bagno", points: -15 },
  { name: "Litiga con alunno", points: -50 },
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
  items: typeof bonusItems;
  positive?: boolean;
}) => (
  <div className="mb-7">
    <h2 className="text-xl mb-1">
      <i className={`${icon} me-1`} aria-hidden></i>
      {title}:
    </h2>
    <ul className="list-disc list-inside">
      {items.map((item, i) => (
        <li key={i} className="opacity-80">
          {item.name}:{" "}
          <span
            className={`d-badge ${
              positive ? "d-badge-success" : "d-badge-error"
            }`}
          >
            {positive ? `+${item.points}` : item.points}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// ---------------- Page ----------------
export default function BonusMalusRule() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bonus e Malus FantaProf",
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

  return (
    <>
      <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-primary lg:mb-3 md:mb-3 sm:mb-2 mb-1">
        <i className="bi bi-graph-up-arrow me-1" aria-hidden></i>
        Punteggi: Bonus e Malus
      </h1>

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

      <Script type="application/ld+json" id="bonus-malus-jsonld">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
