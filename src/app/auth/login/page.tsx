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
} from "@/lib/authenticationManager";
import { useIdToken } from "@/lib/hooks/useIdToken";

export default function LoginForm() {
  const router = useRouter();
  const { setModal } = useModal();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = decodeURI(
    searchParams.get("callbackUrl") ?? "/dashboard"
  );
  const reason = decodeURI(searchParams.get("reason") ?? "");
  const redirectFlag = useRef(false);

  // Stato per gestire i dati dell'utente
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const redirectUser = (user: User) => {
    if (redirectFlag.current) return;
    redirectFlag.current = true;

    if (callbackUrl === "/dashboard") router.replace("/dashboard");

    let token: string | undefined = undefined;
    user.getIdToken().then((t) => {
      token = t;

      if (!token) return;
      fetch(callbackUrl, {
        method: "PUT",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 200) router.replace("/dashboard");
        else {
          if (res.status === 404) {
            setModal(true, {
              title: "Errore",
              content: "La classe non esiste",
            });
          } else if (res.status === 409) {
            setModal(true, {
              title: "Errore",
              content: "Fai già parte di questa classe",
            });
          }
        }
      });
    });
  };

  useEffect(() => {
    if (reason === "join-class") {
      setModal(true, {
        title: "Avviso",
        content: "Esegui il login per entrare nella classe",
      });
    }
  }, []);

  // Redirect se già autenticato
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(client_auth, async (user) => {
      setIsSubmitLoading(true);
      if (user) {
        redirectUser(user);
      }
      setIsSubmitLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Gestione login con email e password
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setModal(true, {
        title: "Errore autenticazione",
        content: "Compila tutti i campi",
      });
      return;
    }

    setIsSubmitLoading(true);
    const result = await logInWithLoginData(loginData);

    if (result.successful) {
      redirectUser(result.user);
    } else {
      setModal(true, {
        title: "Errore autenticazione",
        content: result.errorMsg,
      });
    }
    setIsSubmitLoading(false);
  };

  // Gestione login con Google
  const onGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const result = await signInWithGoogle();
    if (result.successful) {
      redirectUser(result.user);
    } else {
      setModal(true, {
        title: "Errore autenticazione",
        content: result.errorMsg,
      });
    }
    setIsGoogleLoading(false);
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
