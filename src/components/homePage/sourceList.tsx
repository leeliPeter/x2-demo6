"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sourceList } from "@/data/sourceList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DocumentSheet from "./documentSheet";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface SourceListProps {
  selectedPath: string[];
  selectedFilters: {
    [key: string]: string;
  };
}

interface Document {
  document_id: string;
  document_title: string;
  document_content: string;
}

export default function SourceList({
  selectedPath,
  selectedFilters,
}: SourceListProps) {
  const selectedTextUnitIds = useSelector(
    (state: RootState) => state.navigation.selectedTextUnitIds
  );
  const [isDocumentSheetOpen, setIsDocumentSheetOpen] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [viewingDocId, setViewingDocId] = useState<string[]>([]);

  const handleDocumentClick = (document: Document) => {
    setViewingDocId([document.document_id]);
    setIsDocumentSheetOpen(true);
  };

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocIds(sourceList.documents.map((doc) => doc.document_id));
    } else {
      setSelectedDocIds([]);
    }
  };

  const toggleOne = (checked: boolean, docId: string) => {
    if (checked) {
      setSelectedDocIds((prev) => [...prev, docId]);
    } else {
      setSelectedDocIds((prev) => prev.filter((id) => id !== docId));
    }
  };

  const transformedDocs = sourceList.documents.map((doc) => ({
    document_id: doc.document_id,
    document_title: doc.document_title,
    document_text: doc.document_content,
  }));

  return (
    <>
      <div className="w-full h-full p-6">
        {selectedTextUnitIds.length > 0 && (
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
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground">
            All the document cited by
            <p className="text-foreground font-border ">
              {selectedPath[selectedPath.length - 1]}
            </p>
            :
          </h2>
          {/* <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Current Path:</span>
              <span>{selectedPath.join(" > ")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Active Filters:</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([label, value]) => (
                  <span
                    key={label}
                    className="bg-gray-100 px-2 py-1 rounded-md"
                  >
                    {label}: {value}
                  </span>
                ))}
              </div>
            </div>
          </div> */}
          <div className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] h-[42px]">
                      <Checkbox
                        checked={
                          selectedDocIds.length === sourceList.documents.length
                        }
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>Document Title</TableHead>
                    <TableHead>ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourceList.documents.map((doc) => (
                    <TableRow key={doc.document_id} className="h-10">
                      <TableCell className="w-[50px]">
                        <Checkbox
                          checked={selectedDocIds.includes(doc.document_id)}
                          onCheckedChange={(checked) =>
                            toggleOne(checked as boolean, doc.document_id)
                          }
                        />
                      </TableCell>
                      <TableCell
                        className="font-medium text-orange-700 underline cursor-pointer hover:bg-muted/80"
                        onClick={() => handleDocumentClick(doc)}
                      >
                        {doc.document_title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {doc.document_id}
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
        isOpen={isDocumentSheetOpen}
        onClose={() => setIsDocumentSheetOpen(false)}
        selectedDocs={viewingDocId}
        selectedTextUnits={selectedTextUnitIds}
        documents={transformedDocs}
        textUnits={[]}
      />
    </>
  );
}
