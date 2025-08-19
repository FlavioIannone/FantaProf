import {
  getClassDataAction,
  joinClassAction,
} from "@/lib/data/classes.data-layer";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ class_id: string }>;
}): Promise<Metadata> => {
  const { class_id } = await params;
  const classData = await getClassDataAction(class_id);

  if (!classData) {
    return {
      metadataBase: new URL(siteUrl),
      title: `Classe non trovata`,
      description: `La classe con codice ${class_id} non è stata trovata`,
      alternates: {
        canonical: new URL(`/dashboard/classes/${class_id}/join`, siteUrl),
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
        "unisciti alla classe",
      ],
      openGraph: {
        title: `Classe non trovata`,
        description: `La classe con codice ${class_id} non è stata trovata`,
        url: new URL(`/dashboard/classes/${class_id}/join`, siteUrl),
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
        title: `Classe non trovata`,
        site: "@FantaProf",
        creator: "@FantaProf",
        description: `La classe con codice ${class_id} non è stata trovata`,
        images: [
          {
            url: "/fantaprof_twitter_image.webp",
            width: 3500,
            height: 1300,
            alt: "FantaProf Twitter Image",
          },
        ],
      },
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    title: `Unisciti alla classe ${classData.class_name}`,
    description:
      "Unisciti alla classe ${classData.class_name} in FantaProf per iniziare a giocare con i tuoi professori e sfidare i tuoi amici!",
    alternates: {
      canonical: new URL(`/dashboard/classes/${class_id}/join`, siteUrl),
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
      "unisciti alla classe",
    ],
    openGraph: {
      title: `Unisciti alla classe ${classData.class_name}`,

      description:
        "Unisciti alla classe ${classData.class_name} in FantaProf per iniziare a giocare con i tuoi professori e sfidare i tuoi amici!",
      url: new URL(`/dashboard/classes/${class_id}/join`, siteUrl),
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
      title: `Unisciti alla classe ${classData.class_name}`,
      site: "@FantaProf",
      creator: "@FantaProf",
      description:
        "Unisciti alla classe ${classData.class_name} in FantaProf per iniziare a giocare con i tuoi professori e sfidare i tuoi amici!",
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
      index: false,
      follow: false,
      nocache: true,
      noarchive: true,
    },
  };
};

export default async function JoinClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  await joinClassAction(class_id);

  return (
    <main className="flex justify-center items-center size-full">
      <span className="d-loading d-loading-ring d-loading-xl"></span>
    </main>
  );
}
