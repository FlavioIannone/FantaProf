import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "@/components/client/Theme/ThemeContext";
import { ModalProvider } from "@/components/client/Modal/ModalContext";
import { UserDataProvider } from "@/components/client/UserDataContext";
import { ToastProvider } from "@/components/client/Toast/ToastContext";
import Script from "next/script";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TQTHCTQV');`,
          }}
        />
        {/*  End Google Tag Manager  */}

        {/* Script AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5780485830378667"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Consent Mode (default: denied) */}
        <Script id="consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `}
        </Script>
      </head>
      <body
        className={`w-full h-dvh overflow-x-hidden bg-base-100 m-0 antialiased`}
      >
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQTHCTQV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

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
