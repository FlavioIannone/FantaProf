import admin from "firebase-admin";

if (process.env.SERVICE_ACCOUNT_SDK_KEY === undefined) {
  throw new Error(
    "process.env.SERVICE_ACCOUNT_SDK_KEY environment variable is not set."
  );
} //* Ensure that the SERVICE_ACCOUNT_SDK_KEY is set in your environment variables

let app: admin.app.App;

try {
  app = admin.app(process.env.FIREBASE_APP_NAME);
} catch {
  if (process.env.FIREBASE_APP_NAME === undefined) {
    throw new Error("FIREBASE_APP_NAME environment variable is not set.");
  } //* Ensure that the FIREBASE_APP_NAME is set in your environment variables

  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_SDK_KEY);

  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    process.env.FIREBASE_APP_NAME
  );
}

export const admin_firestore = admin.firestore(app);
export const admin_auth = admin.auth(app);
