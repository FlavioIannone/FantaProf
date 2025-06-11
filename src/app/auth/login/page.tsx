"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { auth } from "@/lib/firebase-connection";
import {
  signInWithEmailAndPassword,
  AuthError,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useModal } from "@/components/client/ModalContext";
import { useUserData } from "@/components/client/UserDataContext";

export default function LoginForm() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setUserData } = useUserData();

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
        setUserData(user);
      }
    });
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
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      router.replace("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante l'accesso.";
      if (authError.code === "auth/user-not-found") {
        message = "Utente non trovato.";
      } else if (authError.code === "auth/wrong-password") {
        message = "Password errata.";
      } else if (authError.code === "auth/invalid-email") {
        message = "Email non valida.";
      }
      showModalError("Errore autenticazione", message);
    }
  };

  // Gestione login con Google
  const onGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante l'autenticazione con Google.";
      if (authError.code === "auth/popup-closed-by-user") {
        message = "La finestra di autenticazione è stata chiusa.";
      }
      if (authError.code === "auth/popup-blocked") {
        message = "La finestra di autenticazione è stata bloccata.";
      }
      showModalError("Errore autenticazione", message);
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
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom motion-safe:opacity-0 text-lg animation-delay-400 motion-reduce:animate-none"
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
          className="d-btn d-btn-outline d-btn-block motion-safe:opacity-0 animate-fade-in-bottom animation-delay-600 motion-reduce:animate-none"
        >
          <i className="bi bi-google"></i>Accedi con google
        </button>
      </form>
    </>
  );
}
