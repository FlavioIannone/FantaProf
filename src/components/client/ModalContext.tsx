"use client";

import { createContext, useState, useRef, useEffect, useContext } from "react";

type ModalProps = {
  title: string;
  content: string;
  onClose?: () => void;
};

type ModalContextType = {
  isOpen: boolean;
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
          <h3 className="font-bold text-lg">{modalProps.title}</h3>
          <p className="py-4">{modalProps.content}</p>
          <div className="d-modal-action">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
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
