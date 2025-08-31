"use client";

import { useRef, useState } from "react";
import { useUserData } from "../../../components/client/UserDataContext";
import Image from "next/image";
import { UserData } from "@/lib/types";
import { updateEmail, updateProfile } from "firebase/auth";

export default function UserProfileSettingsCard() {
  const { userData } = useUserData();
  const [modifyState, setModifyState] = useState<
    "idle" | "modifying" | "updating"
  >("idle");
  const modifiedUserData = useRef<UserData>({});

  if (!userData) {
    return (
      <div className="flex flex-col sm:space-0 space-y-5 justify-between sm:px-5 sm:py-10 py-5 settings-card">
        <div>
          <div className="flex sm:flex-row flex-col gap-1.5">
            {/**Profile picture element */}
            <div className="sm:block flex justify-center">
              <div className="d-avatar [&>div]:overflow-visible! relative lg:size-32 md:size-28 sm:size-24 size-48 me-5">
                {/* Skeleton loader while waiting for userData */}

                <div className="d-skeleton size-full rounded-full"></div>
              </div>
            </div>
            {/**Space */}

            <div className="flex flex-col sm:items-start items-center gap-1">
              <h1 className="text-3xl d-skeleton sm:flex-1 h-auto w-50">
                <p className="invisible">Placeholder</p>
              </h1>
              <h2 className="text-xl opacity-70 d-skeleton sm:flex-1 h-auto w-32">
                <p className="invisible">Placeholder</p>
              </h2>
            </div>
          </div>
        </div>

        <button type="button" className="d-btn d-skeleton"></button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:space-0 space-y-5 justify-between sm:px-5 sm:py-10 py-5 settings-card">
      <div>
        <div className="flex sm:flex-row flex-col gap-1.5">
          {/**Profile picture element */}
          <div className="sm:block flex justify-center">
            <div className="d-avatar [&>div]:overflow-visible! relative lg:size-32 md:size-28 sm:size-24 size-48 me-5">
              <div className="d-indicator">
                {/* TODO: Add logic to change profile picture*/}
                {/* <span className="d-indicator-item">
                  <button
                    type="button"
                    className={`d-btn d-btn-primary p-0.5 h-auto rounded-full`}
                  >
                    <label
                      className="size-[22px] flex justify-center items-center"
                      htmlFor="photoFileField"
                    >
                      <i className="bi bi-pencil" aria-hidden></i>
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      tabIndex={-1}
                      id="photoFileField"
                      onChange={(event) => {
                        console.log(event.target.files?.item(0));
                      }}
                    />
                  </button>
                </span> */}
                {/* Profile Image and fallback*/}
                <>
                  {userData.photoURL ? (
                    /*Image */
                    <Image
                      src={userData.photoURL}
                      priority={true}
                      alt="Profile Picture"
                      width={96}
                      quality={100}
                      height={96}
                      className={`rounded-full border border-base-content/25`}
                    />
                  ) : (
                    /**Person Icon*/
                    <div className="size-full d-avatar rounded-full flex justify-center items-center md:text-6xl sm:text-5xl text-8xl bg-base-200">
                      {userData.displayName?.charAt(0)}
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
          {/**Space */}
          <div
            className={`flex flex-col sm:items-baseline items-center ${
              modifyState === "modifying" && "gap-1.5 mt-3"
            }`}
          >
            <>
              {modifyState === "modifying" ? (
                <input
                  id="settings-username"
                  type="text"
                  className="d-input d-validator w-full"
                  placeholder={userData.displayName ?? "Username non impostato"}
                  defaultValue={userData.displayName ?? ""}
                  onChange={(e) => {
                    modifiedUserData.current.displayName = e.target.value;
                  }}
                />
              ) : (
                <h1 className="lg:text-3xl md:text-2xl sm:text-2xl text-xl">
                  {userData.displayName ?? (
                    <p className="italic">Username non impostato</p>
                  )}
                </h1>
              )}
              <h2 className="lg:text-2xl md:text-xl sm:text-xl text-lg opacity-70">
                {userData.email ?? (
                  <p className="italic">Email non collegata</p>
                )}
              </h2>
            </>
          </div>
        </div>
      </div>
      {/* Space */}
      <button
        type="button"
        className={`d-btn d-btn-primary ${
          modifyState === "modifying" && "d-btn-outline"
        }`}
        disabled={modifyState === "updating"}
        onClick={async () => {
          if (modifyState === "modifying") {
            setModifyState("updating");
            await updateProfile(userData, {
              displayName: modifiedUserData.current.displayName ?? null,
              photoURL: null,
            });

            if (modifiedUserData.current.email) {
              await updateEmail(userData, modifiedUserData.current.email!);
            }
          }
          setModifyState(modifyState === "idle" ? "modifying" : "idle");
        }}
      >
        {modifyState === "modifying" ? (
          <>
            <i className="bi bi-check text-3xl" aria-hidden></i>
            Conferma
          </>
        ) : (
          <>
            <i className="bi bi-pencil" aria-hidden></i>
            Modifica
          </>
        )}
      </button>
    </div>
  );
}
