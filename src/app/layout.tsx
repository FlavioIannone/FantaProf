import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "@/components/client/Theme/ThemeContext";
import { ModalProvider } from "@/components/client/Modal/ModalContext";
import { UserDataProvider } from "@/components/client/UserDataContext";
import { ToastProvider } from "@/components/client/Toast/ToastContext";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "FantaProf", template: "%s | FantaProf" },
  description:
    "Scopri FantaProf, la piattaforma per gestire i punti della tua classe e sfidare i tuoi amici. Crea eventi, acquista professori e costruisci il team vincente!",
  alternates: {
    canonical: new URL("/", siteUrl),
  },
  authors: [{ name: "FantaProf Team", url: siteUrl }],
  creator: "FantaProf Team",
  publisher: "FantaProf",
  keywords: [
    "fantaprof",
    "fanta prof",
    "fantacalcio",
    "classe",
    "professori",
    "alunni",
    "scuola",
    "gestione punti classe",
    "eventi scolastici",
  ],
  openGraph: {
    title: "FantaProf - Sfida i tuoi amici con i tuoi professori!",
    description:
      "Scopri FantaProf, la piattaforma per gestire i punti della tua classe e sfidare i tuoi amici. Crea eventi, acquista professori e costruisci il team vincente!",
    url: new URL("/", siteUrl),
    siteName: "FantaProf",
    images: [
      {
        url: "/fantaprof_twitter_image.webp",
        width: 3500,
        height: 1300,
        alt: "FantaProf Twitter Image",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    site: "@FantaProf",
    creator: "@FantaProf",
    card: "summary_large_image",
    title: "FantaProf - Sfida i tuoi amici con i tuoi professori!",
    description:
      "Scopri FantaProf, la piattaforma per gestire i punti della tua classe e sfidare i tuoi amici. Crea eventi, acquista professori e costruisci il team vincente!",
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
    nocache: false,
    noarchive: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`bg-base-100 ${inter.className}`}>
      <GoogleTagManager gtmId="GTM-TQTHCTQV" />
      <body
        className={`w-full h-dvh overflow-x-hidden bg-base-100 m-0 antialiased`}
      >
        <ThemeProvider>
          <UserDataProvider>
            <ToastProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
          </UserDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
