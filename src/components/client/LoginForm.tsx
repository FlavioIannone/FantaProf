"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const navigate = useRouter();

  return (
    <>
      <form
        className="sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          navigate.replace("/dashboard");
        }}
      >
        <div className="p-5">
          <h1 className="text-primary text-center sm:text-5xl text-4xl opacity-0 animate-fade-in-bottom motion-reduce:animate-none">
            Bentornato
          </h1>
          <h3 className="opacity-60 text-center sm:text-3xl text-2xl animate-fade-in-bottom animation-delay-100 motion-reduce:animate-none">
            Accedi al tuo account
          </h3>
        </div>
        <div className="w-full mb-5 flex flex-col gap-1">
          <div className="opacity-0 animate-fade-in-bottom animation-delay-200 motion-reduce:animate-none">
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

          <div className="opacity-0 animate-fade-in-bottom animation-delay-300 motion-reduce:animate-none">
            <label htmlFor="password" className="d-label">
              Password
            </label>
            <input
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
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom opacity-0 text-lg animation-delay-400 motion-reduce:animate-none"
        >
          Accedi
        </button>
        <p className="mt-2.5 w-full opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Non hai un account?{" "}
          <Link href="/auth/signin" className="d-link text-primary">
            Crealo qui.
          </Link>
        </p>
        <div className="d-divider sm:my-10 my-6 w-full sm:px-10 opacity-0 animate-fade-in animation-delay-500 motion-reduce:animate-none">
          Oppure accedi con
        </div>
        <button
          type="button"
          className="d-btn d-btn-outline d-btn-block opacity-0 animate-fade-in-bottom animation-delay-600 motion-reduce:animate-none"
        >
          <i className="bi bi-google"></i>Accedi con google
        </button>
      </form>
    </>
  );
}
