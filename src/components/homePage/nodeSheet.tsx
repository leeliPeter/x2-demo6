"use client";
import React, { useState, useEffect } from "react";
import { getNodeSheet, type NodeSheetResponse } from "@/api/nodesheet";

interface NodeSheetProps {
  entityId: string;
}

export default function NodeSheet({ entityId }: NodeSheetProps) {
  const [nodeSheet, setNodeSheet] = useState<NodeSheetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodeSheet = async () => {
      try {
        const data = await getNodeSheet(entityId);
        setNodeSheet(data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
      }
    };

    fetchNodeSheet();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!nodeSheet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {nodeSheet.description}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text Units</h3>
        {nodeSheet.text_units.map((unit) => (
          <div key={unit.id} className="text-sm">
            <p className="text-muted-foreground">{unit.text}</p>
            <p className="text-xs text-muted-foreground/60">
              From: {unit.document.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
