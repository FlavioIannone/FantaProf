import {
  ModalContextType,
  ModalProps,
  useModal,
} from "@/components/client/Modal/ModalContext";
import { getQueryClient } from "@/lib/getQueryClient";
import { useIdToken } from "@/lib/hooks/useIdToken";
import { RefObject, useRef, useState } from "react";

type FormClassData = {
  class_name: string;
  initial_credits: number;
};

const query = getQueryClient();

const createClass = async (
  classData: FormClassData,
  token: string,
  modal: ModalContextType
) => {
  try {
    const res = await fetch("/api/protected/classes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    modal.setModal(true, {
      title: "Errore",
      content: "Errore durante la creazione della classe.",
      onCloseButtonText: "Riprova",
      onConfirm: () => createClass(classData, token, modal),
    });
  } finally {
    await Promise.all([
      query.invalidateQueries({ queryKey: ["classes"] }),
      query.invalidateQueries({ queryKey: ["globalStats"] }),
    ]);
  }
};

export default function ClassActionsButtons() {
  const modal = useModal();
  const { token, loading, error } = useIdToken();
  const classNameRef = useRef<HTMLInputElement | null>(null);
  const initialCreditsRef = useRef<HTMLInputElement | null>(null);

  if (loading) {
    <section className="d-card d-skeleton space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 grow-1">
      <div className="lg:text-2xl md:text-xl sm:text-md text-md invisible">
        Heading
      </div>
      <div className="text-primary lg:text-4xl md:text-xl text-2xl invisible">
        Main
      </div>
      <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 invisible">
        Footer
      </div>
    </section>;
  }

  if (!token || error) {
    <section className="d-card space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 grow-1">
      <div className="lg:text-2xl md:text-xl sm:text-md text-md invisible">
        Heading
      </div>
      <div className="text-primary lg:text-4xl md:text-xl text-2xl">ERRORE</div>
      <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 invisible">
        Footer
      </div>
    </section>;
  }

  return (
    <section className={`space-y-2.5 grow-1 flex flex-col justify-center`}>
      <button
        type="button"
        className="d-btn d-btn-primary space-x-1 d-btn-block"
        onClick={() => {
          modal.setModal(true, {
            title: <ModalHeader setModal={modal.setModal} />,
            content: (
              <ModalBody
                classNameRef={classNameRef}
                initialCreditsRef={initialCreditsRef}
              />
            ),
            onCloseButtonText: "Crea",
            onConfirm: () => {
              if (classNameRef.current && initialCreditsRef.current) {
                createClass(
                  {
                    class_name: classNameRef.current.value.trim(),
                    initial_credits: parseInt(initialCreditsRef.current.value),
                  },
                  token!,
                  modal
                );
              }
            },
          });
        }}
      >
        <i className="bi bi-plus-circle" aria-hidden></i>
        <p className="w-max">Crea classe</p>
      </button>
      <button
        type="button"
        className="d-btn d-btn-primary space-x-1 d-btn-block d-btn-outline"
        onClick={() => {}}
      >
        <i className="bi bi-building-add" aria-hidden></i>
        <p className="w-max">Aggiungi classe</p>
      </button>
    </section>
  );
}

const ModalHeader = ({
  setModal,
}: {
  setModal: (value: boolean, newModalContent?: ModalProps) => void;
}) => {
  return (
    <div className="flex justify-between">
      Crea classe
      <button
        className="d-btn d-btn-ghost"
        type="button"
        onClick={() => {
          setModal(false);
        }}
      >
        <i className="bi bi-x text-3xl" aria-disabled></i>
      </button>
    </div>
  );
};

const ModalBody = ({
  classNameRef,
  initialCreditsRef,
}: {
  classNameRef: RefObject<HTMLInputElement | null>;
  initialCreditsRef: RefObject<HTMLInputElement | null>;
}) => {
  const [formValid, setFormValid] = useState(true);

  return (
    <div>
      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Nome classe</legend>
        <input
          type="text"
          className="d-input w-full"
          placeholder="Es. 3BINF"
          ref={classNameRef}
          required
        />
      </fieldset>

      <fieldset className="d-fieldset">
        <legend className="d-fieldset-legend">Crediti iniziali</legend>
        <input
          type="number"
          className="d-input w-full"
          placeholder="10"
          ref={initialCreditsRef}
          required
        />
      </fieldset>

      {!formValid && (
        <p className="text-red-500 pt-2 text-sm">
          Compila correttamente tutti i campi.
        </p>
      )}
    </div>
  );
};
