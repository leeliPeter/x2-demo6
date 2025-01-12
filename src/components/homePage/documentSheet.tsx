import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { communitySheet, nodeSheet } from "@/data/sheetData";

interface DocumentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDocs?: string[];
  selectedTextUnits?: string[];
}

export default function DocumentSheet({
  isOpen,
  onClose,
  selectedDocs = [],
  selectedTextUnits = [],
}: DocumentSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[600px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Documents</SheetTitle>
          <SheetDescription>
            View related documents and their content
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          {/* Node Sheet Documents */}
          {selectedTextUnits.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Node Documents</h3>
              {nodeSheet.text_units
                .filter((unit) => selectedTextUnits.includes(unit.text_unit_id))
                .map((unit) => (
                  <div key={unit.text_unit_id} className="mb-4">
                    <div className="whitespace-pre-wrap text-sm">
                      {unit.text}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Community Sheet Documents */}
          {selectedDocs.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Community Documents</h3>
              {communitySheet.documents
                .filter((doc) => selectedDocs.includes(doc.document_id))
                .map((doc) => (
                  <div key={doc.document_id} className="mb-4">
                    <h4 className="text-sm font-medium mb-1">
                      {doc.document_title}
                    </h4>
                    <div className="whitespace-pre-wrap text-sm">
                      {doc.document_text}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
