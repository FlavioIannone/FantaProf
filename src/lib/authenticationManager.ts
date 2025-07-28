import {
  browserLocalPersistence,
  AuthError,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  AuthErrorCodes,

  User,
} from "firebase/auth";
import { client_auth } from "./firebase-connection";
import { SignInData, LoginData } from "./types";

//* Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email"); // Ensure proper scopes are added
googleProvider.setCustomParameters({
  prompt: "select_account", // Ensures the account selection popup is shown
});

const signInWithGooglePopup = () =>
  signInWithPopup(client_auth, googleProvider);
// const loginWithGoogleRedirect = () =>
//   signInWithRedirect(client_auth, googleProvider);

type AuthenticationFunctionsReturnType =
  | {
    successful: true;
    user: User
  }
  | {
    successful: false;
    errorMsg: string;
  };

export const signInWithGoogle =
  async (): Promise<AuthenticationFunctionsReturnType> => {
    try {
      await client_auth.setPersistence(browserLocalPersistence);
      const userCredentials = await signInWithGooglePopup();
      return {
        successful: true,
        user: userCredentials.user
      };
    } catch (error) {
      const authError = error as AuthError;
      let message = "Errore durante l'autenticazione con Google.";
      if (authError.code === "auth/popup-closed-by-user") {
        message = "La finestra di autenticazione è stata chiusa.";
      }
      if (authError.code === "auth/popup-blocked") {
        message = "La finestra di autenticazione è stata bloccata.";
      }
      return {
        successful: false,
        errorMsg: message,
      };
    }
  };

export const createAccountWithFormData = async (
  formData: SignInData
): Promise<AuthenticationFunctionsReturnType> => {
  try {
    await client_auth.setPersistence(browserLocalPersistence);
    const userCredentials = await createUserWithEmailAndPassword(
      client_auth,
      formData.email!,
      formData.password!
    );
    return {
      successful: true,
      user: userCredentials.user
    };
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
    return {
      successful: false,
      errorMsg: message,
    };
  }
};

export const logInWithLoginData = async (
  loginData: LoginData
): Promise<AuthenticationFunctionsReturnType> => {
  try {
    await client_auth.setPersistence(browserLocalPersistence);
    const userCredentials = await signInWithEmailAndPassword(
      client_auth,
      loginData.email!,
      loginData.password!
    );
    return {
      successful: true,
      user: userCredentials.user
    }
  } catch (error) {
    const authError = error as AuthError;
    let message = "Errore durante l'accesso.";
    if (authError.code === AuthErrorCodes.USER_DELETED) {
      message = "Utente non trovato.";
    } else if (authError.code === AuthErrorCodes.INVALID_PASSWORD) {
      message = "Password errata.";
    } else if (authError.code === AuthErrorCodes.INVALID_EMAIL) {
      message = "Email non valida.";
    }
    return {
      successful: false,
      errorMsg: message,
    };
  }
};
