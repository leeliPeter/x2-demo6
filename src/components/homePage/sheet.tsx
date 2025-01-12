"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: {
    level: number;
    description: string;
    communityName: string;
    communityReport: string;
    citedDocuments: string;
    title: string;
  } | null;
}

export function NodeSheet({ isOpen, onClose, selectedNode }: NodeSheetProps) {
  if (!selectedNode) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
      <SheetContent
        className="w-[400px] sm:w-[540px] shadow-lg"
        style={{ backgroundColor: "white" }}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {selectedNode.title}
            {typeof selectedNode.level === "number" && (
              <span className="text-sm text-muted-foreground">
                Level {selectedNode.level}
              </span>
            )}
          </SheetTitle>
          <div className="flex flex-col w-full gap-4">
            <p className="text-sm text-muted-foreground">
              {selectedNode.description}
            </p>
            <Button variant="primary">Expand detail</Button>
            <Accordion
              type="single"
              collapsible
              className="w-full mt-5 text-foreground"
            >
              <AccordionItem value="community-name">
                <AccordionTrigger className="text-base">
                  Community Name
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {selectedNode.communityName}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="community-report">
                <AccordionTrigger className="text-base">
                  Community Report
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {selectedNode.communityReport}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cited-documents">
                <AccordionTrigger className="text-base">
                  Cited Documents
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {selectedNode.citedDocuments}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end mt-4">
              <Button variant="outline">Edit</Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
