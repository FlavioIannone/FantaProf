import { ReactNode } from "react";

export default function ClassesTableSkeleton({
  header,
}: {
  header?: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="py-5">
        {header}
        <div className="space-y-2.5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between d-skeleton rounded-2xl p-4"
            >
              <div className="flex items-center gap-2">
                <div className="d-avatar md:size-18 sm:size-16 size-12 rounded-full bg-base-300 md:p-4 sm:p-2 p-2 invisible">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bank size-full text-base-content"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
                  </svg>
                </div>
                <div className="flex flex-col justify-end invisible">
                  <h1 className="text-2xl">Class_Name</h1>
                  <div className="flex">
                    <h2 className="opacity-70">0 membri</h2>
                    <i className="bi bi-dot" aria-disabled></i>
                    <h2 className="opacity-70">0 crediti</h2>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end invisible">
                <h1 className="font-bold text-2xl">0</h1>
                <h2 className="opacity-70">Punti</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
