"use client";

import { ChevronRight, PanelLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import {
  setPath,
  setPathIds,
  setTextUnitIds,
} from "@/redux/features/navigationSlice";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  onToggle: () => void;
}

export function Breadcrumb({ onToggle }: BreadcrumbProps) {
  const dispatch = useDispatch();
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );
  const pathname = usePathname();

  const handleBreadcrumbClick = (index: number) => {
    const newPath = selectedPath.slice(0, index + 1);

    // Reset to initial state when clicking "All Data"
    if (newPath[0] === "All Data" && newPath.length === 1) {
      dispatch(setPath(["All Data"]));
      dispatch(setPathIds(["company_1"]));
      dispatch(setTextUnitIds([]));
    } else {
      dispatch(setPath(newPath));
    }
  };

  return (
    <div className="flex h-1 items-center gap-4 text-sm text-muted-foreground">
      <div className="h-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="-ml-2 pr-2 border-border border-r-2 rounded-none h-full"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {pathname === "/projects" ? (
          <div className="flex items-center">Projects</div>
        ) : (
          selectedPath.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="hover:text-foreground transition-colors"
              >
                {item}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
