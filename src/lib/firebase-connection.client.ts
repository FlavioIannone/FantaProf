import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const client_auth = getAuth(app);
client_auth.useDeviceLanguage(); // Set the auth language to the user's device language
// Initialize Firestore
export const client_firestore = getFirestore(app);

export const initAnalytics = () => {
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
