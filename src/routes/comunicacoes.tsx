import { LoadingSpinner } from "@shared/components";
import { MainLayout } from "@shared/components/layout/MainLayout";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// 🚀 Code Splitting: Lazy load ComunicacoesPage
const ComunicacoesPage = lazy(() =>
  import("@features/comunicacoes").then((module) => ({
    default: module.ComunicacoesPage,
  })),
);

export const Route = createFileRoute("/comunicacoes")({
  component: () => (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingSpinner size="lg" text="Carregando comunicações..." />
          </div>
        }
      >
        <ComunicacoesPage />
      </Suspense>
    </MainLayout>
  ),
});
