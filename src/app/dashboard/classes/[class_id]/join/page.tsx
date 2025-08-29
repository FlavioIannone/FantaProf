import { getClassData } from "@/lib/data/data-layer/classes.data-layer";
import { Metadata } from "next";

import { Class } from "@/lib/db/schema.db";
import { admin_firestore } from "@/lib/db/firebase-connection.server";
import JoinClassComponent from "./components/JoinClassComponent";

export default async function JoinClassPage({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const { class_id } = await params;
  const classRes = getClassData(class_id, ["class_name"]);

  return (
    <main className="flex justify-center items-center size-full">
      <JoinClassComponent class_id={class_id} classData={classRes} />
    </main>
  );
}

export const generateStaticParams = async () => {
  const classesRefs = await admin_firestore.collection(Class.collection).get();

  const docs = classesRefs.docs;
  return docs.map((classSnap) => ({ class_id: classSnap.id }));
};

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ class_id: string }>;
}): Promise<Metadata> => {
  const { class_id } = await params;
  const classRes = await getClassData(class_id);

  if (classRes.status !== 200) {
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
  const className = classRes.data.class_name;
  return {
    metadataBase: new URL(siteUrl),
    title: `Unisciti alla classe ${className}`,
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
      title: `Unisciti alla classe ${className}`,

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
      title: `Unisciti alla classe ${className}`,
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
