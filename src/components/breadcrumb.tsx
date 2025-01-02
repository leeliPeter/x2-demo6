"use client";

import { ChevronRight, Home, Menu, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BreadcrumbProps {
  onToggle: () => void;
}

export function Breadcrumb({ onToggle }: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex h-1 items-center gap-4 text-sm text-muted-foreground">
      <div className="h-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="-ml-2 pr-2 border-border border-r-2 rounded-none h-full"
        >
          <PanelLeft />
        </Button>
      </div>
    </div>
  );
}
