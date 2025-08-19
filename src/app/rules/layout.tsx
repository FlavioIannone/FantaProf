import RulesPageNavigator from "@/app/rules/components/RulesPageNavigator";
import Footer from "@/components/server/Footer";
import Navbar from "@/components/server/Navbar";
import ReturnToHome from "@/components/server/BackToPathArrow";
import { ReactNode } from "react";
import BackToPathArrow from "@/components/server/BackToPathArrow";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Regole FantaProf", template: "%s | Regole FantaProf" },
  description: "Scopri le regole di FantaProf!",
  alternates: {
    canonical: new URL("/rules/team-creation", siteUrl),
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
    title: "Regole FantaProf",
    description: "Scopri le regole di FantaProf!",
    url: new URL("/rules/team-creation", siteUrl),
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
    card: "summary_large_image",
    title: "FantaProf - Sfida i tuoi amici con i tuoi professori!",
    description: "Scopri le regole di FantaProf!",
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
    nocache: false,
    noarchive: false,
  },
};

export default function RulesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar
        className="lg:px-20 md:px-15 sm:px-10 px-5"
        showReturnToHome
        showDrawerButton
        hideLogoOnSmallBrP
      />
      <div className="d-drawer">
        <input
          id="rules-drawer"
          type="checkbox"
          className="d-drawer-toggle"
          tabIndex={-1}
          aria-hidden
        />
        <div className="d-drawer-content flex flex-col">
          <div className="lg:px-30 md:px-20 px-1.5 lg:py-10 md:py-5 s:py-4 py-3 min-h-dvh flex">
            <aside className="h-full sm:me-5 m-0  sm:block hidden relative">
              <div className="fixed">
                <h1 className="text-4xl text-primary mb-2.5 motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in">
                  Sezioni
                </h1>
                <RulesPageNavigator />
              </div>
              {/**Invisible aside to make it occupy the right amount of space while having the real aside fixed */}
              <div className="invisible" aria-hidden>
                <h1 className="text-4xl text-primary mb-2.5 motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in">
                  Sezioni
                </h1>
                <RulesPageNavigator />
              </div>
            </aside>
            <main className="w-full sm:p-0 px-5">
              <header>
                <h1 className="lg:text-6xl md:text-4xl sm:text-2xl text-3xl text-primary lg:mb-4 md:mb-4 sm:mb-3 mb-2 motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-top">
                  Regolamento di FantaProf
                </h1>
                <h2 className="motion-safe:opacity-0 lg:text-3xl sm:text-2xl text-xl motion-reduce:animate-none animate-fade-in-top animation-delay-100">
                  <p className="opacity-70">
                    Prima di iniziare a giocare, leggi il regolamento
                  </p>
                </h2>
              </header>
              <div className="d-divider lg:my-9 md:my-8 sm:my-7 my-5"></div>
              {children}
            </main>
          </div>
        </div>
        <div className="d-drawer-side z-[999]">
          <label
            htmlFor="rules-drawer"
            aria-label="close sidebar"
            className="d-drawer-overlay"
          ></label>
          <div className="bg-base-200 min-h-full w-80 p-4">
            <div className="flex justify-between items-center">
              <BackToPathArrow text="Home" />
              <label
                className="d-btn d-btn-ghost"
                htmlFor="rules-drawer"
                aria-label="close sidebar"
              >
                <i className="bi bi-x-lg font-bold" aria-hidden></i>
              </label>
            </div>
            <h1 className="text-4xl text-primary mb-2.5">Sezioni</h1>
            <RulesPageNavigator />
          </div>
        </div>
      </div>

      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
