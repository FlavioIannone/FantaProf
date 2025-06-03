"use client";
import Link from "next/link";
import { useTheme } from "./ThemeContext";
import { useEffect } from "react";

export default function LoginForm() {
  const { theme } = useTheme();
  useEffect(() => {
    console.log(theme);
  });

  return (
    <>
      <form className=" sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4">
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
            <label htmlFor="text" className="d-label">
              Nome utente
            </label>
            <input
              name="username"
              type="text"
              aria-label="Nome utente"
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
              aria-label="Email"
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
          aria-label="Crea account"
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom motion-safe:opacity-0 text-lg animation-delay-500 motion-reduce:animate-none"
        >
          Registrati
        </button>
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
        <div className="d-divider sm:my-10 my-6 w-full sm:px-10 motion-safe:opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Oppure registrati con
        </div>
        <button
          type="button"
          aria-label="registrati con google"
          className="d-btn d-btn-outline d-btn-block motion-safe:opacity-0 animate-fade-in-bottom animation-delay-700 motion-reduce:animate-none"
        >
          <i className="bi bi-google"></i>Registrati con google
        </button>
      </form>
    </>
  );
}
