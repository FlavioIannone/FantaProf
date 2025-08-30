"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
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

  const PointsBadge = ({ points }: { points: number }) => {
    const negative = points < 0;
    return (
      <span
        className={`d-badge ${
          negative
            ? "d-badge bg-error/40 text-red-700"
            : "d-badge bg-success/40 text-green-700"
        }`}
      >
        {negative ? "-" : "+"}
        {Math.abs(points)}
        pts
      </span>
    );
  };
  return (
    <div
      className={`flex justify-between items-center bg-base-200 rounded-2xl px-4 py-3 ${
        skeleton && "d-skeleton"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="d-indicator d-indicator-bottom d-indicator-center">
          {teacherData.captain && (
            <span className="d-indicator-item d-badge p-0.5 size-6 bg-base-100 rounded-full">
              <i className="bi bi-star" aria-hidden></i>
            </span>
          )}
          <div className="d-avatar size-14 rounded-full">
            <span
              className={`size-full flex items-center justify-center bg-base-300 rounded-full text-2xl ${
                skeleton && "invisible"
              }`}
            >
              {teacherData.name.charAt(0) + teacherData.surname.charAt(0)}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className={`md:text-2xl text-lg ${skeleton && "invisible"}`}>
            {teacherData.name} {teacherData.surname}
          </h1>
          <div className={`flex gap-1 ${skeleton && "invisible"}`}>
            <p className="md:text-xl text-md opacity-70">Punti guadagnati:</p>
            <PointsBadge points={teacherData.points} />
          </div>
        </div>
      </div>
      {!skeleton && (
        <>
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
                onClick={() => {
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
        </>
      )}
    </div>
  );
}
