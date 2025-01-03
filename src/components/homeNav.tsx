"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menu,
  Search,
  ListFilter,
  Plus,
  Waypoints,
  CircleChevronDown,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function FilterBar() {
  const filter = [
    {
      label: "Level",
      value: ["Level 0", "Level 1", "Level 2", "Level 3"],
    },
    {
      label: "Type",
      value: ["Inbound", "Outbound"],
    },
    {
      label: "Community Size",
      value: ["Small", "Medium", "Large"],
    },
    {
      label: "Source",
      value: ["Source 0", "Source 1", "Source 2", "Source 3"],
    },
    {
      label: "Status",
      value: ["Active", "Inactive"],
    },
  ];

  return (
    <div className="flex items-center gap-4 w-full p-2 pl-3 border-t-2 border-border mt-1 overflow-x-auto">
      {filter.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-start text-xs gap-2 flex-1"
        >
          <p>{item.label}</p>
          <div className="relative w-full">
            <Select>
              <SelectTrigger className="h-[37px] pl-8 text-xs bg-background w-full min-w-[180px]">
                <CircleChevronDown className="h-4 w-4 absolute left-2 top-[10px]" />
                <SelectValue placeholder="Select.." />
              </SelectTrigger>
              <SelectContent className="w-full min-w-[180px]">
                {item.value.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomeNav() {
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

  return (
    <div className="flex flex-col bg-sidebar  ">
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
              onClick={() => setActiveView(btn.value)}
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
