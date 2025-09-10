"use client";

import { ToastProps, useToast } from "@/components/client/Toast/ToastContext";
import { readDataFromLocalStorage, writeDataInLocalStorage } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function AlertDisplayer(toastProps: ToastProps) {
  const firstRender = useRef(true);
  const toast = useToast();

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
