"use client";
import React, { useState, useEffect } from "react";
import {
  getCommunitySheet,
  type CommunitySheetResponse,
} from "@/api/communitySheet";

interface CommunitySheetProps {
  communityId: string;
}

export default function CommunitySheet({ communityId }: CommunitySheetProps) {
  const [communitySheet, setCommunitySheet] =
    useState<CommunitySheetResponse | null>(null);

  useEffect(() => {
    const fetchCommunitySheet = async () => {
      const sheet = await getCommunitySheet(communityId);
      setCommunitySheet(sheet);
      console.log(sheet);
    };
    fetchCommunitySheet();
  }, []);

  return <div>{communitySheet?.summary}</div>;
}
