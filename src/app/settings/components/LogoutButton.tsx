"use client";

import { client_auth } from "@/lib/firebase-connection";
import Link from "next/link";

export default function LogoutButton() {
  return (
    <Link
      href="/"
      className="not-hover:text-error"
      onClick={async () => {
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
