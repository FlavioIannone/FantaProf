"use client";

import { useEffect } from "react";
import { useModal } from "./Modal/ModalContext";
import { readDataFromLocalStorage, writeDataInLocalStorage } from "@/lib/types";

export const affiliateConsent = "affiliateConsent";

export default function CookieConsentModal({
  alwaysShow,
  defaultChecked,
}: {
  alwaysShow?: boolean;
  defaultChecked: boolean;
}) {
  const modal = useModal();

  useEffect(() => {
    // Controlla se l'utente ha già dato consenso
    const consent = readDataFromLocalStorage(affiliateConsent) === "true";

    if (!consent || alwaysShow) {
      // Mostra il modal
      modal.setModal(true, {
        title: "Gestione cookie",
        content: (
          <Banner defaultChecked={defaultChecked ? defaultChecked : consent} />
        ),
        confirmButtonText: "Modifica",
        closeOnSubmit: false,
        canBeClosed: false,
        onConfirm: (formData) => {
          if (!formData) return;
          const affiliateCookie = formData.get("affiliate_cookie");
          const affiliateCookieValue =
            affiliateCookie === "on" || affiliateCookie === "true";

          writeDataInLocalStorage(
            affiliateConsent,
            JSON.stringify(affiliateCookieValue)
          );
          modal.setModal(false);
        },
      });
    }
  }, []);

  return null;
}

const Banner = ({ defaultChecked }: { defaultChecked: boolean }) => {
  return (
    <div className="space-y-2">
      <p>
        Questo sito utilizza cookie tecnici obbligatori per il corretto
        funzionamento della webapp e cookie di affiliazione Amazon per
        supportare il sito. Puoi modificare i consensi nelle impostazioni
      </p>

      <h2 className="text-2xl font-bold">Cookie:</h2>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between">
          <h2 className="text-lg">Cookie di affiliazione: </h2>
          <input
            type="checkbox"
            defaultChecked={defaultChecked}
            name="affiliate_cookie"
            className="d-toggle d-toggle-primary"
          />
        </div>
        <p className="opacity-70 text-sm">
          Puoi accettare i cookie di affiliazione per supportare il progetto o
          rifiutarli.
        </p>
      </div>
    </div>
  );
};
