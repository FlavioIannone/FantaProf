"use client";

import { useEffect } from "react";
import { useModal } from "./Modal/ModalContext";
import { readDataFromLocalStorage, writeDataInLocalStorage } from "@/lib/types";

export const affiliateConsent = "affiliateConsent";
export const adsConsent = "adsConsent";

export default function CookieConsentModal({
  alwaysShow,
}: {
  alwaysShow?: boolean;
}) {
  const modal = useModal();

  const updateGoogleConsent = (granted: boolean) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
      });
    }
  };

  useEffect(() => {
    const affiliate = readDataFromLocalStorage(affiliateConsent);
    const ads = readDataFromLocalStorage(adsConsent);

    const hasConsents = affiliate !== null && ads !== null;

    if (!hasConsents || alwaysShow) {
      modal.setModal(true, {
        title: "Gestione cookie",
        content: (
          <Banner
            defaultAffiliate={affiliate === "true"}
            defaultAds={ads === "true"}
          />
        ),
        confirmButtonText: "Salva",
        closeOnSubmit: false,
        canBeClosed: false,
        onConfirm: (formData) => {
          if (!formData) return;

          // Read from form
          const affiliateValue =
            formData.get("affiliate_cookie") === "on" ? "true" : "false";
          const adsValue =
            formData.get("ads_cookie") === "on" ? "true" : "false";

          // Saving in localStorage
          writeDataInLocalStorage(affiliateConsent, affiliateValue);
          writeDataInLocalStorage(adsConsent, adsValue);

          // Google Consent Mode
          if (typeof window !== "undefined" && (window as any).gtag) {
            if (adsValue === "true") {
              updateGoogleConsent(true);
            } else {
              updateGoogleConsent(false);
            }
          }

          modal.setModal(false);
        },
      });
    }
  }, []);

  return null;
}

const Banner = ({
  defaultAffiliate,
  defaultAds,
}: {
  defaultAffiliate: boolean;
  defaultAds: boolean;
}) => {
  return (
    <div className="space-y-4">
      <p>
        Questo sito utilizza cookie tecnici obbligatori per il corretto
        funzionamento della webapp e cookie opzionali per affiliazioni Amazon e
        annunci Google AdSense.
      </p>

      <h2 className="text-2xl font-bold">Preferenze cookie:</h2>

      {/* Amazon Affiliate */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Cookie di affiliazione Amazon</h3>
          <input
            type="checkbox"
            defaultChecked={defaultAffiliate}
            name="affiliate_cookie"
            className="d-toggle d-toggle-primary"
          />
        </div>
        <p className="opacity-70 text-sm">
          Permettono di supportare il progetto tramite link affiliati Amazon.
        </p>
      </div>

      {/* Google AdSense */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Cookie Google Ads (AdSense)</h3>
          <input
            type="checkbox"
            defaultChecked={defaultAds}
            name="ads_cookie"
            className="d-toggle d-toggle-primary"
          />
        </div>
        <p className="opacity-70 text-sm">
          Permettono la visualizzazione di annunci personalizzati tramite Google
          AdSense.
        </p>
      </div>
    </div>
  );
};
