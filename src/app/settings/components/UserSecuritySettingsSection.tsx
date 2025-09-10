"use client";

import { useUserData } from "@/components/client/UserDataContext";
import UserSecuritySettingsCard from "./UserSecuritySettingsCard";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  User,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useToast } from "@/components/client/Toast/ToastContext";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useRouter } from "next/navigation";
import { AuthenticationWorkflowCodes, handleLogout } from "@/lib/types";
import {
  reauthenticateEmailUser,
  reauthenticateGoogleUser,
} from "@/lib/authentication-manager";
import { client_auth } from "@/lib/firebase-connection.client";
import { useRef, useState } from "react";
import CookieConsentModal from "@/components/client/CookieConsentModal";

export default function UserSecuritySettingsSection() {
  const { userData } = useUserData();
  const toast = useToast();
  const modal = useModal();
  const router = useRouter();
  const changePasswordClicked = useRef(false);
  const changeEmailClicked = useRef(false);
  const verifyEmailClicked = useRef(false);

  const handleReauthentication = async (user: User | undefined) => {
    modal.setIsLoading(false);
    if (!user) return { successful: false };
    toast.setToast(true, {
      content: "Per modificare il campo, riesegui l'autenticazione.",
      toastType: "info",
    });

    const providerId = user.providerData[0]?.providerId;

    if (providerId === "google.com") {
      return await reauthenticateGoogleUser(user);
    } else if (providerId === "password") {
      // Show a modal to ask for the current password
      return new Promise<{ successful: boolean; errorMsg?: string }>(
        (resolve) => {
          modal.setModal(true, {
            title: "Reinserisci la tua password",
            content: (
              <fieldset className="d-fieldset">
                <legend className="d-fieldset-legend">Password attuale</legend>
                <input
                  type="password"
                  className="d-input w-full peer"
                  name="current_password"
                  placeholder="Inserisci la tua password"
                  required
                />
              </fieldset>
            ),
            confirmButtonText: "Conferma",
            closeOnSubmit: false,
            onConfirm: async (formData) => {
              if (!formData) return;
              const password = formData.get("current_password")!.toString();
              const res = await reauthenticateEmailUser(user, password);
              resolve(res);
              modal.setModal(false);
            },
            onClose: () => resolve({ successful: false }),
          });
        }
      );
    }

    return { successful: false };
  };

  const attemptToModifyEmail = async (newEmail: string) => {
    // New email not valid
    if (newEmail === "") {
      toast.setToast(true, {
        content: "L’indirizzo email non è valido.",
        toastType: "warning",
      });
      return;
    }
    // Session expired
    if (!userData) {
      router.replace(
        `/auth/login?reason=${encodeURIComponent(
          AuthenticationWorkflowCodes.sessionExpired
        )}`
      );
      return;
    }

    // You can receive emails only if the address is verified
    if (!userData.emailVerified) {
      toast.setToast(true, {
        content: `Per modificare l’indirizzo email, devi prima confermare quello attuale.`,
        toastType: "warning",
        toastDuration: 8,
      });
      sendEmailVerification(userData);
      return;
    }

    try {
      await verifyBeforeUpdateEmail(userData, newEmail);
      await handleLogout();

      // After email changing, the user must login again
      toast.setToast(true, {
        content: `Email di verifica inviata a ${newEmail}, controlla anche nella sezione spam. Dopo averla verificata, esegui di nuovo il login con la nuova email.`,
        toastType: "info",
        toastDuration: 10,
      });
      router.replace("/auth/login");
    } catch (error: any) {
      const code = error.code;
      let message = "Errore durante la richiesta. Riprova.";

      if (code === "auth/invalid-email") {
        message = "L’indirizzo email non è valido.";
      } else if (code === "auth/requires-recent-login") {
        modal.setModal(false);
        const reauthResult = await handleReauthentication(userData);
        if (!reauthResult.successful) {
          toast.setToast(true, {
            content:
              "Si è verificato un errore durante la procedura di reautenticazione.",
            toastType: "error",
          });
          return;
        } // stop if reauth failed
        // Retry updating email after successful reauth
        await attemptToModifyEmail(newEmail);
        return;
      } else if (code === "auth/email-already-in-use") {
        message = "Questa email è già utilizzata da un altro account.";
      } else if (code === "auth/operation-not-allowed") {
        message = "L’operazione non è permessa.";
      } else if (code === "auth/internal-error") {
        message = "Errore interno. Riprova più tardi.";
      } else if (code === "auth/user-token-expired") {
        router.replace(
          `/auth/login?reason=${AuthenticationWorkflowCodes.sessionExpired}`
        );
        return;
      }

      console.log(error);
      toast.setToast(true, {
        content: message,
        toastType: "error",
      });
    }
  };

  const attempToVerifyEmail = async () => {
    if (!userData) {
      router.replace(
        `/auth/login?reason=${AuthenticationWorkflowCodes.sessionExpired}`
      );
      return;
    }
    if (!userData.email) {
      toast.setToast(true, {
        content: "Nessun indirizzo mail collegato con questo account.",
        toastType: "error",
      });
      return;
    }
    if (userData.emailVerified) {
      toast.setToast(true, {
        content: "Questa email è già stata verificata.",
        toastType: "warning",
      });
      return;
    }
    await sendEmailVerification(userData);
    toast.setToast(true, {
      content: `Email di verifica inviato all'indirizzo ${userData.email}.`,
      toastType: "info",
    });
  };

  const sendResetPasswordEmail = async () => {
    if (!userData) {
      router.replace(
        `/auth/login?reason=${AuthenticationWorkflowCodes.sessionExpired}`
      );
      return;
    }

    if (userData.email === null) {
      toast.setToast(true, {
        content: "Nessun indirizzo email associato a questo account.",
        toastType: "error",
      });
      return;
    }

    if (!userData.emailVerified) {
      toast.setToast(true, {
        content:
          "Devi verificare il tuo indirizzo email prima di resettare la password.",
        toastType: "error",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(client_auth, userData.email, {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL ?? "localhost:3000"
        }/auth/login`, // dove reindirizzare dopo il reset
        handleCodeInApp: false,
      });

      toast.setToast(true, {
        content: `Email di reset inviata a ${userData.email}. Controlla anche la cartella spam.`,
        toastType: "info",
        toastDuration: 10,
      });
      const logoutRes = await handleLogout();
      if (logoutRes) {
        router.replace("/auth/login");
        return;
      }
      toast.setToast(true, {
        content: `Si è verificato un errore.`,
        toastType: "error",
      });
    } catch (error: any) {
      console.log(error);
      let message = "Errore durante l'invio dell'email. Riprova.";

      if (error.code === "auth/user-not-found") {
        message = "Nessun account trovato con questa email.";
      } else if (error.code === "auth/invalid-email") {
        message = "L'indirizzo email non è valido.";
      }

      toast.setToast(true, {
        content: message,
        toastType: "error",
      });
    }
  };

  return (
    <div className="sm:px-5 pb-3 settings-card">
      <h1 className="text-lg font-medium opacity-70 mb-2">
        PRIVACY e SICUREZZA
      </h1>
      <div className="flex flex-col gap-2">
        {/* Password */}
        <UserSecuritySettingsCard
          onClick={async () => {
            modal.setModal(true, {
              content: "Ti verrà inviata un'email per resettare la password.",
              title: "Confermi di voler modificare la password?",
              onConfirm: async () => {
                if (changePasswordClicked.current) {
                  return;
                }
                changePasswordClicked.current = true;
                await sendResetPasswordEmail();
                changePasswordClicked.current = false;
              },
              confirmButtonText: "Modifica",
            });
          }}
          title="Cambia password"
          description="Modifica la tua password"
        >
          <div className="bg-orange-500/20 rounded-full p-1.5 size-12 flex justify-center items-center">
            <i
              className="bi bi-shield text-orange-500 text-2xl"
              aria-hidden
            ></i>
          </div>
        </UserSecuritySettingsCard>

        <div className="d-divider opacity-40"></div>

        {/* Email */}
        <UserSecuritySettingsCard
          onClick={() => {
            modal.setModal(true, {
              content: <ChangeEmailModal />,
              title: "Inserisci la nuova email",
              onConfirm: async (formData) => {
                if (changeEmailClicked.current) {
                  return;
                }
                changeEmailClicked.current = true;
                if (!formData) return;
                const newEmail = formData.get("new_email")!.toString().trim();
                await attemptToModifyEmail(newEmail);
                changeEmailClicked.current = false;
              },
              confirmButtonText: "Modifica",
            });
          }}
          title="Cambia email"
          description="Modifica la tua email"
        >
          <div className="bg-indigo-500/20 rounded-full p-1.5 size-12 flex justify-center items-center">
            <i
              className="bi bi-person text-indigo-500 text-3xl"
              aria-hidden
            ></i>
          </div>
        </UserSecuritySettingsCard>

        <div className="d-divider opacity-40"></div>

        {/* Verification */}
        <UserSecuritySettingsCard
          onClick={() => {
            if (!userData) {
              router.replace(
                `/auth/login?reason=${AuthenticationWorkflowCodes.sessionExpired}`
              );
              return;
            }
            if (!userData.email) {
              toast.setToast(true, {
                content: "Nessun indirizzo mail collegato con questo account.",
                toastType: "error",
              });
              return;
            }
            modal.setModal(true, {
              title: "Procedura di verifica indirizzo mail",
              content: `Desideri verificare l'indirizzo mail ${userData.email}?`,
              confirmButtonText: "Conferma",
              onConfirm: async () => {
                if (verifyEmailClicked.current) {
                  return;
                }
                verifyEmailClicked.current = true;
                await attempToVerifyEmail();
                verifyEmailClicked.current = false;
              },
            });
          }}
          title="Verifica email"
          description="Richiedi la verifica dell'indirizzo mail"
        >
          <div className="bg-teal-500/20 rounded-full p-1.5 size-12 min-h-12 min-w-12 flex justify-center items-center d-btn-circle">
            <i
              className="bi bi-envelope-check text-teal-500 text-2xl"
              aria-hidden
            ></i>
          </div>
        </UserSecuritySettingsCard>

        <div className="d-divider opacity-40"></div>

        <UserSecuritySettingsCard
          title="Consensi"
          description="Modifica i consensi dei cookie"
          onClick={() => {
            modal.setModal(true, {
              title: "Gestione cookie",
              content: <CookieConsentModal alwaysShow defaultChecked={false} />, // il componente Banner interno gestirà i toggle
              confirmButtonText: "Salva",
              closeOnSubmit: true,
              onConfirm: (formData) => {
                if (!formData) return;

                const affiliateCookie = formData.get("affiliate_cookie");
                const consentValue =
                  affiliateCookie === "on" || affiliateCookie === "true";

                localStorage.setItem(
                  "affiliateConsent",
                  consentValue ? "true" : "false"
                );

                // Qui puoi attivare eventuali script Amazon se consentValue === true
              },
            });
          }}
        >
          <div className="bg-blue-500/20 rounded-full p-1.5 size-12 min-h-12 min-w-12 flex justify-center items-center d-btn-circle">
            <i
              className="bi bi-check-circle text-blue-500 text-2xl"
              aria-hidden
            ></i>
          </div>
        </UserSecuritySettingsCard>
      </div>
    </div>
  );
}

const ChangeEmailModal = () => {
  return (
    <>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Nuova email</legend>
        <input
          type="email"
          className="d-input w-full peer d-validator"
          placeholder="Es. sium@example.com"
          name="new_email"
          required
        />
        <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
          Email non valida
        </div>
      </fieldset>
    </>
  );
};
const ChangePasswordModal = () => {
  return (
    <>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Vecchia password</legend>
        <input
          type="password"
          className="d-input w-full peer d-validator"
          placeholder="Inserisci la vecchia password"
          name="old_password"
          required
        />
        <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
          Password non valida
        </div>
      </fieldset>

      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Nuova password</legend>
        <input type="password" required />
        <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
          Password non valida
        </div>
      </fieldset>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Nuova password</legend>
        <input
          type="password"
          className="d-input w-full peer d-validator"
          placeholder="Inserisci la nuova password"
          name="new_password"
          required
        />
        <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
          Password non valida
        </div>
      </fieldset>
    </>
  );
};
