"use client";
import React, { useState, useEffect } from "react";
import { getNodeSheet, type NodeSheetResponse } from "@/api/nodesheet";

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

  return (
    <div className="fixed top-0 right-0 w-96 h-screen bg-white shadow-lg z-50">
      <div className="p-4">Title: {selectedNode.title}</div>
      <div className="h-[calc(100vh-60px)] overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="text-sm text-muted-foreground">
            Description: {nodeSheet.description || "No description"}
          </div>
          <div className="text-sm text-muted-foreground">
            Detail:
            <div>type: {selectedNode.category}</div>
            <div>Level: {selectedNode.level}</div>
            <div>Degree: {selectedNode.degree}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Text Units:
            <div className="space-y-2">
              {nodeSheet.text_units.map((unit) => (
                <div key={unit.id} className="hover:bg-gray-100 p-2 rounded">
                  {unit.text.slice(0, 10)}
                  {unit.text.length > 10 ? "..." : ""}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Documents:
            <div className="space-y-2">
              {nodeSheet.text_units.map((unit) => (
                <div key={unit.id} className="hover:bg-gray-100 p-2 rounded">
                  {unit.document.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
