"use client";

import { createContext, useState, useContext, useEffect } from "react";

export type ToastProps = {
  content: React.ReactNode;
  onClose?: () => void;
  toastType?: "info" | "error" | "success" | "warning" | undefined;
  toastDuration?: number;
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

  const setToast = (open: boolean, props?: ToastProps) => {
    if (props) {
      setToastProps(props);
    }
    if (open && isOpen) return;
    setIsOpen(open);
  };

  useEffect(() => {
    const duration = getToastDuration(); // In seconds
    console.log(duration);

    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => setIsOpen(false), duration * 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen, toastProps]);

  const getToastLoaderTrailColor = () => {
    switch (toastProps?.toastType) {
      case "success":
        return "bg-success-content";
      case "error":
        return "bg-error-content";
      case "warning":
        return "bg-warning-content";
      case "info":
        return "bg-info-content";
      default:
        return "bg-base-content";
    }
  };
  const getToastLoaderBgColor = () => {
    switch (toastProps?.toastType) {
      case "success":
        return "bg-success";
      case "error":
        return "bg-error";
      case "warning":
        return "bg-warning";
      case "info":
        return "bg-info";
      default:
        return "bg-base-200";
    }
  };
  const getToastColor = () => {
    switch (toastProps?.toastType) {
      case "success":
        return "d-alert-success";
      case "error":
        return "d-alert-error";
      case "warning":
        return "d-alert-warning";
      case "info":
        return "d-alert-info";
      default:
        return "d-alert-base-200";
    }
  };

  const getToastDuration = () => {
    if (!toastProps?.toastType) return 4;
    return toastProps.toastDuration ?? 4;
  };

  return (
    <ToastContext.Provider value={{ isOpen, setToast, toastProps }}>
      {isOpen && toastProps && (
        <div className="d-toast sm:w-auto w-full z-50">
          <div className={`flex flex-col ${getToastColor()}`}>
            <div className="flex justify-between items-center d-alert rounded-b-none border-b-0">
              <span>{toastProps.content}</span>
              <button
                type="button"
                className="d-btn d-btn-ghost p-0"
                onClick={() => {
                  toastProps.onClose?.();
                  setIsOpen(false);
                  console.log("Toast close");
                }}
              >
                <i className="bi bi-x-lg" aria-disabled></i>
              </button>
            </div>
            <div
              className={`w-full h-1 overflow-clip ${getToastLoaderBgColor()} rounded-b-box border border-base-200 border-t-0`}
            >
              <div
                className={`h-full animate-shrink ${getToastLoaderTrailColor()}`}
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
