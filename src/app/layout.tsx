import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "FantaProf", template: "%s | FantaProf" },
  description: "Benvenuto in FantaProf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-theme="" className={`bg-base-100 ${inter.className}`}>
      <body className={`w-full  bg-base-100 m-0 antialiased`}>{children}</body>
    </html>
  );
}
