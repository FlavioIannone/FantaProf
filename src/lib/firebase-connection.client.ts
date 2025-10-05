import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

if (process.env.NEXT_PUBLIC_CLIENT_SDK_KEY === undefined) {
  throw new Error(
    "process.env.NEXT_PUBLIC_CLIENT_SDK_KEY environment variable is not set."
  );
} //* Ensure that the NEXT_PUBLIC_CLIENT_SDK_KEY is set in your environment variables

// Initialize Firebase
const app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT_SDK_KEY));
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
