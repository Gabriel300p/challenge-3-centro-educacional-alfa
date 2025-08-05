import { useContext } from "react";
import type { ToastContextValue } from "../components/ToastProvider";
import { ToastContext } from "../components/ToastProvider";

// 🪝 useToast Hook
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
}
