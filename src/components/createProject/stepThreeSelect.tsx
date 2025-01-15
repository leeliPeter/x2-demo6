import React, { useState } from "react";
import { createProjectDocument } from "@/data/createProjectDocument";
import { CircleCheckbox } from "@/components/ui/circle-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import DocumentSheet from "@/components/homePage/documentSheet";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface StepThreeSelectProps {
  selectedDocs: string[];
  onDocsChange: (docs: string[]) => void;
}

export default function StepThreeSelect({
  selectedDocs,
  onDocsChange,
}: StepThreeSelectProps) {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedDocForSheet, setSelectedDocForSheet] = useState<string[]>([]);

  // Get all documents from all knowledge sets
  const allDocuments = createProjectDocument.knowledge_sets.flatMap((set) =>
    set.knowledge_set_documents.map((doc) => ({
      ...doc,
      document_text: doc.document_content,
    }))
  );

  // Current knowledge set documents
  const currentSetDocuments = selectedSet
    ? createProjectDocument.knowledge_sets
        .find((set) => set.knowledge_set_id === selectedSet)
        ?.knowledge_set_documents.map((doc) => ({
          ...doc,
          document_text: doc.document_content,
        }))
    : [];

  // Use allDocuments for the selected documents table
  const selectedDocuments = allDocuments.filter((doc) =>
    selectedDocs.includes(doc.document_id)
  );

  const handleDocumentSelect = (documentId: string) => {
    onDocsChange(
      selectedDocs.includes(documentId)
        ? selectedDocs.filter((id) => id !== documentId)
        : [...selectedDocs, documentId]
    );
  };

  const handleDocumentClick = (documentId: string) => {
    setSelectedDocForSheet([documentId]);
    setIsSheetOpen(true);
  };

  return (
    <div className="p-6 flex flex-col -mb-10">
      <p className="text-2xl font-medium">Select Knowledge Set</p>
      <p className="text-sm text-muted-foreground mb-6">
        A well-defined sample report can help the AI to extract it's structure
        for your new project.
      </p>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-4 w-[22%] h-[320px] border-r-2 border-gray-200 pr-8 box-content">
          <p className="text-sm text-muted-foreground">
            Select A Knowledge Set
          </p>
          <div className="flex flex-col gap-0">
            {createProjectDocument.knowledge_sets.map((knowledgeSet) => (
              <div
                key={knowledgeSet.knowledge_set_id}
                className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                onClick={() => setSelectedSet(knowledgeSet.knowledge_set_id)}
              >
                <CircleCheckbox
                  checked={selectedSet === knowledgeSet.knowledge_set_id}
                />
                <p className="text-sm">{knowledgeSet.knowledge_set_name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[43%] pl-2">
          <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Document Title</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!selectedSet ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      <p>After the Knowledge Set is selected, </p>
                      <p>the documents included will show up here.</p>
                    </TableCell>
                  </TableRow>
                ) : currentSetDocuments?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      <p>No documents found in this Knowledge Set</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentSetDocuments?.map((doc) => (
                    <TableRow key={doc.document_id}>
                      <TableCell className="w-[50px]">
                        <Checkbox
                          checked={selectedDocs.includes(doc.document_id)}
                          onCheckedChange={() =>
                            handleDocumentSelect(doc.document_id)
                          }
                        />
                      </TableCell>
                      <TableCell
                        className="font-medium text-orange-700 underline cursor-pointer"
                        onClick={() => handleDocumentClick(doc.document_id)}
                      >
                        {doc.document_title}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[33%] pl-2 border-l-2 border-gray-200">
          <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Selected Documents</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDocs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-muted-foreground"
                    >
                      <p>No documents selected</p>
                      <p>Select documents from the list to add them here</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedDocuments.map((doc) => (
                    <TableRow key={doc.document_id}>
                      <TableCell className="font-medium">
                        {doc.document_title}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDocumentSelect(doc.document_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DocumentSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        selectedDocs={selectedDocForSheet}
        documents={currentSetDocuments}
      />
    </div>
  );
}
