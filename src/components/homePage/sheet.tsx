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
import { nodeSheet, communitySheet } from "@/data/sheetData";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface NodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: {
    id: string;
    title: string;
    level: number;
    // Community node properties
    size?: number;
    // Entity node properties
    degree?: number;
    category?: string;
    type?: string;
  } | null;
}

export function NodeSheet({ isOpen, onClose, selectedNode }: NodeSheetProps) {
  if (!selectedNode) return null;

  const isCommunity = selectedNode.type === "community";

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocs(communitySheet.documents.map((d) => d.document_id));
    } else {
      setSelectedDocs([]);
    }
  };

  const toggleOne = (checked: boolean, docId: string) => {
    if (checked) {
      setSelectedDocs([...selectedDocs, docId]);
    } else {
      setSelectedDocs(selectedDocs.filter((id) => id !== docId));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
      <SheetContent className="w-[400px] sm:w-[540px] shadow-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {selectedNode.title}
          </SheetTitle>
          <div className="flex flex-col w-full gap-4">
            {isCommunity ? (
              // Community content
              <>
                <div className="text-sm text-muted-foreground">
                  {communitySheet.summary}
                </div>
                <div className="w-full flex justify-end">
                  <Button className="w-full flex items-center gap-2">
                    Expand details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <p>Community Level: {selectedNode.level}</p>
                        <p>Community Size: {selectedNode.size}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rank">
                    <AccordionTrigger>
                      Rank: {communitySheet.rank}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        {communitySheet.rank_explanation}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="full_content">
                    <AccordionTrigger>Full Content</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        {communitySheet.full_content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Cited Documents">
                    <AccordionTrigger>Cited Documents</AccordionTrigger>
                    <AccordionContent>
                      <Table className="border ">
                        <TableHeader>
                          <TableRow className="border-b  hover:bg-muted/50">
                            <TableHead className="w-12 h-12 ">
                              <Checkbox
                                checked={
                                  selectedDocs.length ===
                                  communitySheet.documents.length
                                }
                                onCheckedChange={toggleAll}
                              />
                            </TableHead>
                            <TableHead>Document Name</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {communitySheet.documents.map((doc) => (
                            <TableRow
                              key={doc.document_id}
                              className="border-b hover:bg-muted/50"
                            >
                              <TableCell className="w-12 ">
                                <Checkbox
                                  checked={selectedDocs.includes(
                                    doc.document_id
                                  )}
                                  onCheckedChange={(checked) =>
                                    toggleOne(
                                      checked as boolean,
                                      doc.document_id
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell className="text-sm">
                                {doc.document_title}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ) : (
              // Entity node content
              <>
                <div className="text-sm text-muted-foreground">
                  {nodeSheet.description}
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <p>Type: {selectedNode.category}</p>
                        <div className="flex gap-2">
                          <p>Node Level: {selectedNode.level},</p>
                          <p>Node Degree: {selectedNode.degree}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
            <div className="flex justify-end mt-4">
              <Button variant="outline">Edit</Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
