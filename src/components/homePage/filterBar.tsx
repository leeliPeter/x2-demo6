"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleChevronDown } from "lucide-react";
import { filter } from "@/data/filterData";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/features/filterSlice";
import { RootState } from "@/redux/store";

export function FilterBar() {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state: RootState) => state.filter.selectedFilters
  );

  const handleFilterChange = (label: string, value: string) => {
    dispatch(setFilter({ label, value }));
  };

  return (
    <div className="flex items-center gap-4 w-full p-3 border-t-2 border-border mt-1 overflow-x-auto">
      {filter.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-start text-xs gap-2 flex-1"
        >
          <p>{item.label}</p>
          <div className="relative w-full">
            <Select
              value={selectedFilters[item.label]}
              onValueChange={(value) => handleFilterChange(item.label, value)}
            >
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
