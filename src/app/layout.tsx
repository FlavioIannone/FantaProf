import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "@/components/client/ThemeContext";

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
    <html lang="it" className={`bg-base-100 ${inter.className}`}>
      <body className={`w-full overflow-x-hidden bg-base-100 m-0 antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
