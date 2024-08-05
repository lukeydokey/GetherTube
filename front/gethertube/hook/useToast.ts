import { useContext } from "react";
import { ToastContext } from "@/components/toast/ToastProvider";

export function useToast() {
  const context = useContext(ToastContext);
  return context;
}
