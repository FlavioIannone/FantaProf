"use client";
import { useModal } from "@/components/client/Modal/ModalContext";
import { useToast } from "@/components/client/Toast/ToastContext";
import { updateClassAction } from "@/lib/data/actions/classes.actions";
import { ClassData } from "@/lib/data/types.data";
import { useEffect, useState } from "react";

export default function ClassDataSettingsCard({
  classData,
  skeleton = false,
}: {
  classData?: ClassData;
  skeleton?: boolean;
}) {
  const [classNameModified, setClassNameModified] = useState(false);
  const [initialCreditsModified, setInitialCreditsModified] = useState(false);

  const toast = useToast();
  const modal = useModal();

  const [modifyState, setModifyState] = useState<
    "idle" | "modified" | "updating"
  >("idle");

  useEffect(() => {
    if (classNameModified || initialCreditsModified) {
      setModifyState("modified");
    } else {
      setModifyState("idle");
    }
  }, [classNameModified, initialCreditsModified]);

  if (skeleton || !classData) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col sm:space-0 space-y-5 justify-between">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const class_name = formData.get("class_name")!.toString().trim();
          const initial_credits = formData
            .get("initial_credits")
            ?.toString()
            .trim();

          if (
            class_name === "" &&
            (!initial_credits || initial_credits === "")
          ) {
            toast.setToast(true, {
              content: "Nessuna modifica da apportare",
              toastType: "info",
            });
            return;
          }

          setModifyState("updating");

          let newClassData: Partial<
            Pick<ClassData, "class_name" | "initial_credits">
          > = {};

          // Class name
          if (class_name === "") {
            newClassData.class_name = undefined;
          } else {
            newClassData.class_name = class_name;
          }
          // Credits
          if (initial_credits === "" || classData.game_started) {
            newClassData.initial_credits = undefined;
          } else {
            newClassData.initial_credits = parseInt(initial_credits!);
          }

          const res = await updateClassAction(classData.class_id, newClassData);
          if (res.status === 200) {
            toast.setToast(true, {
              content: "La classe è stata aggiornata",
              toastType: "success",
            });
          } else {
            toast.setToast(true, {
              content: "Errore durante l'aggiornamento della classe",
              toastType: "error",
              overrideQueue: true,
            });
          }
          setModifyState("idle");
        }}
        onReset={() => {
          setModifyState("idle");
        }}
      >
        <fieldset className="d-fieldset w-full">
          <legend className="d-fieldset-legend">Nome classe</legend>
          <input
            type="text"
            className="d-input w-full"
            placeholder={classData.class_name}
            defaultValue={classData.class_name}
            name="class_name"
            onChange={(e) => {
              const value = e.currentTarget.value;
              if (value !== classData.class_name) {
                setClassNameModified(true);
              } else {
                setClassNameModified(false);
              }
            }}
          />
        </fieldset>
        <fieldset className="d-fieldset max-w-full w-full">
          <legend className="d-fieldset-legend">Crediti iniziali</legend>
          <input
            type="number"
            className="d-input w-full"
            placeholder={classData.initial_credits.toString()}
            defaultValue={classData.initial_credits.toString()}
            name="initial_credits"
            disabled={classData.game_started}
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value.trim(), 10);
              if (!isNaN(value) && value !== classData.initial_credits) {
                setInitialCreditsModified(true);
              } else {
                setInitialCreditsModified(false);
              }
            }}
          />
          {classData.use_anti_cheat && (
            <p className="d-label max-w-full text-wrap">
              <i
                className="bi bi-info bg-info text-info-content rounded-full p-2 size-7 text-lg flex items-center justify-center"
                aria-hidden
              ></i>
              Una volta che la partita è iniziata, non potrai più modificare i
              crediti iniziali.
            </p>
          )}
        </fieldset>
        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            type="reset"
            className="d-btn d-btn-primary d-btn-soft"
            disabled={modifyState === "updating" || modifyState === "idle"}
          >
            Reset
          </button>
          <button
            type="submit"
            className="d-btn d-btn-primary grow"
            disabled={modifyState === "updating" || modifyState === "idle"}
          >
            Salva modifiche
          </button>
        </div>
      </form>
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="mb-2.5">
          <legend className="w-25 h-5 d-skeleton mb-0.5"></legend>
          <div className="w-full h-10 d-skeleton"></div>
        </div>
        <div>
          <legend className="w-25 h-5 d-skeleton mb-0.5"></legend>
          <div className="w-full h-10 d-skeleton"></div>
        </div>
        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            type="reset"
            className="d-btn d-btn-primary d-btn-soft d-skeleton"
            disabled={true}
          >
            <p className="invisible">Reset</p>
          </button>
          <button
            type="submit"
            className="d-btn d-btn-primary grow d-skeleton"
            disabled={true}
          >
            <p className="invisible">Salva modifiche</p>
          </button>
        </div>
      </div>
    </div>
  );
};
