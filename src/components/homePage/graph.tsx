"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Graph() {
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );
  const selectedFilters = useSelector(
    (state: RootState) => state.filter.selectedFilters
  );

  return (
    <div className="w-full h-full p-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">
          {selectedPath[selectedPath.length - 1]}
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Current Path:</span>
            <span>{selectedPath.join(" > ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([label, value]) => (
                <span key={label} className="bg-gray-100 px-2 py-1 rounded-md">
                  {label}: {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
