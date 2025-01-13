"use client";

import { Button } from "@/components/ui/button";
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
import DocumentSheet from "@/components/homePage/documentSheet";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPath, setCommunityNumber } from "@/redux/features/navigationSlice";
import { navData } from "@/data/navData";

interface NodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: {
    id: string;
    title: string;
    level: number;
    // Community node properties
    size?: number;
    community?: number;
    // Entity node properties
    degree?: number;
    category?: string;
    type?: string;
  } | null;
}

export function NodeSheet({ isOpen, onClose, selectedNode }: NodeSheetProps) {
  const dispatch = useDispatch();
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectedTextUnits, setSelectedTextUnits] = useState<string[]>([]);
  const [isDocumentSheetOpen, setIsDocumentSheetOpen] = useState(false);

  if (!selectedNode) return null;

  const isCommunity = selectedNode.type === "community";

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

  const toggleAllTextUnits = (checked: boolean) => {
    if (checked) {
      setSelectedTextUnits(
        nodeSheet.text_units.map((unit) => unit.text_unit_id)
      );
    } else {
      setSelectedTextUnits([]);
    }
  };

  const toggleOneTextUnit = (checked: boolean, unitId: string) => {
    if (checked) {
      setSelectedTextUnits([...selectedTextUnits, unitId]);
    } else {
      setSelectedTextUnits(selectedTextUnits.filter((id) => id !== unitId));
    }
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocs([docId]);
    setIsDocumentSheetOpen(true);
  };

  const handleTextUnitClick = (unitId: string) => {
    setSelectedTextUnits([unitId]);
    setIsDocumentSheetOpen(true);
  };

  const handleExpandDetails = () => {
    if (!selectedNode || selectedNode.type !== "community") return;

    // Find the graph that contains this community
    for (const graph of navData.graph) {
      const community = graph.communities.find(
        (c) => c.community === selectedNode.community
      );

      if (community) {
        // Set the path: [All Data, Graph Name, Community Title]
        dispatch(
          setPath(["All Data", graph.graph_name, community.community_title])
        );
        // Set the community number
        dispatch(setCommunityNumber(selectedNode.community || null));
        onClose(); // Close the sheet after navigation
        return;
      }
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
        <SheetContent className="w-[400px]  shadow-lg">
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
                    <Button
                      className="w-full flex items-center gap-2"
                      onClick={handleExpandDetails}
                    >
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
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b hover:bg-muted/50">
                                <TableHead className="w-12 h-12">
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
                                  className="border-b hover:bg-muted/50 h-10"
                                >
                                  <TableCell className="w-12">
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
                                  <TableCell
                                    className="text-sm text-orange-700 underline cursor-pointer"
                                    onClick={() =>
                                      handleDocumentClick(doc.document_id)
                                    }
                                  >
                                    {doc.document_title}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
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
                    <AccordionItem value="text_units">
                      <AccordionTrigger>Text Units</AccordionTrigger>
                      <AccordionContent>
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Text Content</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {nodeSheet.text_units.map((unit) => (
                                <TableRow
                                  key={unit.text_unit_id}
                                  className="border-b hover:bg-muted/50 h-10"
                                >
                                  <TableCell
                                    className="text-sm text-orange-700 underline cursor-pointer"
                                    title={unit.text}
                                    onClick={() =>
                                      handleTextUnitClick(unit.text_unit_id)
                                    }
                                  >
                                    {unit.text.slice(0, 10)}...
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
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
      <DocumentSheet
        isOpen={isDocumentSheetOpen}
        onClose={() => setIsDocumentSheetOpen(false)}
        selectedDocs={selectedDocs}
        selectedTextUnits={selectedTextUnits}
        documents={communitySheet.documents}
        textUnits={nodeSheet.text_units}
      />
    </>
  );
}
