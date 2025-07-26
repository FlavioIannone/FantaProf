"use client";
import Link from "next/link";
import { type SignInData } from "@/lib/types";
import { client_auth } from "@/lib/firebase-connection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useRouter } from "next/navigation";
import {
  createAccountWithFormData,
  signInWithGoogle,
} from "@/lib/authenticationManager";

export default function RegistrationForm() {
  //* Router to redirect
  const router = useRouter();
  //* State to manage user input
  const [formData, setFormData] = useState<SignInData>({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  //* Modal util
  const { setModal } = useModal();

  //* Loading state utils
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  //* Function to show a modal error
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

  useEffect(() => {
    setIsSubmitLoading(true);
    const unsubscribe = onAuthStateChanged(client_auth, async (user) => {
      if (user) {
        router.replace("/dashboard");
      }
    });
    setIsSubmitLoading(false);
    return () => unsubscribe();
  }, []);

  //* Handling the signin by form registration
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      showModalError("Errore", "Compila tutti i campi richiesti.");
      return;
    }
    setIsSubmitLoading(true);

    const result = await createAccountWithFormData(formData);
    if (result.successful) {
      router.replace("/dashboard");
    } else {
      showModalError("Errore autenticazione", result.errorMsg);
    }
    setIsSubmitLoading(false);
  };

  //* Handling the signin by Google Popup registration
  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsGoogleLoading(true);

    const result = await signInWithGoogle();
    if (result.successful) {
      router.replace("/dashboard");
    } else {
      showModalError("Errore autenticazione", result.errorMsg);
    }
    setIsGoogleLoading(false);
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
          className={`d-btn d-btn-primary d-btn-block animate-fade-in-bottom text-lg motion-reduce:animate-none ${
            isSubmitLoading
              ? "animate-pulse"
              : "motion-safe:opacity-0 animation-delay-500"
          }`}
          disabled={isSubmitLoading || isGoogleLoading}
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
          className={`d-btn d-btn-outline d-btn-block animate-fade-in-bottom motion-reduce:animate-none ${
            isGoogleLoading
              ? "animate-pulse"
              : "motion-safe:opacity-0 animation-delay-700"
          }`}
          disabled={isGoogleLoading || isSubmitLoading}
          onClick={onGoogleSignIn}
        >
          <i className="bi bi-google" aria-hidden></i> Registrazione con Google
        </button>
      </form>
    </>
  );
}
