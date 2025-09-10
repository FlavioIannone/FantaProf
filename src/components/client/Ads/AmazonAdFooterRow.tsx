"use client";
import { getAmazonAdLink, getRandomAmazonAd } from "@/lib/types";
import Link from "next/link";

export default function AmazonAdFooterRow() {
  const ad = getRandomAmazonAd();
  return (
    <Link
      href={getAmazonAdLink(ad)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      <div>
        <p className="font-semibold text-sm">{ad.title}</p>
        <p className="text-xs opacity-70">{ad.description}</p>
      </div>
    </Link>
  );
}
