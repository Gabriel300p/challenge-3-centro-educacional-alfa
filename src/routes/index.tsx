import { AnimatedPageExample } from "@/shared/animations/examples";
import { FadeIn, MotionCard, PageTransition } from "@shared/animations";
import { ToastDemoSimple } from "@shared/components/demo/ToastDemoSimple";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  // Temporary demo mode for testing new toast features
  const isDemoMode = process.env.NODE_ENV === "development";

  if (isDemoMode) {
    return (
      <PageTransition variant="fadeIn">
        <div className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Hero Section with Animation */}
            <FadeIn direction="up" delay={0.2}>
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Centro Educacional Alfa
                </h1>
                <p className="text-lg text-gray-600">
                  Sistema com animações integradas
                </p>
              </div>
            </FadeIn>

            {/* Demo Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn direction="left" delay={0.4}>
                <MotionCard
                  variant="lift"
                  className="rounded-lg bg-white p-6 shadow-md"
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    Sistema de Toast
                  </h3>
                  <ToastDemoSimple />
                </MotionCard>
              </FadeIn>

              <FadeIn direction="right" delay={0.6}>
                <MotionCard
                  variant="scale"
                  className="rounded-lg bg-white p-6 shadow-md"
                >
                  <h3 className="mb-4 text-xl font-semibold">Animações</h3>
                  <p className="mb-4 text-gray-600">
                    Sistema completo de animações acessíveis e performáticas.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li>✅ 8 Componentes animados</li>
                    <li>✅ 8 Hooks personalizados</li>
                    <li>✅ Acessibilidade integrada</li>
                    <li>✅ Performance 60fps</li>
                  </ul>
                </MotionCard>
                <AnimatedPageExample />
              </FadeIn>
            </div>

            {/* Footer Animation */}
            <FadeIn direction="up" delay={0.8}>
              <div className="text-center text-sm text-gray-500">
                <p>
                  🎭 Sistema de Animações v1.0.0 - Implementado com sucesso!
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    );
  }

  return <Navigate to="/login" />;
}
