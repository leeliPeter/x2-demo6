"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Waypoints,
  Database,
  CircleDotDashed,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { NavDataContext } from "@/redux/provider";
import { useDispatch, useSelector } from "react-redux";
import {
  setPath,
  setCommunityNumber,
  setTextUnitIds,
  setPathIds,
} from "@/redux/features/navigationSlice";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { NavData } from "@/api/navData";

interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  community?: number;
}

interface SecondSidebarProps {
  isOpen?: boolean;
  className?: string;
}

// Function to transform navData into navigation items
const transformGraphDataToNav = (navData: NavData) => {
  const navItems: NavItem[] = [
    {
      id: "all-data",
      title: "All Data",
      icon: <Database size={16} />,
      children: navData.graph.map((graph) => ({
        id: graph.graph_id,
        title: graph.graph_name,
        icon: <Waypoints size={16} />,
        children: graph.communities
          .filter((community) => community.level === 0)
          .map((community) => ({
            id: community.community_id,
            title: community.community_title,
            icon: <CircleDotDashed size={16} />,
            community: community.community,
            children: graph.communities
              .filter((c) => c.level === 1 && c.parent === community.community)
              .map((level1Community) => ({
                id: level1Community.community_id,
                title: level1Community.community_title,
                icon: <CircleDotDashed size={16} />,
                community: level1Community.community,
                children: graph.communities
                  .filter(
                    (c) =>
                      c.level === 2 &&
                      c.parent === parseInt(level1Community.community_id)
                  )
                  .map((level2Community) => ({
                    id: level2Community.community_id,
                    title: level2Community.community_title,
                    icon: <CircleDotDashed size={16} />,
                    community: level2Community.community,
                    children: graph.communities
                      .filter(
                        (c) =>
                          c.level === 3 &&
                          c.parent === parseInt(level2Community.community_id)
                      )
                      .map((level3Community) => ({
                        id: level3Community.community_id,
                        title: level3Community.community_title,
                        icon: <CircleDotDashed size={16} />,
                        community: level3Community.community,
                      })),
                  })),
              })),
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
  const navData = useContext(NavDataContext);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigationItems = navData ? transformGraphDataToNav(navData) : [];

  const findCommunityNumber = (path: string[]) => {
    if (!navData || path.length < 3) return null;

    const graphName = path[1];
    const selectedGraph = navData.graph.find(
      (graph) => graph.graph_name === graphName
    );
    if (!selectedGraph) return null;

    const communityTitle = path[path.length - 1];
    const community = selectedGraph.communities.find(
      (community) => community.community_title === communityTitle
    );

    return community ? community.community : null;
  };

  // Watch for path changes and update community number
  useEffect(() => {
    const communityNumber = findCommunityNumber(selectedPath);
    dispatch(setCommunityNumber(communityNumber));
  }, [selectedPath, dispatch]);

  const handleItemClick = (item: NavItem, parentTitles: string[] = []) => {
    const newPath = [...parentTitles, item.title];
    dispatch(setPath(newPath));

    // Build path IDs
    const pathIds = ["company_1"]; // Start with company ID

    if (newPath.length > 1) {
      // Find graph ID
      const graphName = newPath[1];
      const graph = navData?.graph.find((g) => g.graph_name === graphName);
      if (graph) {
        pathIds.push(graph.graph_id); // This adds "graph_1"

        // Find community ID if it exists
        if (newPath.length > 2) {
          const community = graph.communities.find(
            (c) => c.community_title === newPath[newPath.length - 1]
          );
          if (community) {
            pathIds.push(community.community_id);
          }
        }
      }
    }

    dispatch(setPathIds(pathIds));

    if (item.community !== undefined) {
      dispatch(setCommunityNumber(item.community));
      if (navData) {
        const graph = navData.graph.find(
          (g) => g.graph_name === parentTitles[1]
        );
        if (graph) {
          const community = graph.communities.find(
            (c) => c.community === item.community
          );
          if (community) {
            dispatch(setTextUnitIds(community.text_unit_ids));
          }
        }
      }
    } else {
      dispatch(setCommunityNumber(null));
      dispatch(setTextUnitIds([]));
    }

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
    <div key={item.id} className="space-y-1">
      <button
        onClick={() => handleItemClick(item, parentTitles)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md",
          "hover:bg-gray-100 transition-colors"
          // expandedItems.includes(item.title) ? "bg-gray-100" : "text-gray-600"
        )}
      >
        <div className="flex items-center gap-2 ">
          <div className="min-w-4">{item.icon}</div>
          <span className="truncate max-w-28">{item.title}</span>
        </div>
        {item.children && item.children.length > 0 && (
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
        pathname === "/projects" ? "hidden" : "",
        className
      )}
    >
      <div className="p-4 h-full">
        <div className="text-xs mb-2 text-sidebar-foreground">Data Center</div>
        <nav
          className="space-y-1 h-[calc(100vh-6rem)] overflow-y-auto pr-2 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-200
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-300
          [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
}
