"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Waypoints,
  Database,
  CircleDotDashed,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

interface SecondSidebarProps {
  isOpen?: boolean;
  className?: string;
}

const navItems: NavItem[] = [
  {
    title: "All Data",
    icon: <Database size={16} />,
    children: [
      {
        title: "Graph A",
        icon: <Waypoints size={16} />,
        href: "/graph-a",
        children: [
          {
            title: "Community L1",
            href: "/graph-a/l1",
            icon: <CircleDotDashed size={16} />,
          },
          {
            title: "Community L2",
            href: "/graph-a/l2",
            icon: <CircleDotDashed size={16} />,
          },
          {
            title: "Community L3",
            href: "/graph-a/l3",
            icon: <CircleDotDashed size={16} />,
          },
        ],
      },
    ],
  },
];

export function SecondSidebar({
  isOpen = true,
  className,
}: SecondSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => (
    <div key={item.title} className="space-y-1">
      <button
        onClick={() => item.children && toggleItem(item.title)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md",
          "hover:bg-gray-100 transition-colors",
          expandedItems.includes(item.title) ? "bg-gray-100" : "text-gray-600"
        )}
      >
        <div className="flex items-center gap-2">
          {item.icon}
          <span>{item.title}</span>
        </div>
        {item.children && (
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200",
              expandedItems.includes(item.title) ? "rotate-180" : ""
            )}
          />
        )}
      </button>
      {item.children && expandedItems.includes(item.title) && (
        <div className={cn("relative space-y-1", depth > 0 ? "ml-9" : "ml-6")}>
          <div className="absolute left-[-16px] top-0 bottom-0 w-px bg-gray-200" />
          {item.children.map((child) => renderNavItem(child, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "border-r bg-gray-50/40 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 overflow-hidden",
        className
      )}
    >
      <div className="p-4 ">
        <div className="text-xs mb-2 text-sidebar-foreground">Data Center</div>
        <nav className="space-y-1">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
}
