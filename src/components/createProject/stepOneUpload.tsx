import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StepOneUpload({
  onFileChange,
  initialFile,
}: {
  onFileChange: (file: File | null) => void;
  initialFile: File | null;
}) {
  const [file, setFile] = useState<File | null>(initialFile);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        setFile(newFile);
        onFileChange(newFile);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="p-6 flex flex-col max-w-96">
      <div className="text-2xl font-medium">Upload Sample Report</div>
      <div className="text-sm text-muted-foreground mb-6">
        A well-defined sample report can help the AI to extract it's structure
        for your new project.
      </div>

      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-[3px] border-dashed rounded-lg p-8 bg-gray-50 h-[100px] transition-colors cursor-pointer",
            "flex flex-col items-center justify-center gap-4",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary"
          )}
        >
          <input {...getInputProps()} />
          <div className="text-center flex flex-col gap-2">
            <p className="text-sm font-medium">
              {isDragActive ? "Drop the file here" : "Upload your File"}
            </p>
            <p className="text-xs text-gray-400 font-family:Roboto">
              Click here to upload or drag it here
            </p>
            <p className="text-xs text-gray-400 font-family:Roboto">
              PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <File className="h-8 w-8 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeFile}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
