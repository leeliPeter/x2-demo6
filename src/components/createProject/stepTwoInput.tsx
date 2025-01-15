import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const tableData = [
  {
    section: "Introduction",
    prompt: "Set the context for the report",
    query:
      "Provide an overview of the topic and state the main objectives of the report.",
  },
  {
    section: "Background",
    prompt: "Offer necessary context",
    query:
      "Present relevant background information to help readers understand the topic.",
  },
  {
    section: "Methods",
    prompt: "Explain the methodology",
    query:
      "Describe the methods and techniques used to gather and analyze information.",
  },
  {
    section: "Findings",
    prompt: "Present the results",
    query: "Detail the main findings of your research or analysis.",
  },
  {
    section: "Discussion",
    prompt: "Interpret the findings",
    query:
      "Analyze the findings, discuss their implications, and relate them to existing knowledge.",
  },
  {
    section: "Conclusion",
    prompt: "Summarize the main points",
    query:
      "Summarize the main points and provide final thoughts or recommendations.",
  },
];

// Keep original data constant
const originalTableData = tableData;

interface StepTwoInputProps {
  showStructure: boolean;
  onGenerateStructure: () => void;
  tableData: typeof tableData;
  onTableDataChange: (data: typeof tableData) => void;
}

export default function StepTwoInput({
  showStructure,
  onGenerateStructure,
  tableData,
  onTableDataChange,
}: StepTwoInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState(tableData);

  const handleGenerateStructure = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Use originalTableData instead of tableData prop
      setEditedData(originalTableData);
      onTableDataChange(originalTableData);
      onGenerateStructure();
    }, 2000);
  };

  const handleEdit = (index: number) => {
    setEditingRow(index);
  };

  const handleSave = () => {
    setEditingRow(null);
    onTableDataChange(editedData);
  };

  const handleChange = (
    index: number,
    field: "section" | "prompt" | "query",
    value: string
  ) => {
    const newData = [...editedData];
    newData[index] = { ...newData[index], [field]: value };
    setEditedData(newData);
  };

  const renderTableContent = () => {
    if (isLoading) {
      return Array(6)
        .fill(0)
        .map((_, _index) => (
          <TableRow key={_index}>
            <TableCell>
              <div className="h-4 bg-muted animate-pulse rounded" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted animate-pulse rounded" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted animate-pulse rounded" />
            </TableCell>
            <TableCell className="text-right">
              <div className="h-4 w-12 bg-muted animate-pulse rounded ml-auto" />
            </TableCell>
          </TableRow>
        ));
    }

    if (!showStructure) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-muted-foreground">
            <p>After the Project Instruction is given,</p>
            <p>the extracted Report Structure will show up here.</p>
          </TableCell>
        </TableRow>
      );
    }

    return editedData.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">
          {editingRow === index ? (
            <input
              className="w-full border rounded px-2 py-1"
              value={item.section}
              onChange={(e) => handleChange(index, "section", e.target.value)}
            />
          ) : (
            item.section
          )}
        </TableCell>
        <TableCell>
          {editingRow === index ? (
            <Textarea
              className="w-full min-h-[60px] resize-none scrollbar-hide"
              value={item.prompt}
              onChange={(e) => handleChange(index, "prompt", e.target.value)}
            />
          ) : (
            item.prompt
          )}
        </TableCell>
        <TableCell>
          {editingRow === index ? (
            <Textarea
              className="w-full min-h-[60px] resize-none scrollbar-hide"
              value={item.query}
              onChange={(e) => handleChange(index, "query", e.target.value)}
            />
          ) : (
            item.query
          )}
        </TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            size="sm"
            className="underline"
            onClick={() =>
              editingRow === index ? handleSave() : handleEdit(index)
            }
          >
            {editingRow === index ? "Save" : "Edit"}
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="p-6 flex flex-col -mb-10">
      <p className="text-2xl font-medium">Extract the structure</p>
      <p className="text-sm text-muted-foreground mb-6">
        A well-defined sample report can help the AI to extract it&apos;s
        structure for your new project.
      </p>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-4 w-[32%] h-[320px] border-r-2 border-gray-200 pr-8 box-content">
          <p>Project Instructions</p>
          <Textarea
            placeholder="Enter your project instructions or requirements here..."
            className="min-h-[200px] resize-none scrollbar-hide"
          />
          <div className="mt-2">
            <Button className="p-4" onClick={handleGenerateStructure}>
              Generate Structure
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[68%] pl-2">
          <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[125px]">Section</TableHead>
                  <TableHead className="w-[40%]">Prompt</TableHead>
                  <TableHead className="w-[40%]">Query</TableHead>
                  <TableHead className="text-right w-[40px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableContent()}</TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
