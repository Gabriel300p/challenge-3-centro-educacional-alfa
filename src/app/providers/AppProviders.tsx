import { ErrorBoundary, ToastProvider } from "@/shared/components";
import type { PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
