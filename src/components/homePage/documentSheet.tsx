import React from "react";

interface DocumentSheetProps {
  document: {
    title: string;
    text: string;
  };
}

export default function documentSheet({ document }: DocumentSheetProps) {
  return (
    <div className="absolute z-90 top-0 left-0 w-full h-full bg-gray-500 text-white">
      <div className="text-2xl font-bold">{document.title}</div>
      <div className="text-sm whitespace-pre-wrap">{document.text}</div>
    </div>
  );
}
