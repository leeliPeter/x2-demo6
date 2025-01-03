"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleChevronDown, Minus } from "lucide-react";
import { filter } from "@/data/filterData";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "@/redux/features/filterSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";

export function FilterBar() {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state: RootState) => state.filter.selectedFilters
  );
  const [selectKeys, setSelectKeys] = useState<{ [key: string]: number }>({});

  const handleFilterChange = (label: string, value: string | undefined) => {
    if (value) {
      dispatch(setFilter({ label, value }));
    } else {
      dispatch(clearFilter(label));
    }
  };

  const handleClearFilter = (label: string) => {
    dispatch(clearFilter(label));
    // Force Select component to re-render with new key
    setSelectKeys((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  return (
    <div className="flex items-center gap-4 w-full p-3 border-t-2 border-border mt-1 overflow-x-auto">
      {filter.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-start text-xs gap-2 flex-1"
        >
          <div className="flex items-center px-1 justify-between w-full">
            <p>{item.label}</p>
            {selectedFilters[item.label] && (
              <Minus
                className="h-4 w-4 bg-foreground text-white rounded-sm cursor-pointer hover:bg-foreground/80"
                onClick={() => handleClearFilter(item.label)}
              />
            )}
          </div>
          <div className="relative w-full">
            <Select
              key={`${item.label}-${selectKeys[item.label] || 0}`}
              value={selectedFilters[item.label]}
              onValueChange={handleFilterChange.bind(null, item.label)}
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
