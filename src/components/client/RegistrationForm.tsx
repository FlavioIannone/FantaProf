"use client";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <form className=" sm:w-lg w-full sm:h-max h-full sm:block flex flex-col items-center justify-center sm:p-4">
        <div className="p-5">
          <h1 className="text-primary text-center sm:text-5xl text-4xl opacity-0 animate-fade-in-bottom">
            Benvenuto
          </h1>
          <h3 className="opacity-60 text-center sm:text-3xl text-2xl animate-fade-in-bottom animation-delay-100">
            Crea un nuovo account
          </h3>
        </div>
        <div className="w-full mb-5 flex flex-col gap-1">
          <div className="opacity-0 animate-fade-in-bottom animation-delay-200">
            <label htmlFor="text" className="d-label">
              Nome utente
            </label>
            <input
              id="email"
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
          <div className="opacity-0 animate-fade-in-bottom animation-delay-300">
            <label htmlFor="email" className="d-label">
              Email
            </label>
            <input
              id="email"
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

          <div className="opacity-0 animate-fade-in-bottom animation-delay-400">
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
              At least one numero
              <br />
              At least one lettera minuscola
              <br />
              At least one lettera maiuscola
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="d-btn d-btn-primary d-btn-block animate-fade-in-bottom opacity-0 text-lg animation-delay-500"
        >
          Registrati
        </button>
        <p className="text-end mt-2.5 opacity-0 animate-fade-in animation-delay-500">
          Hai già un account?{" "}
          <Link href="/auth/login" className="d-link text-primary">
            Accedi qui.
          </Link>
        </p>
        <div className="d-divider sm:my-10 my-6 w-full sm:px-10 opacity-0 animate-fade-in animation-delay-500">
          Oppure registrati con
        </div>
        <button
          type="button"
          className="d-btn d-btn-outline d-btn-block opacity-0 animate-fade-in-bottom animation-delay-700"
        >
          <i className="bi bi-google"></i>Registrati con google
        </button>
      </form>
    </>
  );
}
