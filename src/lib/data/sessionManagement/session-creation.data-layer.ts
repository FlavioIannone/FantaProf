import { client_auth } from "../../firebase-connection";

export async function createSession(): Promise<void> {
    const currentUser = client_auth.currentUser;
    if (!currentUser) throw new Error("Utente non autenticato");

    const idToken = await currentUser.getIdToken();

    const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(body || "Errore durante la creazione della sessione.");
    }
}
