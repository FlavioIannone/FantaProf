import type { Metadata } from "next";
import LoginForm from "./LoginForm";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Login",
  description:
    "Accedi al tuo account FantaProf per gestire le tue classi e partecipare ai giochi.",
  keywords: [
    "login",
    "FantaProf",
    "accesso account",
    "classi",
    "punti professori",
  ],

  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  openGraph: {
    title: "Login - FantaProf",
    description:
      "Accedi al tuo account FantaProf per gestire le tue classi e partecipare ai giochi.",
    url: "/auth/login",
    siteName: "FantaProf",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Twitter Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - FantaProf",
    description:
      "Accedi al tuo account FantaProf per gestire le tue classi e partecipare ai giochi.",
    site: "@FantaProf",
    creator: "@FantaProf",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Twitter Image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
