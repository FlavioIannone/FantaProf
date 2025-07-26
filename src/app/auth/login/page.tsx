"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { client_auth, logInWithGooglePopup } from "@/lib/firebase-connection";
import {
  signInWithEmailAndPassword,
  AuthError,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  AuthErrorCodes,
} from "firebase/auth";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useUserData } from "@/components/client/UserDataContext";

export default function LoginForm() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setUserData: setUserDataInStorage } = useUserData();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Stato per gestire i dati dell'utente
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Funzione helper per mostrare un errore nel modal
  const showModalError = (
    title: string,
    content: string,
    onClose?: () => void
  ) => {
    setModal(true, {
      title,
      content,
      onClose: onClose,
    });
  };

  // Redirect se già autenticato
  useEffect(() => {
    setIsSubmitLoading(true);
    const unsubscribe = onAuthStateChanged(client_auth, async (user) => {
      if (user) {
        await setPersistence(client_auth, browserLocalPersistence);
        setUserDataInStorage(user);
        setIsSubmitLoading(false);
        router.replace("/dashboard");
      }
    });
    setIsSubmitLoading(false);
    return () => unsubscribe();
  }, [router]);

  // Gestione login con email e password
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      showModalError("Errore", "Compila tutti i campi richiesti.");
      return;
    }
    try {
      setIsSubmitLoading(true);
      await setPersistence(client_auth, browserLocalPersistence);
      const userCredentials = await signInWithEmailAndPassword(
        client_auth,
        loginData.email,
        loginData.password
      );
      setUserDataInStorage(userCredentials.user);
      router.replace("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante l'accesso.";
      if (authError.code === AuthErrorCodes.USER_DELETED) {
        message = "Utente non trovato.";
      } else if (authError.code === AuthErrorCodes.INVALID_PASSWORD) {
        message = "Password errata.";
      } else if (authError.code === AuthErrorCodes.INVALID_EMAIL) {
        message = "Email non valida.";
      }

      showModalError("Errore autenticazione", message);
      setIsSubmitLoading(false);
    }
  };

  // Gestione login con Google
  const onGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await setPersistence(client_auth, browserLocalPersistence);
      const userCredentials = await logInWithGooglePopup();
      console.log("Google login successful", userCredentials.user);
      setUserDataInStorage(userCredentials.user);
      router.replace("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante l'autenticazione con Google.";
      if (authError.code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
        message = "La finestra di autenticazione è stata chiusa.";
      }
      if (authError.code === AuthErrorCodes.POPUP_BLOCKED) {
        message = "La finestra di autenticazione è stata bloccata.";
      }
      showModalError("Errore autenticazione", message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <form
        className="sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4"
        onSubmit={onSubmit}
      >
        <div className="p-5">
          <h1 className="text-primary text-center sm:text-5xl text-4xl motion-safe:opacity-0 animate-fade-in-bottom motion-reduce:animate-none">
            Bentornato
          </h1>
          <h2 className="opacity-60 text-center sm:text-3xl text-2xl animate-fade-in-bottom animation-delay-100 motion-reduce:animate-none">
            Accedi al tuo account
          </h2>
        </div>
        <div className="w-full mb-5 flex flex-col gap-1">
          <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-200 motion-reduce:animate-none">
            <label htmlFor="email" className="d-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              aria-label="Email"
              className="d-input d-validator w-full peer"
              placeholder="esempio@dominio.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
            <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
              Email non valida
            </div>
          </div>

          <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-300 motion-reduce:animate-none">
            <label htmlFor="password" className="d-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              aria-label="Password"
              className="peer d-input d-validator w-full"
              placeholder="Inserisci la tua password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Deve avere almeno 8 caratteri, includere numero, lettera minuscola, lettera maiuscola"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <p className="d-validator-hint h-0 peer-user-invalid:h-auto">
              Deve avere almeno 8 caratteri, includere
              <br />
              Almeno un numero
              <br />
              Almeno una lettera minuscola
              <br />
              Almeno una lettera maiuscola
            </p>
          </div>
        </div>

        <button
          type="submit"
          aria-label="Accedi"
          className={`d-btn d-btn-primary d-btn-block animate-fade-in-bottom text-lg motion-reduce:animate-none ${
            isSubmitLoading
              ? "animate-pulse"
              : "motion-safe:opacity-0 animation-delay-400"
          }`}
          disabled={isSubmitLoading || isGoogleLoading}
        >
          Accedi
        </button>
        <p className="mt-2.5 w-full motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Non hai un account?{" "}
          <Link
            href="/auth/signin"
            className="d-link"
            aria-label="Crea account"
          >
            Crealo qui.
          </Link>
        </p>
        <div className="d-divider sm:my-10 my-6 w-full sm:px-10 motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Oppure accedi con
        </div>
        <button
          type="button"
          aria-label="Accedi con google"
          onClick={onGoogleLogin}
          className={`d-btn d-btn-outline d-btn-block animate-fade-in-bottom motion-reduce:animate-none ${
            isGoogleLoading
              ? "animate-pulse"
              : "motion-safe:opacity-0 animation-delay-600"
          }`}
          disabled={isGoogleLoading || isSubmitLoading}
        >
          <i className="bi bi-google" aria-hidden></i>Accedi con google
        </button>
      </form>
    </>
  );
}
