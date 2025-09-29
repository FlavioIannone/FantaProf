"use client";

import { createContext, useState, useContext, useEffect, useRef } from "react";

type ToastType = "info" | "error" | "success" | "warning" | undefined;

type ToastColors = {
  color: string;
  loaderTrailColor: string;
  loaderBgColor: string;
  loaderBorderColor: string;
};

const toastColors: Map<ToastType, ToastColors> = new Map([
  [
    "success",
    {
      color: "d-alert-success",
      loaderBgColor: "bg-success",
      loaderBorderColor: "border-t-success",
      loaderTrailColor: "bg-success-content",
    },
  ],
  [
    "error",
    {
      color: "d-alert-error",
      loaderBgColor: "bg-error",
      loaderBorderColor: "border-t-error",
      loaderTrailColor: "bg-error-content",
    },
  ],
  [
    "warning",
    {
      color: "d-alert-warning",
      loaderBgColor: "bg-warning",
      loaderBorderColor: "border-t-warning",
      loaderTrailColor: "bg-warning-content",
    },
  ],
  [
    "info",
    {
      color: "d-alert-info",
      loaderBgColor: "bg-info",
      loaderBorderColor: "border-t-info",
      loaderTrailColor: "bg-info-content",
    },
  ],
  [
    undefined,
    {
      color: "d-alert-base-200",
      loaderBgColor: "bg-base-200",
      loaderBorderColor: "border-t-base-200",
      loaderTrailColor: "bg-base-content",
    },
  ],
]);

export type ToastProps = {
  content: React.ReactNode;
  onClose?: () => void;
  toastType?: ToastType;
  toastDuration?: number;
  overrideQueue?: boolean;
};

type ToastContextType = {
  readonly isOpen: boolean;
  setToast: (open: boolean, props?: ToastProps) => void;
  toastProps: ToastProps | null;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  // Queue of toasts waiting to show
  const queueRef = useRef<ToastProps[]>([]);

  const setToast = (open: boolean, props?: ToastProps) => {
    // Close toast
    if (!open) {
      setIsOpen(false);
      return;
    }

    // Called without props only in debug, show toast without props
    if (!props) {
      setIsOpen(true);
      return;
    }

    // Override the queue: clear the queue and show this specific toast
    if (props.overrideQueue) {
      clearToastQueue();
      addToastToQueue(props);
      setIsOpen(true);
      // force reopen on next render cycle
      requestAnimationFrame(() => setIsOpen(false));
      return;
    }
    // se un toast è già aperto → accoda
    if (isOpen) {
      addToastToQueue(props);
      return;
    }

    if (isOpen) setIsOpen(false);

    setToastProps(props);
    setIsOpen(true);
  };

  const addToastToQueue = (props: ToastProps) => {
    queueRef.current.push(props);
  };

  const clearToastQueue = () => {
    queueRef.current = [];
  };

  useEffect(() => {
    const duration = getToastDuration(); // In seconds

    let timeout: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timeout = setTimeout(() => {
        setIsOpen(false);
      }, duration * 1000);
    }
    return () => clearTimeout(timeout);
  }, [isOpen, toastProps]);

  // When a toast closes, check the queue
  useEffect(() => {
    if (!isOpen && queueRef.current.length > 0) {
      const next = queueRef.current.shift()!;

      setToastProps(next);
      setIsOpen(true);
    }
  }, [isOpen]);

  const getToastDuration = () => {
    if (!toastProps?.toastDuration) return 4;
    return toastProps.toastDuration ?? 4;
  };

  return (
    <ToastContext.Provider value={{ isOpen, setToast, toastProps }}>
      {isOpen && toastProps && (
        <div className="d-toast sm:w-auto w-full z-50">
          <div
            className={`flex flex-col ${
              toastColors.get(toastProps.toastType)?.color
            }`}
          >
            <div className="flex justify-between items-center d-alert rounded-b-none border-b-0">
              <span>{toastProps.content}</span>
              <button
                type="button"
                className="d-btn d-btn-ghost p-0"
                onClick={() => {
                  toastProps.onClose?.();
                  setIsOpen(false);
                }}
              >
                <i className="bi bi-x-lg" aria-disabled></i>
              </button>
            </div>
            <div
              className={`w-full h-1 overflow-clip ${
                toastColors.get(toastProps.toastType)?.loaderBgColor
              } rounded-b-box border border-base-200 ${
                toastColors.get(toastProps.toastType)?.loaderBorderColor
              }`}
            >
              <div
                className={`h-full animate-shrink ${
                  toastColors.get(toastProps.toastType)?.loaderTrailColor
                }`}
                style={{
                  animationDuration: `${getToastDuration()}s`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
