"use client";

import Link from "next/link";
import { type SignInData } from "@/lib/types";
import { client_auth } from "@/lib/firebase-connection.client";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createAccountWithFormData,
  signInWithGoogle,
} from "@/lib/authentication-manager";
import { createSession } from "@/lib/data/session/session-manager.data-layer";
import { useToast } from "@/components/client/Toast/ToastContext";

export default function RegistrationForm() {
  const router = useRouter();

  const toast = useToast();
  // True when on the server, false when on the client
  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Flag to prevent multiple redirects
  const redirectFlag = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(client_auth, async (user) => {
      setIsLoading(true);
      if (user) {
        await redirectUser(user);
        router.replace("/dashboard");
      }

      setIsPending(false);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const redirectUser = async (user: User) => {
    if (redirectFlag.current) return;
    setIsRedirecting(true);
    redirectFlag.current = true;

    const token = await user.getIdToken();
    if (!token) return;

    await createSession(token);

    router.replace("/dashboard");
    setIsRedirecting(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signInData: SignInData = {
      username: formData.get("username")!.toString().trim(),
      email: formData.get("email")!.toString().trim(),
      password: formData.get("password")!.toString().trim(),
    };
    if (
      signInData.username === "" ||
      signInData.email === "" ||
      signInData.password === ""
    ) {
      toast.setToast(true, {
        content: "Per favore, compila tutti i campi richiesti.",
        toastType: "warning",
      });
      return;
    }

    setIsLoading(true);

    const result = await createAccountWithFormData(signInData);
    if (result.successful) {
      await redirectUser(result.user);
      toast.setToast(true, {
        content: "Ti è stata inviata una mail di verifica per questo account.",
        toastDuration: 10,
        toastType: "info",
      });
    } else {
      toast.setToast(true, {
        content: "Si è verificato un errore durante la registrazione.",
        toastType: "warning",
      });
    }

    setIsLoading(false);
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signInWithGoogle();
    if (result.successful) {
      await redirectUser(result.user);
      toast.setToast(true, {
        content: "Ti è stata inviata una mail di verifica per questo account.",
        toastDuration: 10,
        toastType: "info",
      });
    } else {
      toast.setToast(true, {
        content: "Si è verificato un errore durante la registrazione.",
        toastType: "error",
      });
    }
    setIsLoading(false);
  };

  if (isLoading || isRedirecting) {
    return (
      <main className="flex justify-center items-center size-full">
        <span className="d-loading d-loading-ring d-loading-xl"></span>
      </main>
    );
  }

  return (
    <form
      className="sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4"
      onSubmit={onSubmit}
      method="post"
    >
      <div className="p-5">
        <h1 className="text-primary text-center sm:text-5xl text-4xl motion-safe:opacity-0 animate-fade-in-bottom motion-reduce:animate-none">
          Benvenuto
        </h1>
        <h3 className="opacity-60 text-center sm:text-3xl text-2xl animate-fade-in-bottom animation-delay-100 motion-reduce:animate-none">
          Crea un nuovo account
        </h3>
      </div>

      <div className="w-full mb-5 flex flex-col gap-1">
        <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-200 motion-reduce:animate-none">
          <label htmlFor="username" className="d-label">
            Nome utente
          </label>
          <input
            name="username"
            type="text"
            className="d-input d-validator w-full peer"
            placeholder="Fragolina123"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Inserire un nome utente
          </div>
        </div>

        <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-300 motion-reduce:animate-none">
          <label htmlFor="email" className="d-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="d-input d-validator w-full peer"
            placeholder="esempio@dominio.com"
            required
          />
          <div className="d-validator-hint h-0 peer-user-invalid:h-auto">
            Email non valida
          </div>
        </div>

        <div className="motion-safe:opacity-0 animate-fade-in-bottom animation-delay-400 motion-reduce:animate-none">
          <label htmlFor="password" className="d-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="peer d-input d-validator w-full"
            placeholder="Inserisci la tua password"
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Deve avere almeno 8 caratteri, includere numero, lettera minuscola, lettera maiuscola"
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
        className={`d-btn d-btn-primary d-btn-block animate-fade-in-bottom text-lg motion-reduce:animate-none   ${
          isLoading
            ? "animate-pulse"
            : "motion-safe:opacity-0 animation-delay-500"
        }`}
        disabled={isLoading || isPending}
      >
        Registrati
      </button>

      <p className="mt-2.5 w-full motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
        Hai già un account?{" "}
        <Link href="/auth/login" className="d-link">
          Accedi qui.
        </Link>
      </p>

      <div className="d-divider sm:my-10 my-6 w-full sm:px-10 motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
        Oppure registrati con
      </div>

      <button
        type="button"
        className="d-btn d-btn-outline d-btn-block animate-fade-in-bottom motion-reduce:animate-none  "
        disabled={isLoading || isPending}
        onClick={onGoogleSignIn}
      >
        <i className="bi bi-google" aria-hidden></i> Registrazione con Google
      </button>
    </form>
  );
}
