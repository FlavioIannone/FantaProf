import admin from "firebase-admin";
import fs from "fs";

if (!process.env.SERVICE_ACCOUNT_KEY) {
  throw new Error("SERVICE_ACCOUNT_KEY is not set in environment variables");
}

const firebaseKeyPath: string = process.env.SERVICE_ACCOUNT_KEY as string;

let app: admin.app.App;

try {
  app = admin.app("FantaProf-v2");
} catch {
  const serviceAccount = JSON.parse(fs.readFileSync(firebaseKeyPath, "utf8"));
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    "FantaProf-v2"
  );
}

const firestore = admin.firestore(app);
const auth = admin.auth(app);
export { admin, firestore, auth };
