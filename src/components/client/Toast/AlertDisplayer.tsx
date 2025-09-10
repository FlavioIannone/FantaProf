"use client";

import { ToastProps, useToast } from "@/components/client/Toast/ToastContext";
import { useEffect, useRef } from "react";

export default function AlertDisplayer(toastProps: ToastProps) {
  const firstRender = useRef(true);
  const toast = useToast();

  const writeDataInLocalStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const readDataFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    firstRender.current = false;

    const alreadyShownAlert = readDataFromLocalStorage("lastAlert") === "true";
    if (alreadyShownAlert) {
      return;
    }

    toast.setToast(true, {
      ...toastProps,
      onClose: () => {
        writeDataInLocalStorage("lastAlert", "true");
        toastProps.onClose?.();
      },
    });
  }, [firstRender.current]);
  return <></>;
}
