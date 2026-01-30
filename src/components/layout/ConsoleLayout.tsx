import { ReactNode } from "react";
import { ConsoleSidebar } from "./ConsoleSidebar";

interface ConsoleLayoutProps {
  children: ReactNode;
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <ConsoleSidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
