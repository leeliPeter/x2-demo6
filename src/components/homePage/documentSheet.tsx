import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface DocumentSheetProps {
  document: {
    title: string;
    text: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentSheet({
  document,
  isOpen,
  onClose,
}: DocumentSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] shadow-lg overflow-hidden flex flex-col">
        <SheetHeader className="flex-none">
          <SheetTitle className="flex items-center gap-2">
            {document.title}
          </SheetTitle>
          <SheetDescription>View document content</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scrollbar-none mt-4">
          <div className="text-sm whitespace-pre-wrap">{document.text}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
