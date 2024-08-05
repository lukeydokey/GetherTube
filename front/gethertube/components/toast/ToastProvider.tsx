"use client";
import { ReactNode, createContext, useState } from "react";

type ToastType = "success" | "warning" | "error";

interface ToastProps {
  //   title: string;
  message: string;
  type: ToastType;
  show: boolean;
}

interface ToastContextProps {
  toast: ToastProps;
  showToast: (message: string, type: ToastType, show?: boolean) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: { message: "", type: "success", show: false },
  showToast: () => {},
  hideToast: () => {},
});

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastProps>({
    message: "",
    type: "success",
    show: false,
  });

  const showToast = (message: string, type: ToastType, show?: boolean) => {
    setToast({ message, type, show: true });
    setTimeout(
      () => setToast({ message: "", type: "success", show: false }),
      3000
    );
  };

  const hideToast = () => {
    setToast({ message: "", type: "success", show: false });
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}
