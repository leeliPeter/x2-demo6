"use client";

import { cn } from "@/lib/utils";
import { MessageCircleMore, Bot, Settings2 } from "lucide-react";
import ChatBoxCard from "@/components/joshsua/chatBoxCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbProps {
  className?: string;
  setRightSidebarOpen: (open: boolean) => void;
  rightSidebarOpen: boolean;
}

export function ProjectBreadcrumb({
  className,
  setRightSidebarOpen,
  rightSidebarOpen,
}: BreadcrumbProps) {
  return (
    <div
      className={cn(
        "p-4 border-b h-[49px] flex items-center justify-between",
        className
      )}
    >
      <div className="flex w-full items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <p className="text-xs text-sidebar-foreground">GeniAltX</p>
          <p className="text-xs text-orange-400 bg-orange-800 rounded-md px-2 py-1">
            X2.alpha
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 border-1 border border-foreground rounded-md px-2 py-1 cursor-pointer hover:bg-muted/50">
                <MessageCircleMore className="h-4 w-4" />
                <p className="text-sm">Ask AI</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[450px] bg-gray-100">
              <ChatBoxCard />
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className={cn(
              "group p-2 rounded-md cursor-pointer",
              rightSidebarOpen && "bg-foreground"
            )}
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          >
            <Bot
              className={cn(
                "h-4 w-4 text-sidebar-foreground",
                rightSidebarOpen && "text-background"
              )}
            />
          </div>
          <div className="group p-2 rounded-md cursor-pointer hover:bg-border">
            <Settings2 className="h-4 w-4 text-sidebar-foreground " />
          </div>
        </div>
      </div>
    </div>
  );
}
