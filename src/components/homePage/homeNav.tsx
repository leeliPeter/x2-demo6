"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  Search,
  ListFilter,
  Plus,
  Waypoints,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FilterBar } from "./filterBar";

interface HomeNavProps {
  onViewChange: (view: string) => void;
}

export default function HomeNav({ onViewChange }: HomeNavProps) {
  const [activeView, setActiveView] = useState("graph");
  const [showFilter, setShowFilter] = useState(false);
  const byBtn = [
    {
      value: "graph",
      icon: <Waypoints className="h-4 w-4" />,
      label: "by Graph",
    },
    {
      value: "list",
      icon: <Menu className="h-4 w-4" />,
      label: "by Source List",
    },
  ];

  const handleViewChange = (value: string) => {
    setActiveView(value);
    onViewChange(value);
  };

  return (
    <div className="flex flex-col bg-sidebar">
      <div className="flex items-center w-full p-1 px-3 gap-4 rounded-md">
        <div className="flex gap-1 p-1 rounded-md bg-border">
          {byBtn.map((btn) => (
            <Button
              key={btn.value}
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 text-sm ${
                activeView === btn.value ? "bg-white" : ""
              }`}
              onClick={() => handleViewChange(btn.value)}
            >
              {btn.icon}
              {btn.label}
            </Button>
          ))}
        </div>

        <div className="flex-1 flex items-center pl-4 box-content relative border-l-2 border-border">
          <Search className="h-4 w-4 absolute left-2  text-gray-500 ml-4" />
          <Input
            placeholder="Search Data..."
            className="h-10 bg-background pl-8 w-full"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="w-32 h-10 flex items-center gap-1 hover:bg-border"
          onClick={() => setShowFilter(!showFilter)}
        >
          <ListFilter className="h-4 w-4 mb-1" />
          <p className="text-sm">Data Filter</p>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              showFilter ? "rotate-180" : ""
            )}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="bg-orange-800 text-primary-foreground hover:bg-orange-800/80"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {showFilter && <FilterBar />}
    </div>
  );
}
