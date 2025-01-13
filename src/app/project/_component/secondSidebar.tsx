"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  PencilLine,
  Heading1,
  Heading2,
  FileText,
} from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

interface SecondSidebarProps {
  isOpen?: boolean;
  className?: string;
  currentView: "list" | "bookmark" | null;
}

interface NavItem {
  id: string;
  title: string;
  children: NavItem[];
}

const navItems = [
  {
    id: "Chapter 1",
    title: "Chapter 1",
    children: [
      { id: "Section 1.1", title: "Section 1.1", children: [] },
      { id: "Section 1.2", title: "Section 1.2", children: [] },
      { id: "Section 1.3", title: "Section 1.3", children: [] },
      {
        id: "Section 1.4",
        title: "Section 1.4",
        children: [
          { id: "Section 1.4.1", title: "Section 1.4.1", children: [] },
          { id: "Section 1.4.2", title: "Section 1.4.2", children: [] },
          { id: "Section 1.4.3", title: "Section 1.4.3", children: [] },
        ],
      },
    ],
  },
  {
    id: "Chapter 2",
    title: "Chapter 2",
    children: [
      { id: "Section 2.1", title: "Section 2.1", children: [] },
      {
        id: "Section 2.2",
        title: "Section 2.2",
        children: [
          { id: "Section 2.2.1", title: "Section 2.2.1", children: [] },
          { id: "Section 2.2.2", title: "Section 2.2.2", children: [] },
          { id: "Section 2.2.3", title: "Section 2.2.3", children: [] },
        ],
      },
      { id: "Section 2.3", title: "Section 2.3", children: [] },
      { id: "Section 2.4", title: "Section 2.4", children: [] },
    ],
  },
];

const sourceList = [
  {
    id: "Source 1",
    title: "Source 1",
    chunks: 32,
  },
  {
    id: "Source 2",
    title: "Source 2",
    chunks: 26,
  },
  {
    id: "Source 3",
    title: "Source 3",
    chunks: 46,
  },
  {
    id: "Source 4",
    title: "Source 4",
    chunks: 52,
  },
  {
    id: "Source 5",
    title: "Source 5",
    chunks: 62,
  },
  {
    id: "Source 6",
    title: "Source 6",
    chunks: 102,
  },
  {
    id: "Source 7",
    title: "Source 7",
    chunks: 32,
  },
  {
    id: "Source 8",
    title: "Source 8",
    chunks: 98,
  },
  {
    id: "Source 9",
    title: "Source 9",
    chunks: 328,
  },
];

export function ProjectSecondSidebar({
  isOpen = true,
  className,
  currentView,
}: SecondSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0): ReactElement => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id} className={cn("relative ", depth > 0 && "ml-6")}>
        <button
          onClick={() => toggleItem(item.id)}
          className="flex items-center w-full gap-2 py-2 px-2 text-sm hover:bg-muted/80 rounded-lg"
        >
          <div className="flex items-center gap-2 w-full">
            {depth === 0 && <Heading1 className="w-4 h-4" />}
            {depth === 1 && <Heading2 className="w-4 h-4" />}
            <span>{item.title}</span>
          </div>
          {hasChildren && (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "transform rotate-180"
              )}
            />
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderSourceList = () => {
    return (
      <div className="flex-1 overflow-auto p-3 text-muted-foreground">
        <p className="text-xs  py-2">Source List</p>
        {sourceList.map((item) => (
          <div
            key={item.id}
            className="flex py-2 px-2 text-sm gap-2 hover:bg-muted/80 rounded-lg"
          >
            <FileText className="w-4 h-4 mt-1 text-muted-foreground" />
            <div className="flex flex-col ">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">
                {item.chunks} chunks
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn("w-[240px] border-r bg-muted/30 flex flex-col", className)}
    >
      {/* Header */}
      <div className="py-2 px-3 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-500 text-base">
            Project Name
          </h2>
          <div className="cursor-pointer hover:bg-border rounded-lg p-2">
            <PencilLine className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {currentView === "list" ? (
        <div className="flex-1 overflow-auto p-3 text-muted-foreground">
          <p className="text-xs py-2">Outlines</p>
          {navItems.map((item) => renderNavItem(item))}
        </div>
      ) : (
        renderSourceList()
      )}
    </div>
  );
}
