"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import PointsBadge from "@/components/server/PointsBadge";
import {
  makeTeacherCaptain,
  removeTeacherFromTeam,
} from "@/lib/data/actions/team.actions";

export default function TeacherTeamTableRow({
  class_id,
  teacherData,
  skeleton,
}: {
  class_id: string;
  teacherData: {
    name: string;
    surname: string;
    points: number;
    deleted: boolean;
    teacher_id: string;
    captain: boolean;
  };
  skeleton?: boolean;
}) {
  const modal = useModal();
  const toast = useToast();

  if (skeleton) {
    return <Skeleton />;
  }

  return (
    <div className="flex justify-between items-center bg-base-200 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="d-indicator d-indicator-bottom d-indicator-center">
          {teacherData.captain && (
            <span className="d-indicator-item d-badge p-0.5 size-6 bg-base-100 rounded-full">
              <i className="bi bi-star" aria-hidden></i>
            </span>
          )}
          <div className="d-avatar size-14 rounded-full">
            <span className="size-full flex items-center justify-center bg-base-300 rounded-full text-2xl">
              {teacherData.name.charAt(0) + teacherData.surname.charAt(0)}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="md:text-2xl text-lg">
            {teacherData.name} {teacherData.surname}
          </h1>
          <div className="flex gap-1">
            <p className="md:text-xl text-md opacity-70">Punti guadagnati:</p>
            <PointsBadge points={teacherData.points} />
          </div>
        </div>
      </div>
      {/* Dropdown */}
      <div className="d-dropdown d-dropdown-end">
        <div tabIndex={0} role="button" className="d-btn d-btn-ghost p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical size-8"
            viewBox="0 0 16 16"
            aria-hidden
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
        {/* Actions */}
        <ul
          tabIndex={0}
          className="d-dropdown-content d-menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {/* Make captain */}
          <li
            className={`${teacherData.captain && "d-menu-disabled}"}`}
            onClick={() => {
              if (teacherData.captain) {
                toast.setToast(true, {
                  content: `Il prof ${teacherData.name} ${teacherData.surname} è già il capitano del team.`,
                  toastType: "info",
                });
                return;
              }
              modal.setModal(true, {
                title: "Far diventare capitano",
                content: `Vuoi far diventare capitano del team il prof ${teacherData.name} ${teacherData.surname}?`,
                closeOnSubmit: false,
                confirmButtonText: "Conferma",
                onConfirm: async () => {
                  const res = await makeTeacherCaptain(
                    class_id,
                    teacherData.teacher_id
                  );
                  modal.setModal(false);
                  if (res.status === 200) {
                    toast.setToast(true, {
                      content: `Il prof ${teacherData.name} ${teacherData.surname} è diventato il capitano dal team.`,
                      toastType: "success",
                    });
                  }
                },
              });
            }}
          >
            <button type="button">
              <i className="bi bi-star" aria-hidden></i>
              Fai capitano
            </button>
          </li>
          {/* Remove */}
          <li
            onClick={() => {
              modal.setModal(true, {
                title: "Rimuovere dal team",
                content: `Rimuovere il prof ${teacherData.name} ${teacherData.surname} dal team?`,
                closeOnSubmit: false,
                confirmButtonText: "Conferma",
                onConfirm: async () => {
                  const res = await removeTeacherFromTeam(
                    class_id,
                    teacherData.teacher_id
                  );
                  modal.setModal(false);
                  if (res.status === 200) {
                    toast.setToast(true, {
                      content: `Il prof ${teacherData.name} ${teacherData.surname} è stato rimosso dal team con successo.`,
                      toastType: "success",
                    });
                  }
                  if (res.status === 400) {
                    toast.setToast(true, {
                      content: `Il prof ${teacherData.name} ${teacherData.surname} non può essere rimosso dal team in quanto è il capitano, nomina un altro professore capitano e riprova.`,
                      toastType: "warning",
                      toastDuration: 8,
                    });
                  }
                },
              });
            }}
          >
            <button type="button" className="text-error">
              <i className="bi bi-trash3" aria-hidden></i>
              Rimuovi
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className="flex justify-between items-center bg-base-200 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="d-indicator d-indicator-bottom d-indicator-center">
          <div className="d-avatar size-14 rounded-full">
            <span className="size-full flex items-center justify-center bg-base-300 rounded-full text-2xl d-skeleton">
              <p className="invisible">O</p>
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <h1 className="md:text-2xl text-lg">
            <div className="h-6 w-35 d-skeleton"></div>
          </h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-25 d-skeleton"></div>
            <PointsBadge />
          </div>
        </div>
      </div>
    </div>
  );
};
