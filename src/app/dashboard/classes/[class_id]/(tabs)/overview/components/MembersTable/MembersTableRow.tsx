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
  member?: MemberRowType;
  class_id?: string;
  isAdmin?: boolean;
}) {
  const { userData } = useUserData();
  const modal = useModal();
  const toast = useToast();

  const [memberLoading, setMemberLoading] = useState(false);

  if (!member || !class_id || isAdmin === undefined) {
    return <Skeleton />;
  }

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
        overrideQueue: true,
      });
      return;
    }
    toast.setToast(true, {
      content: "Non è stato possibile cambiare il ruolo dello studente.",
      toastType: "error",
      overrideQueue: true,
    });
  };

  if (memberLoading) {
    return <Skeleton />;
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

const Skeleton = () => {
  return (
    <div className="flex justify-between bg-base-200 rounded-2xl px-4 py-3 d-skeleton">
      <div className="flex items-center gap-2">
        <div className="d-avatar size-14 rounded-full">
          <span className="size-full flex items-center justify-center bg-base-300 rounded-full text-4xl d-skeleton">
            <p className="invisible">O</p>
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="md:text-2xl text-xl d-skeleton w-30 h-6"></h2>
          <h3 className="opacity-70 md:text-lg text-md d-skeleton w-20 h-3"></h3>
        </div>
      </div>
    </div>
  );
};
