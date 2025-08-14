"use client";

import { createContext, useState, useRef, useEffect, useContext } from "react";

export type ModalProps = {
  title: string;
  content: React.ReactNode;
  closeOnSubmit?: boolean;
  confirmButtonText?: string;
  onClose?: () => void;
  onConfirm?: (formData?: FormData) => void | boolean | Promise<void | boolean>;
};

export type ModalContextType = {
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setModal: (value: boolean, newModalContent?: ModalProps) => void;
  setConfirmButtonDisabled: (value: boolean) => void;
  modalProps: ModalProps;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    title: "Hello!",
    content: "Press ESC key or click the button below to close",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const setModal = (value: boolean, newModalContent?: ModalProps) => {
    if (newModalContent)
      setModalProps({
        ...newModalContent,
        closeOnSubmit: newModalContent.closeOnSubmit ?? true,
      });
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
        isLoading,
        setIsLoading,
        isOpen,
        setModal,
        modalProps,
        setConfirmButtonDisabled: setSubmitDisabled,
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
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">{modalProps.title}</h1>
            <button
              disabled={submitDisabled}
              className="d-btn d-btn-ghost p-0"
              type="button"
              onClick={() => {
                setModal(false);
              }}
            >
              <i className="bi bi-x text-3xl" aria-hidden></i>
            </button>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (submitDisabled) return;
              setIsLoading(true);
              const formData = new FormData(e.currentTarget);
              const res = await modalProps.onConfirm?.(formData);
              if (res === false) {
                return;
              }
              setIsLoading(false);
              if (modalProps.closeOnSubmit === false) return;
              setIsOpen(false);
            }}
          >
            <div className="py-4">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <span className="d-loading d-loading-ring d-loading-xl"></span>
                </div>
              ) : (
                modalProps.content
              )}
            </div>
            <div className="d-modal-action">
              <button
                className="d-btn d-btn-neutral"
                type="submit"
                disabled={submitDisabled}
              >
                {modalProps.confirmButtonText ?? "Chiudi"}
              </button>
            </div>
          </form>
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

export { ModalProvider, useModal };
