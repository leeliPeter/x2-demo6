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

interface CommunitySheetProps {
  selectedCommunity?: {
    id: string;
    type: string;
    label: string;
    community: number;
    level: number;
    size: number;
  } | null;
  onClose: () => void;
}

export default function CommunitySheet({
  selectedCommunity,
  onClose,
}: CommunitySheetProps) {
  const [communitySheet, setCommunitySheet] =
    useState<CommunitySheetResponse | null>(null);

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

  if (!selectedCommunity) return null;

  return (
    <Sheet open={!!selectedCommunity} onOpenChange={onClose} modal={false}>
      <SheetContent className="w-[400px] shadow-lg overflow-hidden flex flex-col">
        <SheetHeader className="flex-none">
          <SheetTitle className="flex items-center gap-2">
            {selectedCommunity.label}
          </SheetTitle>
          <SheetDescription>
            View community information and related documents
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">ID:</span>
            <span className="font-medium">{selectedCommunity.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{selectedCommunity.type}</span>
          </div>
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

              <AccordionItem value="documents">
                <AccordionTrigger>Documents</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {communitySheet?.documents.map((doc, index) => (
                      <div
                        key={`${doc.id}-${index}`}
                        className="text-sm space-y-2 p-4 bg-muted/10 rounded-lg"
                      >
                        <div className="font-medium text-primary">
                          {doc.title}
                        </div>
                        <div className="text-muted-foreground whitespace-pre-wrap">
                          {doc.text}
                        </div>
                      </div>
                    ))}
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
  );
}
