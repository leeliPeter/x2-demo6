"use client";

import { FilePenLine, FileText, Plus, Waypoints } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const dropdownItems = [
  {
    title: "Add New Graph",
    icon: <Waypoints className="h-4 w-4" />,
  },
  {
    title: "Add New Source Document",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Add New Community",
    icon: <FilePenLine className="h-4 w-4" />,
  },
];

export function AddBtn() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-all" />
      )}
      <div className="fixed bottom-12 right-12 z-50">
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div className="bg-orange-800 rounded-xl p-2 cursor-pointer shadow-lg hover:bg-foreground transition-colors">
              <Plus className="text-white font-thin" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-transparent border-none shadow-none flex flex-col items-end"
          >
            {dropdownItems.map((item) => (
              <DropdownMenuItem
                key={item.title}
                className="flex items-center justify-end gap-3 cursor-pointer px-4 py-2 text-black bg-background mb-2 rounded-lg transition-colors w-fit"
              >
                {item.icon}
                <span>{item.title}</span>
                <Plus />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
