"use client";
import React, { useState, useEffect } from "react";
import {
  getCommunitySheet,
  type CommunitySheetResponse,
} from "@/api/communitySheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
    <Sheet open={!!selectedCommunity} onOpenChange={onClose}>
      <SheetContent className="w-[400px] shadow-lg overflow-hidden flex flex-col">
        <SheetHeader className="flex-none">
          <SheetTitle className="flex items-center gap-2">
            {selectedCommunity.label}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scrollbar-none">
          <div className="flex flex-col gap-4 pr-0">
            <div className="flex flex-col gap-2 p-2 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{selectedCommunity.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{selectedCommunity.type}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Details</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Community: {selectedCommunity.community}</div>
                  <div>Level: {selectedCommunity.level}</div>
                  <div>Size: {selectedCommunity.size}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {communitySheet?.summary}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Rank Information</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>Rank: {communitySheet?.rank}</div>
                  <div>Explanation: {communitySheet?.rank_explanation}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Documents</h3>
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
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
