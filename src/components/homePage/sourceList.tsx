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

  const handleRowClick = (document: Document) => {};

  return (
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
        <h2 className="text-2xl font-semibold">
          {selectedPath[selectedPath.length - 1]}
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Current Path:</span>
            <span>{selectedPath.join(" > ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([label, value]) => (
                <span key={label} className="bg-gray-100 px-2 py-1 rounded-md">
                  {label}: {value}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Document Title</TableHead>
                <TableHead>ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourceList.documents.map((doc) => (
                <TableRow
                  key={doc.document_id}
                  onClick={() => handleRowClick(doc)}
                  className="cursor-pointer hover:bg-muted/80"
                >
                  <TableCell className="font-medium">
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
  );
}
