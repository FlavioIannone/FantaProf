"use client";
import { usePathname } from "next/navigation";
import BackToPathArrow from "../BackToPathArrow";
/**
 * A component that renders a back to dashboard link with an arrow.
 *
 * @param matchPattern - The path to match to not show this component.
 * @returns A back to dashboard link with an arrow.

 */
export default function BackToDashboard({
  matchPattern,
  text,
  className,
}: {
  matchPattern: string;
  text?: string;
  className?: string;
}) {
  const pathname = usePathname();
  if (pathname === matchPattern) {
    return null;
  }
  return (
    <BackToPathArrow href="/dashboard" text={text} className={className} />
  );
}
