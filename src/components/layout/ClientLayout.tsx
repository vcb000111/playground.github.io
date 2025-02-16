'use client';

import { useSidebar } from "@/contexts/SidebarContext";
import Sidebar from "./Sidebar";

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </main>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
} 