"use client";

import { createContext, useState, useRef, useEffect, useContext } from "react";

export type ModalProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  onCloseButtonText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export type ModalContextType = {
  readonly isOpen: boolean;
  setModal: (value: boolean, newModalContent?: ModalProps) => void;
  modalProps: ModalProps;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    title: "Hello!",
    content: "Press ESC key or click the button below to close",
  });
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
    <ModalContext.Provider value={{ isOpen, setModal, modalProps }}>
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
          <div className="font-bold text-lg">{modalProps.title}</div>
          <div className="py-4">{modalProps.content}</div>
          <div className="d-modal-action">
            <button
              className="d-btn d-btn-neutral"
              onClick={() => {
                if (modalProps.onConfirm) {
                  modalProps.onConfirm();
                }
                setIsOpen(false);
              }}
            >
              {modalProps.onCloseButtonText ?? "Chiudi"}
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
