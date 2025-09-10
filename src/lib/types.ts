import { affiliateConsent } from "@/components/client/CookieConsentModal";
import { deleteSession } from "./data/session/session-manager.data-layer";
import { client_auth } from "./firebase-connection.client";

type ErrorStatuses = 400 | 402 | 403 | 404 | 409 | 423 | 500;
type SuccessStatuses = 200;
/**
 * Form data filled by the user on signin
 *  @description This type is used to represent the data that the user fills in the signin form.
 */
export type SignInData = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

/**
 * Form data filled by the user on login
 * @description This type is used to represent the data that the user fills in the login form.
 */
export type LoginData = {
  email: string | undefined;
  password: string | undefined;
};

/**
 * User profile data
 * @description This type is used to represent the user profile data that can be retrieved from Firebase.
 */
export type UserData = {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
};

/**
 * Result type for write operations in Firestore
 * @description Used to indicate whether a write operation was successful or not.
 */
export type WriteOperationResult<T = void> =
  | {
      message: string;
      status: ErrorStatuses;
    }
  | {
      status: SuccessStatuses;
      data?: T;
    };

/**
 * Result type for read operations in Firestore
 * @description Used to indicate whether a read operation was successful or not.
 */
export type ReadOperationResult<T> =
  | {
      message: string;
      status: ErrorStatuses;
    }
  | {
      status: SuccessStatuses;
      data: T;
    };

/**
 * Result type for read operations in Firestore
 * @description Used to indicate whether a read operation was successful or not.
 */
export type TeacherDataInput = {
  name: string;
  surname: string;
  description?: string;
  price: number;
};

export type EventRegistrationRowType = {
  registration_id: string;
  title: string;
  points: number;
  description: string;
  teacher_name: string;
  created_at: Date;
};

export const licenses = [
  {
    name: "questo sito",
    link: "https://github.com/FlavioIannone/FantaProf/blob/main/LICENSE",
  },
  {
    name: "Next.js",
    link: "https://github.com/vercel/next.js/blob/canary/license.md",
  },
  {
    name: "React.js",
    link: "https://github.com/reactjs/react.dev/blob/main/LICENSE-DOCS.md",
  },
  {
    name: "Tailwind.css",
    link: "https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE",
  },
  {
    name: "DaisyUI",
    link: "https://github.com/saadeghi/daisyui/blob/master/LICENSE",
  },
  {
    name: "Bootstrap Icons",
    link: "https://github.com/twbs/bootstrap/blob/main/LICENSE",
  },
];

export class AuthenticationWorkflowCodes {
  static readonly joinClass = "join-class";
  static readonly sessionExpired = "session-expired";
  static readonly reauthenticationNeeded = "reauthentication-needed";
}

export const handleLogout = async () => {
  // Delete the session
  const sessionDeletionRes = await deleteSession();
  try {
    if (sessionDeletionRes) {
      // Sign out from Firebase client
      await client_auth.signOut();
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const writeDataInLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const readDataFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};

export type AmazonAd = {
  tracedLink: string;
  link: string;
  title: string;
  description: string;
};

export const advertisementsList: AmazonAd[] = [
  {
    tracedLink: "https://amzn.to/47BZfXn",
    title: "Inizia la scuola con BIC!",
    description: "Materiale da cancelleria su Amazon",
    link: "https://www.amazon.it/stores/BIC/page/1400BBEE-C6BD-400F-ACD4-638FD10DE712?_encoding=UTF8&store_ref=SB_A10234041PGQ74Y09B3P-A046713328FZZXROYJLHE&pd_rd_plhdr=t&aaxitk=f319d6be7f5bcf47c5a464cdb5301bd3&hsa_cr_id=0&lp_asins=B07D1C3HPF%2CB07LF68GPR%2CB0B354YBRP&lp_query=cancelleria&lp_slot=auto-sparkle-hsa-tetris&aref=H2V1o2eJMa&pd_rd_w=UkRCg&content-id=amzn1.sym.e71092c9-e769-4b03-9bb9-29ffec45440f%3Aamzn1.sym.e71092c9-e769-4b03-9bb9-29ffec45440f&pf_rd_p=e71092c9-e769-4b03-9bb9-29ffec45440f&pf_rd_r=1ZGSQATKXS2DBRCHQXJV&pd_rd_wg=usvOi&pd_rd_r=2832c76e-d42c-401e-818f-78fd262c7777&linkCode=sl2&tag=fantaprof-21&linkId=17dd3fd04b629126e4418d9fccbc24f3&language=it_IT&ref_=cm_sw_r_ud_ast_store_EY8BMH2QM0HZMEGH2TTX",
  },
  {
    tracedLink: "https://amzn.to/4m58u5X",
    title: "Cuffie Bluetooth JBL",
    description:
      "Cuffie bluetooth comode e di qualità per studio e tempo libero",
    link: "https://www.amazon.it/stores/JBL/page/067B2BEA-006B-4648-834A-1831752E0F66?_encoding=UTF8&store_ref=SB_A08908391SD80YJ7FIXZO-A0454442371YMFUFCY6S2&pd_rd_plhdr=t&aaxitk=819cb5ccb23b8f907ffabfde0b231d07&hsa_cr_id=4008966260102&lp_asins=B0DZJ1KXR7%2CB0C662SLZB%2CB0BWVQKSSY&lp_query=cuffie+bluetooth&lp_slot=auto-sparkle-hsa-tetris&pd_rd_w=sL17A&content-id=amzn1.sym.e71092c9-e769-4b03-9bb9-29ffec45440f%3Aamzn1.sym.e71092c9-e769-4b03-9bb9-29ffec45440f&pf_rd_p=e71092c9-e769-4b03-9bb9-29ffec45440f&pf_rd_r=4DS0R3R27E07FD45BCH7&pd_rd_wg=WwpYz&pd_rd_r=d445115d-fb9e-494e-b83c-d195eb1668cf&linkCode=sl2&tag=fantaprof-21&linkId=133cb2209c688790d24055632adfd2cc&language=it_IT&ref_=cm_sw_r_ud_ast_store_HMBK3Q5P8M1QDY2T0SCR",
  },
  {
    tracedLink: "https://amzn.to/4pmuSLc",
    title: "Quaderni",
    description: "Quaderni scolastici di diverse dimensioni",
    link: "https://amzn.eu/d/cZRRCkN",
  },
  {
    tracedLink: "https://amzn.to/3JUpf6E",
    title: "Set di penne colorate",
    description: "Ideale per prendere appunti con stile",
    link: "https://amzn.eu/d/dabrPXL",
  },
  {
    tracedLink: "https://amzn.to/45YQlSH",
    title: "Segnalibri giapponesi",
    description: "Segnalibri decorativi in carta stile giapponese",
    link: "https://amzn.eu/d/4iJk6hl",
  },
  {
    tracedLink: "https://amzn.to/3JU4cB8",
    title: "Zaino scolastico",
    description: "Ampio e resistente, perfetto per libri e laptop",
    link: "https://amzn.eu/d/cOqrsqS",
  },
  {
    tracedLink: "https://amzn.to/46de2Wh",
    title: "Calcolatrice scientifica Casio",
    description: "Indispensabile per matematica e scienze",
    link: "https://amzn.eu/d/fhKGRNp",
  },
  {
    tracedLink: "https://amzn.to/46fJiDS",
    title: "Evidenziatori Stabilo Boss",
    description: "Set di evidenziatori colorati per sottolineare i testi",
    link: "https://amzn.eu/d/0RFihuv",
  },
  {
    tracedLink: "https://amzn.to/4m9ZnRx",
    title: "Planner settimanale",
    description: "Agenda per organizzare lo studio e gli impegni",
    link: "https://amzn.eu/d/7gpvd0B",
  },
  {
    tracedLink: "https://amzn.to/4mcWUWl",
    title: "Chiavetta USB 64GB",
    description: "Utile per salvare e trasportare i file scolastici",
    link: "https://amzn.eu/d/1pG8Rwo",
  },
  {
    tracedLink: "https://amzn.to/3IaCW0H",
    title: "Lampada da scrivania LED Xiaomi",
    description: "Con regolazione della luce, ideale per studiare la sera",
    link: "https://amzn.eu/d/eD3aWNO",
  },
];

export const getRandomAmazonAd = () => {
  const shuffledAds = [...advertisementsList].sort(() => Math.random() - 0.5);

  const index = Math.floor(Math.random() * shuffledAds.length);
  return shuffledAds[index];
};

export const getAmazonAdLink = (ad: AmazonAd) => {
  const consent = readDataFromLocalStorage(affiliateConsent) === "true";

  if (consent) return ad.tracedLink;
  return ad.link;
};
