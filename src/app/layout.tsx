"use client";

import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";
import { SecondSidebar } from "@/components/secondSidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSecondSidebarOpen, setIsSecondSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSecondSidebarOpen(!isSecondSidebarOpen);

  return (
    <html lang="en">
      <body>
        <div className=" flex min-h-screen">
          <Sidebar className="w-24 border-r" />
          <main className="flex-1">
            <div className="p-4 border-b">
              <Breadcrumb onToggle={toggleSidebar} />
            </div>
            <div className="flex h-[calc(100vh-40px)]">
              <SecondSidebar isOpen={isSecondSidebarOpen} />
              <div className="flex-1 p-8">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
