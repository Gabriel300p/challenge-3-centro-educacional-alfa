import { ComunicacoesPage } from "@features/comunicacoes";
import { MainLayout } from "@shared/components/layout/MainLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/comunicacoes")({
  component: () => (
    <MainLayout>
      <ComunicacoesPage />
    </MainLayout>
  ),
});
