"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useMemo, useEffect } from "react";
import { getDocuments } from "@/api/documents";
import type { Document } from "@/api/documents";
import DocumentSheet from "./documentSheet";
import Loading from "@/components/loading";

interface SourceListProps {
  selectedPath: string[];
  selectedFilters: {
    [key: string]: string;
  };
}

export default function SourceList({ selectedPath }: SourceListProps) {
  const selectedTextUnitIds = useSelector(
    (state: RootState) => state.navigation.selectedTextUnitIds
  );
  const selectedPathIds = useSelector(
    (state: RootState) => state.navigation.selectedPathIds
  );
  const [isDocumentSheetOpen, setIsDocumentSheetOpen] = useState(false);
  const [viewingDocId, setViewingDocId] = useState<string[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const currentGraphDocs = useMemo(() => {
    if (selectedTextUnitIds.length === 0) {
      return documents;
    }

    return documents.filter((doc) =>
      doc.text_unit_ids.some((textUnitId) =>
        selectedTextUnitIds.includes(textUnitId)
      )
    );
  }, [documents, selectedTextUnitIds]);

  const handleDocumentClick = (document: Document) => {
    setViewingDocId([document.id]);
    setIsDocumentSheetOpen(true);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="w-full h-full p-6">
        {/* {selectedTextUnitIds.length > 0 && (
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Selected Text Units:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTextUnitIds.map((id) => (
                <span
                  key={id}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {/* {selectedPathIds[1] && (
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Selected Graph:</h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              {selectedPathIds[1]}
            </span>
          </div>
        )} */}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
            {selectedPathIds[1] ? (
              <>
                All the document cited by
                <p className="text-foreground font-border">
                  {selectedPath[selectedPath.length - 1]}
                </p>
                :
              </>
            ) : (
              "All Documents:"
            )}
          </h2>
          <div className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Title</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGraphDocs.map((doc) => (
                    <TableRow key={doc.id} className="h-10">
                      <TableCell
                        className="font-medium text-orange-700 underline cursor-pointer hover:bg-muted/80"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        {doc.title}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <DocumentSheet
        document={{
          title: documents.find((d) => d.id === viewingDocId[0])?.title || "",
          text: documents.find((d) => d.id === viewingDocId[0])?.text || "",
        }}
        isOpen={isDocumentSheetOpen}
        onClose={() => setIsDocumentSheetOpen(false)}
      />
    </>
  );
}
