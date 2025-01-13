"use client";

import { cn } from "@/lib/utils";
import { Bot, X } from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectRightSidebar({ isOpen, onClose }: RightSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
        <button onClick={onClose} className="rounded-md p-1 hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100vh-57px)] flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {/* Chat messages will go here */}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-muted-foreground hover:text-foreground">
              <Bot className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
