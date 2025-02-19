"use client";
import React, { useState, useEffect } from "react";
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
import { ArrowRight } from "lucide-react";
import {
  getCommunitySheet,
  type CommunitySheetResponse,
} from "@/api/communitySheet";
import DocumentSheet from "./documentSheet";
import { useDispatch } from "react-redux";
import {
  setPath,
  setPathIds,
  setCommunityNumber,
  setTextUnitIds,
} from "@/redux/features/navigationSlice";
// import type { RootState } from "@/redux/store";
import { useContext } from "react";
import { NavDataContext } from "@/redux/provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CommunitySheetProps {
  selectedCommunity?: {
    id: string;
    type: string;
    label: string;
    community: number;
    level: number;
    size: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunitySheet({
  selectedCommunity,
  isOpen,
  onClose,
}: CommunitySheetProps) {
  const dispatch = useDispatch();
  const navData = useContext(NavDataContext);
  // const selectedPath = useSelector(
  //   (state: RootState) => state.navigation.selectedPath
  // );
  const [communitySheet, setCommunitySheet] =
    useState<CommunitySheetResponse | null>(null);
  const [isDocumentSheetOpen, setIsDocumentSheetOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    title: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchCommunitySheet = async () => {
      if (!selectedCommunity?.id) return;

      try {
        const sheet = await getCommunitySheet(selectedCommunity.id);
        setCommunitySheet(sheet);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunitySheet();
  }, [selectedCommunity?.id]);

  const handleDocumentClick = (doc: { title: string; text: string }) => {
    setSelectedDocument(doc);
    setIsDocumentSheetOpen(true);
  };

  const handleExpandDetails = () => {
    if (!selectedCommunity || !navData) return;

    // Find the graph that contains this community
    const graph = navData.graph.find((g) =>
      g.communities.some((c) => c.community_id === selectedCommunity.id)
    );

    if (graph) {
      // Set new path
      const newPath = ["All Data", graph.graph_name, selectedCommunity.label];
      dispatch(setPath(newPath));

      // Set path IDs
      const pathIds = ["company_1", graph.graph_id, selectedCommunity.id];
      dispatch(setPathIds(pathIds));

      // Set community number and text unit IDs
      dispatch(setCommunityNumber(selectedCommunity.community));
      const community = graph.communities.find(
        (c) => c.community_id === selectedCommunity.id
      );
      if (community) {
        dispatch(setTextUnitIds(community.text_unit_ids));
      }
    }
  };

  if (!selectedCommunity) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
        <SheetContent className="w-[400px] shadow-lg overflow-hidden flex flex-col">
          <SheetHeader className="flex-none">
            <SheetTitle className="flex items-center gap-2">
              {selectedCommunity.label}
            </SheetTitle>
            <SheetDescription>
              View community information and related documents
            </SheetDescription>
          </SheetHeader>

          {/* <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-medium">{selectedCommunity.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{selectedCommunity.type}</span>
            </div>
          </div> */}
          <div className="">
            <Button
              variant="default"
              className="w-full"
              onClick={handleExpandDetails}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Expand details</span>
                <ArrowRight />
              </div>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto pr-6 -mr-6 scrollbar-none">
            <div className="flex flex-col w-full gap-4">
              <div className="text-sm text-muted-foreground">
                {communitySheet?.summary}
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <p>Community Level: {selectedCommunity.level}</p>
                      <p>Community Size: {selectedCommunity.size}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rank">
                  <AccordionTrigger>
                    Rank: {communitySheet?.rank}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {communitySheet?.rank_explanation}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {communitySheet?.documents &&
                  communitySheet?.documents.length > 0 && (
                    <AccordionItem value="documents">
                      <AccordionTrigger>Documents</AccordionTrigger>
                      <AccordionContent>
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Document Title</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {communitySheet?.documents.map((doc, index) => (
                                <TableRow
                                  key={`${doc.id}-${index}`}
                                  className="cursor-pointer hover:bg-muted/50"
                                  onClick={() =>
                                    handleDocumentClick({
                                      title: doc.title,
                                      text: doc.text,
                                    })
                                  }
                                >
                                  <TableCell className="text-sm text-orange-700 underline cursor-pointer">
                                    {doc.title}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
              </Accordion>
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-4 border-t flex-none">
            <Button variant="outline">Edit</Button>
          </div>
        </SheetContent>
      </Sheet>

      {isDocumentSheetOpen && (
        <DocumentSheet
          document={{
            title: selectedDocument?.title || "",
            text: selectedDocument?.text || "",
          }}
          isOpen={isDocumentSheetOpen}
          onClose={() => setIsDocumentSheetOpen(false)}
        />
      )}
    </>
  );
}
