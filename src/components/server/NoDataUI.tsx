export default function NoDataUI({
  message,
  additionalMessage,
  shrink,
  className,
}: {
  message?: string;
  additionalMessage?: string;
  shrink?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${className ?? ""} flex flex-col ${
        !shrink ? "h-dvh" : "mt-5"
      } justify-center items-center`}
    >
      <i className="size-24" aria-hidden>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle text-error size-full"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </i>
      <div className="flex flex-col gap-0 items-center justify-center">
        <p className="text-lg opacity-70 text-center">
          {message ?? "Nessun dato disponibile"}
        </p>
        {additionalMessage && (
          <span className="text-sm opacity-50">{additionalMessage}</span>
        )}
      </div>
    </div>
  );
}
