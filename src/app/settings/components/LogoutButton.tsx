"use client";

import { client_auth } from "@/lib/firebase-connection";
import { getQueryClient, invalidateEveryQuery } from "@/lib/getQueryClient";
import Link from "next/link";

const queryClient = getQueryClient();

export default function LogoutButton() {
  return (
    <Link
      href="/"
      className="not-hover:text-error"
      onClick={async () => {
        await invalidateEveryQuery(queryClient);
        await client_auth.signOut();
      }}
    >
      <button type="button" className="text-xl">
        <i className="bi bi-box-arrow-right me-0.5" aria-hidden></i>
        Logout
      </button>
    </Link>
  );
}
