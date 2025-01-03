"use client";

import { ChevronRight, Home, PanelLeft } from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { setPath } from "@/redux/features/navigationSlice";

interface BreadcrumbProps {
  onToggle: () => void;
}

export function Breadcrumb({ onToggle }: BreadcrumbProps) {
  const dispatch = useDispatch();
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );

  const handleBreadcrumbClick = (index: number) => {
    // When clicking a breadcrumb item, update path to include only items up to clicked index
    const newPath = selectedPath.slice(0, index + 1);
    dispatch(setPath(newPath));
  };

  return (
    <div className="flex h-1 items-center gap-4 text-sm text-muted-foreground">
      <div className="h-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="-ml-2 pr-2 border-border border-r-2 rounded-none h-full"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {selectedPath.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className="hover:text-foreground transition-colors"
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
