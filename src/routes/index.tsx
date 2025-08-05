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
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-md">
          <ToastDemoSimple />
        </div>
      </div>
    );
  }

  return <Navigate to="/login" />;
}
