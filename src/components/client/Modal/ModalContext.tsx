"use client";

import { createContext, useState, useRef, useEffect, useContext } from "react";

export type ModalProps = {
  title: string;
  content: React.ReactNode;
  confirmButtonText?: string;
  onClose?: () => void;
  onConfirm?: () => void | boolean | Promise<void | boolean>;
};

export type ModalContextType = {
  readonly isOpen: boolean;
  setModal: (value: boolean, newModalContent?: ModalProps) => void;
  setConfirmButtonDisabled: (value: boolean) => void;
  modalProps: ModalProps;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    title: "Hello!",
    content: "Press ESC key or click the button below to close",
  });
  const [disabled, setDisabled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const setModal = (value: boolean, newModalContent?: ModalProps) => {
    if (newModalContent) setModalProps(newModalContent);
    setIsOpen(value);
  };

  // Open/close dialog when isOpen changes
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setModal,
        modalProps,
        setConfirmButtonDisabled: setDisabled,
      }}
    >
      <dialog
        ref={dialogRef}
        className="d-modal"
        onClose={() => {
          if (modalProps.onClose) {
            modalProps.onClose();
          }
          setIsOpen(false);
        }}
      >
        <div className="d-modal-box">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg">{modalProps.title}</h1>
            <button
              disabled={disabled}
              className="d-btn d-btn-ghost"
              type="button"
              onClick={() => {
                setModal(false);
              }}
            >
              <i className="bi bi-x text-3xl" aria-hidden></i>
            </button>
          </div>
          <div className="py-4">{modalProps.content}</div>
          <div className="d-modal-action">
            <button
              className="d-btn d-btn-neutral"
              type={"button"}
              disabled={disabled}
              onClick={async () => {
                const res = await modalProps.onConfirm?.();
                if (res === false) {
                  return;
                }
                setIsOpen(false);
              }}
            >
              {modalProps.confirmButtonText ?? "Chiudi"}
            </button>
          </div>
        </div>
      </dialog>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export { ModalContext, ModalProvider, useModal };
