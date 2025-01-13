"use client";

import { ProjectSidebar } from "./_component/sidebar";
import { ProjectSecondSidebar } from "./_component/secondSidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  const [isSecondSidebarOpen, setIsSecondSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<"list" | "bookmark" | null>(
    null
  );

  const handleViewChange = (view: "list" | "bookmark") => {
    if (currentView === view) {
      setCurrentView(null);
      setIsSecondSidebarOpen(false);
    } else {
      setCurrentView(view);
      setIsSecondSidebarOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ProjectSidebar
        currentView={currentView}
        setCurrentView={handleViewChange}
      />
      <ProjectSecondSidebar
        isOpen={isSecondSidebarOpen}
        currentView={currentView}
      />
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isSecondSidebarOpen ? "w-[calc(100%-384px)]" : "w-[calc(100%-64px)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
