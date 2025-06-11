import { sign } from "crypto";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa1gxQDYaBObzw711IY9KNnY2h_llDVcw",
  authDomain: "fantaprof-app.firebaseapp.com",
  projectId: "fantaprof-app",
  storageBucket: "fantaprof-app.firebasestorage.app",
  messagingSenderId: "509926920805",
  appId: "1:509926920805:web:eae3304ad019f1cb08ec8c",
  measurementId: "G-41YX2T75WZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage(); // Set the auth language to the user's device language
// Initialize Firestore
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const initAnalytics = () => {
  if (typeof window !== "undefined") {
    // Initialize Firebase Analytics
    const analytics = getAnalytics(app);
    return analytics;
  } else {
    throw new Error(
      "Analytics can only be initialized in the browser environment."
    );
  }
};

export { app, auth, db, initAnalytics, signInWithGooglePopup };
