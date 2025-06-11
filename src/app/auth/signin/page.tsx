"use client";
import Link from "next/link";
import { type FormData } from "@/lib/types";
import { auth, signInWithGooglePopup } from "@/lib/firebase-connection";
import {
  createUserWithEmailAndPassword,
  AuthError,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useModal } from "@/components/client/ModalContext";
import router from "next/router";
import { useUserData } from "@/components/client/UserDataContext";

export default function RegistrationForm() {
  // Stato per gestire i dati dell'utente
  const [formData, setFormData] = useState<FormData>({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { setUserData } = useUserData();
  const { setModal } = useModal();

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

  // Gestione della registrazione tramite form
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      showModalError("Errore", "Compila tutti i campi richiesti.");
      return;
    }

    let userCredentials;
    try {
      userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante la registrazione.";
      if (authError.code === "auth/email-already-in-use") {
        message = "Questa email è già registrata.";
      } else if (authError.code === "auth/invalid-email") {
        message = "L'email inserita non è valida.";
      } else if (authError.code === "auth/weak-password") {
        message = "La password è troppo debole.";
      }
      showModalError("Errore autenticazione", message);
      return;
    }
  };

  // Gestione della registrazione tramite Google con popup
  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let credentials: UserCredential | undefined;
    try {
      credentials = await signInWithGooglePopup();
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
    if (!credentials) {
      showModalError(
        "Errore autenticazione",
        "Errore durante l'autenticazione."
      );
      return;
    }
  };

  return (
    <>
      {/* Form di registrazione */}
      <form
        className="sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4"
        onSubmit={onSubmit}
        method="post"
      >
        {/* Titolo e sottotitolo */}
        <div className="p-5">
          <h1 className="text-primary text-center sm:text-5xl text-4xl motion-safe:opacity-0 animate-fade-in-bottom motion-reduce:animate-none">
            Benvenuto
          </h1>
          <h3 className="opacity-60 text-center sm:text-3xl text-2xl animate-fade-in-bottom animation-delay-100 motion-reduce:animate-none">
            Crea un nuovo account
          </h3>
        </div>
        {/* Campi input */}
        <div className="w-full mb-5 flex flex-col gap-1">
          {/* Campo nome utente */}
          <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-200 motion-reduce:animate-none">
            <label htmlFor="text" className="d-label">
              Nome utente
            </label>
            <input
              name="username"
              type="text"
              aria-label="Nome utente"
              className="d-input d-validator w-full peer"
              placeholder="Fragolina123"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  username: e.target.value,
                });
              }}
              required
            />
            <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
              Inserire un nome utente
            </div>
          </div>
          {/* Campo email */}
          <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-300 motion-reduce:animate-none">
            <label htmlFor="email" className="d-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              aria-label="Email"
              className="d-input d-validator w-full peer"
              placeholder="esempio@dominio.com"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              required
            />
            <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
              Email non valida
            </div>
          </div>
          {/* Campo password */}
          <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-400 motion-reduce:animate-none">
            <label htmlFor="password" className="d-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              aria-label="Password"
              className="peer d-input d-validator w-full"
              placeholder="Inserisci la tua password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Deve avere almeno 8 caratteri, includere numero, lettera minuscola, lettera maiuscola"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
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
        {/* Bottone di invio */}
        <button
          type="submit"
          aria-label="Crea account"
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom motion-safe:opacity-0 text-lg animation-delay-500 motion-reduce:animate-none"
        >
          Registrati
        </button>
        {/* Link per login */}
        <p className="mt-2.5  w-full motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Hai già un account?{" "}
          <Link
            href="/auth/login"
            className="d-link"
            aria-label="Accedi all'account"
          >
            Accedi qui.
          </Link>
        </p>
        {/* Divider e bottone Google */}
        <div className="d-divider sm:my-10 my-6 w-full sm:px-10 motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Oppure registrati con
        </div>
        <button
          type="button"
          aria-label="registrati con google"
          className="d-btn d-btn-outline d-btn-block motion-safe:opacity-0 animate-fade-in-bottom animation-delay-700 motion-reduce:animate-none"
          onClick={onGoogleSignIn}
        >
          <i className="bi bi-google"></i> Registrazione con Google
        </button>
      </form>
    </>
  );
}
