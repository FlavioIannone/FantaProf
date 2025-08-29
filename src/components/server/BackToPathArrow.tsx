import Link from "next/link";

export default function BackToPathArrow({
  className,
  text,
  textColor,
  href = "/",
  forceStretch = false,
}: Readonly<{
  href?: string;
  className?: string;
  text?: string;
  textColor?: string;
  forceStretch?: boolean;
}>) {
  return (
    <Link
      href={href}
      className={`${className} flex items-center justify-center`}
      aria-label="Torna alla home"
    >
      <div
        className={`group flex ${
          text && "gap-1"
        } p-0 justify-center items-center`}
      >
        <i
          className={`opacity-70 group-hover:opacity-100 bi bi-arrow-left-short text-4xl ${
            textColor ?? ""
          }`}
          aria-hidden
        ></i>
        <p
          className={`opacity-70 text-2xl group-hover:opacity-100 ${
            text && "me-1.5"
          } ${textColor ?? ""} ${!forceStretch && "md:block hidden"}`}
        >
          {text}
        </p>
      </div>
    </Link>
  );
}
