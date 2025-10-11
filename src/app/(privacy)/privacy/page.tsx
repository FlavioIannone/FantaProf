// app/privacy/page.tsx
import Footer from "@/components/server/Footer";
import Navbar from "@/components/server/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FantaProf",
  description:
    "Scopri come FantaProf raccoglie, utilizza e protegge i dati degli utenti. Privacy e GDPR spiegati in modo chiaro.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-base-100 py-12 px-4 sm:px-6 lg:px-12">
        <div className="bg-base-200 shadow-md rounded-xl p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Privacy Policy di FantaProf
          </h1>

          <p className="mb-6 text-base-content leading-relaxed opacity-70">
            La tua privacy è{" "}
            <strong className="font-bold opacity-100">importante</strong> per
            noi. Questa pagina spiega{" "}
            <strong className="font-bold opacity-100">
              quali dati raccogliamo, come li utilizziamo e come puoi gestirli
            </strong>
            . FantaProf rispetta la normativa europea{" "}
            <strong className="font-bold opacity-100">GDPR</strong> e altre
            leggi sulla privacy.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              1. Dati che raccogliamo
            </h2>
            <ul className="list-disc list-inside text-base-content opacity-70 leading-relaxed space-y-1">
              <li>Informazioni di account: nome utente, email, ID account.</li>
              <li>
                Punteggi e attività nel gioco (bonus/malus, team, classi).
              </li>
              <li>
                Dati tecnici (atti al corretto funzionamento del sito):
                indirizzo IP, browser, dispositivo, log di accesso.
              </li>
              <li>
                Cookie e tecnologie simili per pubblicità e analisi (AdSense,
                Google Analytics).
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              2. Finalità del trattamento
            </h2>
            <ul className="list-disc list-inside text-base-content opacity-70 leading-relaxed space-y-1">
              <li>Gestire il gioco e la classifica dei professori.</li>
              <li>Fornire annunci pubblicitari pertinenti (con consenso).</li>
              <li>Analizzare il traffico e migliorare il sito.</li>
              <li>Comunicazioni amministrative e supporto agli utenti.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              3. Base legale
            </h2>
            <ul className="list-disc list-inside text-base-content opacity-70 leading-relaxed space-y-1">
              <li>
                Consenso dell’utente (per cookie non tecnici e pubblicità
                personalizzata).
              </li>
              <li>
                Contratto con l’utente (uso del gioco e partecipazione alle
                classi).
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              4. Cookie e pubblicità
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              Utilizziamo cookie per migliorare la tua esperienza e mostrare
              pubblicità tramite Google AdSense. Puoi gestire il consenso ai
              cookie per banner pubblicitari personalizzati attraverso il banner
              all’apertura della pagina.
            </p>
            <p className="text-base-content leading-relaxed opacity-70">
              Gli annunci AdSense potrebbero essere personalizzati in base alle
              tue preferenze, solo se hai dato il consenso.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              5. Conservazione dei dati
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              I dati degli utenti vengono conservati solo per il tempo
              necessario a fornire i servizi del gioco e rispettare obblighi
              legali. I dati anonimi per analisi possono essere conservati più a
              lungo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              6. Diritti dell’utente
            </h2>
            <ul className="list-disc list-inside text-base-content opacity-70 leading-relaxed space-y-1">
              <li>Accedere ai propri dati personali.</li>
              <li>Chiedere rettifica o cancellazione dei dati.</li>
              <li>Limitare o opporsi al trattamento dei dati.</li>
              <li>Revocare il consenso in qualsiasi momento.</li>
              <li>Richiedere portabilità dei dati.</li>
            </ul>
            <p className="text-base-content leading-relaxed mt-2 opacity-70">
              Per esercitare i tuoi diritti contattaci via email:{" "}
              <strong>w.iannone.flavio@gmail.com</strong>
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              7. Minori
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              Il sito è destinato principalmente a studenti. Non raccogliamo
              dati personali di minori senza consenso dei genitori o tutori.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              8. Sicurezza
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              Adottiamo misure tecniche e organizzative per proteggere i dati
              degli utenti da accessi non autorizzati, perdite o modifiche.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              9. Modifiche alla Privacy Policy
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              Questa policy può essere aggiornata nel tempo. La versione
              aggiornata sarà pubblicata su questa pagina con la data di
              revisione.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl text-base-content mb-3 font-bold">
              10. Contatti
            </h2>
            <p className="text-base-content leading-relaxed opacity-70">
              Per domande o reclami sulla privacy:{" "}
              <strong>w.iannone.flavio@gmail.com</strong>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
