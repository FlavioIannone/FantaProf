import { Metadata } from "next";
import Script from "next/script";
import FAQItem from "../components/FAQItem";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Personalizzazione",
  description:
    "Scopri come funziona la personalizzazione in FantaProf: modifica punteggi, aggiungi eventi e aggiorna lo shop dei professori per adattare il gioco alla tua classe.",
  keywords: [
    "FantaProf",
    "personalizzazione",
    "regole FantaProf",
    "bonus malus personalizzati",
    "eventi FantaProf",
    "shop professori",
    "personalizzare punteggi",
    "fantasy school game",
  ],
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  alternates: {
    canonical: `${siteUrl}/rules/personalization`,
  },
  openGraph: {
    title: "Personalizzazione | Regole FantaProf",
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
    title: "Personalizzazione | Regole FantaProf",
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

const faqList = [
  {
    question: "Come posso modificare i punteggi personalizzati?",
    answer:
      "Gli amministratori possono modificare i punteggi direttamente dalla dashboard, scegliendo valori che meglio rappresentano il contesto della classe.",
  },
  {
    question: "È possibile aggiungere nuovi eventi?",
    answer:
      "Sì, gli amministratori possono creare eventi personalizzati per riflettere situazioni specifiche della classe.",
  },
  {
    question: "Come funziona l'aggiornamento dello shop?",
    answer:
      "Lo shop può essere aggiornato in qualsiasi momento dagli amministratori: è possibile aggiungere o rimuovere professori e modificare i loro prezzi.",
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

export default function PersonalizationRule() {
  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <Script
        id="personalization-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="space-y-16">
        {/* Introduzione */}
        <section>
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-primary mb-4">
            <i className="bi bi-sliders me-2" aria-hidden="true"></i>
            Personalizzazione in FantaProf
          </h1>
          <p className="text-xl opacity-80 mb-6">
            La <strong>personalizzazione</strong> è una delle funzioni più
            potenti di <strong>FantaProf</strong>. Permette agli amministratori
            di adattare il gioco alle caratteristiche della propria classe,
            rendendolo più realistico e coinvolgente. È possibile modificare
            punteggi, aggiungere eventi e gestire lo shop dei professori per
            creare un’esperienza su misura.
          </p>
          <img
            src="/rules_media/personalization/ClassSettingsPage.webp"
            alt="Panoramica personalizzazione FantaProf"
            className="rounded-2xl shadow-md mx-auto my-6"
            width={800}
            height={400}
          />
        </section>

        {/* Sezione 1 */}
        <section>
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary mb-3">
            <i className="bi bi-graph-up-arrow me-2" aria-hidden="true"></i>
            Modifica del Valore dei Punteggi
          </h2>
          <p className="text-lg opacity-80 mb-4">
            Gli amministratori possono modificare i valori dei{" "}
            <strong>bonus</strong> e dei <strong>malus</strong> per adattarli al
            contesto reale della classe. Ad esempio, si può assegnare un valore
            maggiore ai comportamenti che la classe considera più importanti, o
            ridurre l’impatto di penalità meno rilevanti.
          </p>
          <img
            src="/rules_media/personalization/FantaProf-ChangingTemplatePoints.gif"
            alt="Modifica punteggi personalizzati"
            className="rounded-2xl shadow-md mx-auto my-6"
            width={800}
            height={400}
          />
        </section>

        {/* Sezione 2 */}
        <section>
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary mb-3">
            <i className="bi bi-calendar-event me-2" aria-hidden="true"></i>
            Aggiunta di Nuovi Eventi
          </h2>
          <p className="text-lg opacity-80 mb-4">
            Gli eventi personalizzati permettono di rendere il gioco più
            dinamico. Ad esempio:
          </p>
          <ul className="list-disc list-inside text-lg opacity-80 space-y-2 mb-4">
            <li>
              Evento positivo: “Il professore organizza una gita di successo” —
              <strong> +10 punti</strong>
            </li>
            <li>
              Evento negativo: “Il professore dimentica di correggere i compiti”
              — <strong>-5 punti</strong>
            </li>
          </ul>
          <p className="text-lg opacity-80">
            Tutto questo può essere gestito dalla dashboard di FantaProf, dove
            gli amministratori possono aggiungere o rimuovere eventi con pochi
            clic.
          </p>
          <img
            src="/rules_media/personalization/FantaProf-AddingEvents.gif"
            alt="Gestione eventi FantaProf"
            className="rounded-2xl shadow-md mx-auto my-6"
            width={800}
            height={400}
          />
        </section>

        {/* Sezione 3 */}
        <section>
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-primary mb-3">
            <i className="bi bi-shop me-2" aria-hidden="true"></i>
            Aggiornamento dello Shop dei Professori
          </h2>
          <p className="text-lg opacity-80 mb-4">
            Ogni professore nello shop ha un prezzo che può variare in base alle
            performance. Gli amministratori possono:
          </p>
          <ul className="list-disc list-inside text-lg opacity-80 space-y-2 mb-4">
            <li>
              Aggiungere nuovi professori con un prezzo iniziale personalizzato.
            </li>
            <li>
              Modificare i prezzi dei professori in base al rendimento o
              all’interesse degli studenti.
            </li>
            <li>Rimuovere professori che non fanno più parte della scuola.</li>
          </ul>
          <img
            src="/rules_media/personalization/MarketPage.webp"
            alt="Shop professori personalizzabile"
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
      </article>
    </>
  );
}
