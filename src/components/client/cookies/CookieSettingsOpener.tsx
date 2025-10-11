"use client";
import { useModal } from "../Modal/ModalContext";
import CookieConsentModal from "./CookieConsentModal";

export default function CookieSettingsOpener() {
  const modal = useModal();
  return (
    <button
      onClick={() => {
        modal.setModal(true, {
          title: "Gestione cookie",
          content: <CookieConsentModal alwaysShow />, // il componente Banner interno gestirà i toggle
          confirmButtonText: "Salva",
          closeOnSubmit: true,
        });
      }}
    >
      <p className="d-link font-bold mt-2.5">Apri impostazioni cookie</p>
    </button>
  );
}
