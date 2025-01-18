"use client";
import { useState, useEffect } from "react";
import { getDocuments } from "@/api/documents";
import type { Document } from "@/api/documents";

export default function Page() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <pre className="bg-slate-100 p-4 rounded-lg overflow-auto max-h-[80vh]">
        {JSON.stringify(documents, null, 2)}
      </pre>
    </div>
  );
}
