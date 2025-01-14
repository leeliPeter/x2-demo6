"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ListTree, BookMarked } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
  currentView: "list" | "bookmark" | null;
  setCurrentView: (view: "list" | "bookmark") => void;
}

const navItems = [
  {
    id: "list",
    title: "List",
    icon: ListTree,
  },
  {
    id: "bookmark",
    title: "Bookmark",
    icon: BookMarked,
  },
];

export function ProjectSidebar({
  className,
  currentView,
  setCurrentView,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "w-18 flex flex-col items-center border-r gap-1 bg-muted/30",
        className
      )}
    >
      <div className="p-2 border-b mb-2">
        <Link href="/projects">
          <h2 className="font-semibold bg-slate-600 hover:bg-slate-700 flex items-center justify-center text-white w-8 h-8 rounded-lg cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </h2>
        </Link>
      </div>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            "p-2 cursor-pointer hover:bg-border rounded-lg",
            currentView === item.id && "bg-border"
          )}
          onClick={() => setCurrentView(item.id as "list" | "bookmark")}
        >
          <item.icon className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
}
