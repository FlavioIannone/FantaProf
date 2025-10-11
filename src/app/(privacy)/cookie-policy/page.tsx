import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-5 space-y-6">
      <h1 className="text-4xl font-bold text-primary">Cookie Policy</h1>
      <p className="text-lg opacity-90">
        Questa Cookie Policy spiega cosa sono i cookie e come li utilizziamo su
        Fanta Prof.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mt-8">1. Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che vengono memorizzati nel tuo
          dispositivo per migliorare la tua esperienza di navigazione.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-8">
          2. Tipi di cookie utilizzati
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cookie tecnici (necessari al funzionamento del sito)</li>
          <li>Cookie analitici (anonimi e utilizzati per statistiche)</li>
          <li>Cookie di terze parti (Google AdSense, se accettati)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-8">
          3. Gestione del consenso
        </h2>
        <p>
          Puoi modificare in qualsiasi momento le tue preferenze sui cookie dal
          banner di consenso o dalle impostazioni del browser.
        </p>
      </section>

      <p className="text-sm opacity-70 mt-10">
        Ultimo aggiornamento: Ottobre 2025
      </p>
    </main>
  );
}
