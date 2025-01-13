"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SecondSidebar } from "@/components/layout/secondSidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AddBtn } from "@/components/layout/addBtn";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSecondSidebarOpen, setIsSecondSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSecondSidebarOpen(!isSecondSidebarOpen);

  return (
    <>
      <AddBtn />
      <div className="flex min-h-screen">
        <Sidebar className="w-24 border-r" />
        <div className="flex-1">
          <div className="p-4 border-b">
            <Breadcrumb onToggle={toggleSidebar} />
          </div>
          <div className="flex h-[calc(100vh-37px)]">
            <SecondSidebar isOpen={isSecondSidebarOpen} />
            <div
              className={cn(
                "flex-1 transition-all duration-300",
                isSecondSidebarOpen ? "w-[calc(100%-256px)]" : "w-full"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
