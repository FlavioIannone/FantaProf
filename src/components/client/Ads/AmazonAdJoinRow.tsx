"use client";
import { getAmazonAdLink, getRandomAmazonAd } from "@/lib/types";
import Link from "next/link";

export default function AmazonAdJoinRow({
  children,
  className,
}: {
  children: Readonly<React.ReactNode>;
  className?: string;
}) {
  const showAd = process.env.SHOW_AMAZON_ADS;
  if (!showAd) {
    return <div className={className}>{children}</div>;
  }

  const ad = getRandomAmazonAd();

  return (
    <div className={`d-join d-join-vertical ${className}`}>
      {children}
      <Link
        target="_blank"
        href={getAmazonAdLink(ad)}
        className="flex justify-between d-rounded-b-box px-4 py-2 bg-base-200 d-join-item border-0 border-t border-base-300"
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col justify-end gap-1">
            <h2 className="text-sm">{ad.title}</h2>
            <h3 className="opacity-70 text-xs">{ad.description}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
