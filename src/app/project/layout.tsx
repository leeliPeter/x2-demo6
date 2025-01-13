"use client";

import { ProjectSidebar } from "./_component/sidebar";
import { ProjectSecondSidebar } from "./_component/secondSidebar";
import { ProjectBreadcrumb } from "./_component/breadcrumb";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectRightSidebar } from "./_component/rightSidebar";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  const [isSecondSidebarOpen, setIsSecondSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<"list" | "bookmark" | null>(
    "list"
  );
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

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
          isSecondSidebarOpen ? "w-[calc(100%-384px)]" : "w-[calc(100%-64px)]",
          rightSidebarOpen && "w-[calc(100%-384px-320px)]"
        )}
      >
        <ProjectBreadcrumb
          setRightSidebarOpen={setRightSidebarOpen}
          rightSidebarOpen={rightSidebarOpen}
        />
        <div className="flex-1 h-[calc(100vh-49px)]">{children}</div>
      </div>
      <div
        className={cn(
          "h-screen w-[360px] border-l bg-background transition-all duration-300",
          !rightSidebarOpen && "w-0"
        )}
      >
        <ProjectRightSidebar
          isOpen={rightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
        />
      </div>
    </div>
  );
}
