"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { navItems } from "@/data/navData";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/navigationSlice";
import { cn } from "@/lib/utils";

interface SourceListProps {
  selectedPath: string[];
  selectedFilters: {
    [key: string]: string;
  };
}

export default function SourceList({
  selectedPath,
  selectedFilters,
}: SourceListProps) {
  const dispatch = useDispatch();

  const getCurrentLevelData = () => {
    let currentItems = navItems[0].children || [];

    for (let i = 1; i < selectedPath.length; i++) {
      const pathItem = selectedPath[i];
      const found = currentItems.find(
        (item) => item.title === pathItem
      )?.children;
      if (found) {
        currentItems = found;
      }
    }

    return currentItems;
  };

  const handleRowClick = (item: { title: string; children?: any[] }) => {
    if (item.children) {
      const newPath = [...selectedPath, item.title];
      dispatch(setPath(newPath));
    }
  };

  const currentData = getCurrentLevelData();

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
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(item)}
                  className={cn(
                    "cursor-pointer",
                    item.children && "hover:bg-muted/80"
                  )}
                >
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {[...selectedPath.slice(1), item.title].join(" > ")}
                  </TableCell>
                  <TableCell>{item.size || "-"}</TableCell>
                  <TableCell>{item.date || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
