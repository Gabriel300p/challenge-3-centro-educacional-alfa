import { ThemeProvider } from "@/app/providers/ThemeProvider";
import {
  ErrorBoundary,
  ToastProvider,
} from "@/shared/components/ui/toast/_index";
import type { PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultMode="light" enableSystem={true}>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
