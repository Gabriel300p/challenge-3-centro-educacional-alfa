import type { ReactNode } from "react";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <main className="flex-1 py-6 md:py-8 lg:py-12 mx-4 md:mx-8 lg:mx-16">
        {children}
      </main>
    </div>
  );
}
