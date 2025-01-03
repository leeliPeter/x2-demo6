"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleChevronDown } from "lucide-react";

export function FilterBar() {
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
    <div className="flex items-center gap-4 w-full p-3  border-t-2 border-border mt-1 overflow-x-auto">
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
