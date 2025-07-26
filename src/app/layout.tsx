import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "@/components/client/Theme/ThemeContext";
import { ModalProvider } from "@/components/client/Modal/ModalContext";
import React from "react";
import ReactQueryProvider from "@/components/client/ReactQueryProvider";
import { UserDataProvider } from "@/components/client/UserDataContext";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL!),
  title: { default: "FantaProf", template: "%s | FantaProf" },
  description:
    "Scopri FantaProf, la piattaforma per gestire i punti della tua classe e sfidare i tuoi amici. Crea eventi, acquista professori e costruisci il team vincente!",
  alternates: {
    canonical: new URL(process.env.BASE_URL!),
  },
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
      "Scopri FantaProf, la piattaforma per gestire i punti della tua classe. Crea eventi, acquista professori e costruisci il team vincente!",
    url: process.env.BASE_URL!,
    siteName: "FantaProf",
    images: [
      {
        url: "/images/fantaprof-social.png", //TODO: Add the correct image
        width: 1200,
        height: 630,
        alt: "Logo di FantaProf",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FantaProf - Sfida i tuoi amici con i tuoi professori!",
    description:
      "Sfida i tuoi amici con FantaProf, la piattaforma per gestire i punti della tua classe. Acquista professori e vinci!",
    images: ["/images/fantaprof-social.png"], //TODO: Add the correct image
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
      <body className={`w-full overflow-x-hidden bg-base-100 m-0 antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <UserDataProvider>
              <ModalProvider>{children}</ModalProvider>
            </UserDataProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
