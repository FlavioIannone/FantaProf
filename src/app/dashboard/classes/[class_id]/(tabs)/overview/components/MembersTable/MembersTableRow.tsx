"use client";

import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { useUserData } from "@/components/client/UserDataContext";
import { makeUserAdminAction } from "@/lib/data/actions/members.actions";
import { MemberRowType } from "@/lib/data/types.data";
import Image from "next/image";
import { useState } from "react";

export default function MembersTableRow({
  member,
  class_id,
  isAdmin,
}: {
  member: MemberRowType;
  class_id: string;
  isAdmin: boolean;
}) {
  const { userData } = useUserData();
  const modal = useModal();
  const toast = useToast();

  const [memberLoading, setMemberLoading] = useState(false);

  const attemptToMakeAdmin = async () => {
    if (member.admin) {
      toast.setToast(true, {
        content: "Questo studente è gia un admin.",
        toastType: "info",
      });
    }
    const res = await makeUserAdminAction(member.uid, class_id);
    if (res.status === 200) {
      toast.setToast(true, {
        content: "Lo studente ora è un admin.",
        toastType: "success",
      });
      return;
    }
    toast.setToast(true, {
      content: "Non è stato possibile cambiare il ruolo dello studente.",
      toastType: "error",
    });
  };

  if (memberLoading) {
    return (
      <div className="flex justify-between d-skeleton rounded-2xl px-4">
        <div className="flex items-center gap-2">
          <div className="d-avatar md:size-18 sm:size-16 size-12 rounded-full bg-base-300 md:p-4 sm:p-2 p-2 invisible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bank size-full text-base-content"
              viewBox="0 0 16 16"
              aria-hidden
            >
              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
            </svg>
          </div>
          <div className="flex flex-col justify-end invisible">
            <h1 className="text-2xl">Class_Name</h1>
            <div className="flex">
              <h2 className="opacity-70">0 membri</h2>
              <i className="bi bi-dot" aria-hidden></i>
              <h2 className="opacity-70">0 crediti</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end invisible">
          <h1 className="font-bold text-2xl">0</h1>
          <h2 className="opacity-70">Punti</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between bg-base-200 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="d-indicator d-indicator-center d-indicator-bottom">
          {member.admin && (
            <span className="d-indicator-item d-badge p-0.5 size-6 bg-base-100 rounded-full">
              <i className="bi bi-person-gear" aria-hidden></i>
            </span>
          )}
          <div className="d-avatar size-14 rounded-full">
            {member.photo_URL ? (
              /*Image */
              <Image
                src={member.photo_URL}
                priority={false}
                alt="Profile Picture"
                width={96}
                quality={100}
                height={96}
                className={`rounded-full border border-base-content/25`}
                loading="lazy"
              />
            ) : (
              /**Person Icon*/
              <span className="size-full flex items-center justify-center bg-base-300 rounded-full text-4xl">
                {member.display_name.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="md:text-2xl text-xl">
            {member.display_name} {member.email === userData?.email && " (tu)"}
          </h1>
          <h2 className="opacity-70 md:text-lg text-md">
            Crediti: {member.credits}
          </h2>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col justify-between items-end">
          <h1 className="font-bold text-2xl">{member.points}</h1>
          <h2 className="opacity-70">Punti</h2>
        </div>
        {isAdmin && (
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
            <ul
              tabIndex={0}
              className="d-dropdown-content d-menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li
                onClick={() => {
                  modal.setModal(true, {
                    title: "Modificare ruolo?",
                    content: `Vuoi davvero far diventare ${member.display_name} un admin?`,
                    onConfirm: async () => {
                      setMemberLoading(true);
                      await attemptToMakeAdmin();
                      setMemberLoading(false);
                    },
                    confirmButtonText: "Conferma",
                  });
                }}
                className={`${member.admin && "d-menu-disabled"}`}
              >
                <button type="button">
                  <i className="bi bi-person-gear" aria-hidden></i>Fai admin
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
