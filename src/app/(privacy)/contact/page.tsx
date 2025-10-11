import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-5 space-y-6">
      <h1 className="text-4xl font-bold text-primary">Contattaci</h1>
      <p className="text-lg opacity-90">
        Hai domande, suggerimenti o problemi tecnici? Siamo felici di
        ascoltarti.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mt-8">Email</h2>
        <p>
          Scrivici a:{" "}
          <Link href="mailto:w.iannone.flavio@gmail.com" className="d-link">
            w.iannone.flavio@gmail.com
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-8">
          Modulo di contatto (in allestimento)
        </h2>
        <p>
          Qui puoi presto trovare un modulo di contatto diretto. Nel frattempo,
          ti invitiamo a scriverci via email.
        </p>

        <div className="bg-base-200 p-6 rounded-xl mt-6 text-center italic">
          <p>📧 Modulo contatto in arrivo...</p>
        </div>
      </section>

      <p className="text-sm opacity-70 mt-10">
        Ogni feedback è importante per noi e ci appresteremo a rispondere il più
        in fretta possibile.
      </p>
    </main>
  );
}
