import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "@/shared/components";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryProvider>{children}</QueryProvider>
    </ErrorBoundary>
  );
}
