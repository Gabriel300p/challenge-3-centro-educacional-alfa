import type { ReactNode } from "react";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <main className="flex-1 mt-12 mx-16">{children}</main>
    </div>
  );
}
