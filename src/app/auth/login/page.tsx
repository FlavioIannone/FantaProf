"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";
import { client_auth } from "@/lib/firebase-connection";
import { type LoginData } from "@/lib/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { useModal } from "@/components/client/Modal/ModalContext";
import {
  logInWithLoginData,
  signInWithGoogle,
} from "@/lib/authentication-manager";
import { createSession } from "@/lib/data/session/session-manager.data-layer";
import { joinClassAction } from "@/lib/data/classes.data-layer";

export default function LoginForm() {
  const router = useRouter();
  const { setModal } = useModal();
  // True when on the server, false when on the client
  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const searchParams = useSearchParams();
  const safeDecode = (value: string | null): string => {
    try {
      return decodeURIComponent(value ?? "");
    } catch {
      return "";
    }
  };

  const reason = safeDecode(searchParams.get("reason"));
  // Flag to prevent multiple redirects
  const redirectFlag = useRef(false);

  useEffect(() => {
    if (reason === "join-class") {
      setModal(true, {
        title: "Avviso",
        content: "Esegui il login per entrare nella classe",
      });
    } else if (reason === "session-expired") {
      setModal(true, {
        title: "Sessione scaduta",
        content: "Effettua di nuovo il login per continuare",
      });
    }
  }, []);

  // Redirect se già autenticato
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(client_auth, async (user) => {
      setIsLoading(true);
      if (user) {
        await redirectUser(user);
      }
      setIsPending(false);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const redirectUser = async (user: User) => {
    if (redirectFlag.current) return;
    setIsRedirecting(true);
    redirectFlag.current = true;

    const token = await user.getIdToken();
    if (!token) return;

    await createSession(token);

    if (reason === "join-class") {
      const classId = safeDecode(searchParams.get("class_id"));
      if (classId === "") {
        setModal(true, {
          title: "Errore",
          content: "ID classe non valido",
        });
        return;
      }
      const joinStatus = await joinClassAction(classId);
      if (joinStatus === 404) {
        setModal(true, {
          title: "Errore",
          content: "Classe non trovata",
        });
        return;
      } else if (joinStatus === 409) {
        setModal(true, {
          title: "Errore",
          content: "Sei già iscritto a questa classe",
        });
        return;
      }
    } else {
      router.replace("/dashboard");
    }
    setIsRedirecting(false);
  };

  // Gestione login con email e password
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData: LoginData = {
      email: formData.get("email")!.toString().trim(),
      password: formData.get("password")!.toString().trim(),
    };

    if (loginData.email === "" || loginData.password === "") {
      setModal(true, {
        title: "Errore autenticazione",
        content: "Compila tutti i campi",
      });
      return;
    }

    setIsLoading(true);
    const result = await logInWithLoginData(loginData);

    if (result.successful) {
      await redirectUser(result.user);
    } else {
      setModal(true, {
        title: "Errore autenticazione",
        content: result.errorMsg,
      });
    }
    setIsLoading(false);
  };

  // Gestione login con Google
  const onGoogleLogin = async () => {
    setIsLoading(true);
    const result = await signInWithGoogle();
    if (result.successful) {
      await redirectUser(result.user);
    } else {
      setModal(true, {
        title: "Errore autenticazione",
        content: result.errorMsg,
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
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom text-lg motion-reduce:animate-none"
          disabled={isLoading || isPending}
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
          className="d-btn d-btn-outline d-btn-block animate-fade-in-bottom motion-reduce:animate-none"
          disabled={isLoading || isPending}
        >
          <i className="bi bi-google" aria-hidden></i>Accedi con google
        </button>
      </form>
    </>
  );
}
