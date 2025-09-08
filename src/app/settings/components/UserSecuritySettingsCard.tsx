"use client";

export default function UserSecuritySettingsCard({
  onClick,
  title,
  description,
  children,
}: {
  onClick: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="hover:cursor-pointer" onClick={onClick}>
      <div className="flex justify-between">
        <div className="flex flex-row justify-center items-center gap-2">
          {children}
          <div className="flex flex-col items-start justify-between">
            <h2 className="sm:text-3xl text-2xl font-bold text-start">
              {title}
            </h2>
            <h3 className="opacity-50 text-start">{description}</h3>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <i className="bi bi-chevron-right align-text-bottom" aria-hidden></i>
        </div>
      </div>
    </button>
  );
}
