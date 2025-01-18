"use client";
import React, { useState, useEffect } from "react";
import { getNodeSheet, type NodeSheetResponse } from "@/api/nodesheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentSheet from "./documentSheet";

interface NodeSheetProps {
  selectedNode?: {
    id: string;
    title: string;
    level: number;
    degree?: number;
    category?: string;
    type: string;
  };
}

export default function NodeSheet({ selectedNode }: NodeSheetProps) {
  const [nodeSheet, setNodeSheet] = useState<NodeSheetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectedTextUnits, setSelectedTextUnits] = useState<string[]>([]);
  const [isDocumentSheetOpen, setIsDocumentSheetOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchNodeSheet = async () => {
      if (!selectedNode?.id) return;

      try {
        const data = await getNodeSheet(selectedNode.id);
        if (isMounted) {
          setNodeSheet(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setError(
            error instanceof Error ? error.message : "Failed to fetch data"
          );
        }
      }
    };

    fetchNodeSheet();
    return () => {
      isMounted = false;
    };
  }, [selectedNode?.id]);

  if (!selectedNode?.id) return null;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!nodeSheet) return <div>Loading...</div>;

  const handleTextUnitClick = (unitId: string) => {
    setSelectedTextUnits([unitId]);
    setIsDocumentSheetOpen(true);
  };

  return (
    <>
      <Sheet open={true} modal={false}>
        <SheetContent className="w-[400px] shadow-lg overflow-hidden flex flex-col">
          <SheetHeader className="flex-none">
            <SheetTitle className="flex items-center gap-2">
              {selectedNode.title}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-4 pr-0">
              <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-medium">{selectedNode.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{selectedNode.category}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <h3 className="font-medium mb-2">Description</h3>
                <p>{nodeSheet.description || "No description"}</p>
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

                <AccordionItem value="text_units">
                  <AccordionTrigger>Text Units</AccordionTrigger>
                  <AccordionContent>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Text Content</TableHead>
                            <TableHead>Cited document</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {nodeSheet.text_units.map((unit) => (
                            <TableRow
                              key={unit.id}
                              className="border-b hover:bg-muted/50 h-10"
                            >
                              <TableCell
                                className="text-sm text-orange-700 underline cursor-pointer"
                                title={unit.text}
                                onClick={() => handleTextUnitClick(unit.id)}
                              >
                                {unit.text.slice(0, 10)}
                                {unit.text.length > 10 ? "..." : ""}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {unit.document.title}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-4 border-t flex-none">
            <Button variant="outline">Edit</Button>
          </div>
        </SheetContent>
      </Sheet>

      <DocumentSheet
        isOpen={isDocumentSheetOpen}
        onClose={() => setIsDocumentSheetOpen(false)}
        selectedTextUnits={selectedTextUnits}
        textUnits={nodeSheet?.text_units.map((unit) => ({
          text_unit_id: unit.id,
          text: unit.text,
        }))}
      />
    </>
  );
}
