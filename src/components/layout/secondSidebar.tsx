"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Waypoints,
  Database,
  CircleDotDashed,
} from "lucide-react";
import { useState } from "react";
import { graphData } from "@/data/graphData";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/navigationSlice";

interface NavItem {
  title: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

interface SecondSidebarProps {
  isOpen?: boolean;
  className?: string;
}

// Function to get icon based on item title or type
const getIcon = (title: string, type?: string) => {
  if (title === "All Data") return <Database size={16} />;
  if (title.startsWith("Graph")) return <Waypoints size={16} />;
  if (title.startsWith("Community")) return <CircleDotDashed size={16} />;
  return <CircleDotDashed size={16} />;
};

// Function to transform graphData into navigation items
const transformGraphDataToNav = (data: typeof graphData): NavItem[] => {
  const navItems: NavItem[] = [
    {
      title: "All Data",
      icon: <Database size={16} />,
      children: data.graphs.map((graph) => ({
        title: graph.title,
        icon: <Waypoints size={16} />,
        children: graph.communities.map((community) => ({
          title: community.title,
          icon: <CircleDotDashed size={16} />,
          children: community.children
            ? community.children.map((subCommunity) => ({
                title: subCommunity.title,
                icon: <CircleDotDashed size={16} />,
                children: subCommunity.children
                  ? subCommunity.children.map((lastCommunity) => ({
                      title: lastCommunity.title,
                      icon: <CircleDotDashed size={16} />,
                    }))
                  : undefined,
              }))
            : undefined,
        })),
      })),
    },
  ];

  return navItems;
};

export function SecondSidebar({
  isOpen = true,
  className,
}: SecondSidebarProps) {
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigationItems = transformGraphDataToNav(graphData);

  const handleItemClick = (item: NavItem, parentTitles: string[] = []) => {
    const newPath = [...parentTitles, item.title];
    dispatch(setPath(newPath));
    if (item.children) {
      toggleItem(item.title);
    }
  };

  const toggleItem = (title: string) => {
    setExpandedItems((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  const renderNavItem = (
    item: NavItem,
    depth = 0,
    parentTitles: string[] = []
  ) => (
    <div key={item.title} className="space-y-1">
      <button
        onClick={() => handleItemClick(item, parentTitles)}
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
        <div className={cn("relative space-y-1", depth > 0 ? "ml-3" : "ml-3")}>
          <div className="absolute left-[-10px] top-0 bottom-0 w-px bg-gray-200" />
          {item.children.map((child) =>
            renderNavItem(child, depth + 1, [...parentTitles, item.title])
          )}
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
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
}
