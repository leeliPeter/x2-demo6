"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Graph() {
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );

  return (
    <div className="w-full h-full p-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">
          {selectedPath[selectedPath.length - 1]}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Current Path:</span>
          <span>{selectedPath.join(" > ")}</span>
        </div>
      </div>
    </div>
  );
}
