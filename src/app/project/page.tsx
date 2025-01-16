"use client";

import React from "react";
import { projectData } from "./projectData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Copy, MessageSquare, PenLine } from "lucide-react";

type SelectedItem = {
  type: "chapter" | "section" | "subsection";
  title: string;
} | null;

export default function ProjectPage() {
  const [selectedItem, setSelectedItem] = React.useState<SelectedItem>(null);

  const handleClick = (
    type: "chapter" | "section" | "subsection",
    title: string
  ) => {
    if (selectedItem?.type === type && selectedItem?.title === title) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ type, title });
    }
  };

  const handleAction = (value: string) => {
    if (!selectedItem) return;
    switch (value) {
      case "copy":
        navigator.clipboard.writeText(selectedItem.title);
        break;
      case "chat":
        console.log("Chat about:", selectedItem.title);
        break;
      case "edit":
        console.log("Edit:", selectedItem.title);
        break;
    }
    setSelectedItem(null);
  };

  const isSelected = (
    type: "chapter" | "section" | "subsection",
    title: string
  ) => {
    return selectedItem?.type === type && selectedItem?.title === title;
  };

  const renderItem = (
    type: "chapter" | "section" | "subsection",
    title: string,
    content: React.ReactNode
  ) => (
    <Popover open={isSelected(type, title)}>
      <PopoverTrigger asChild>
        <div
          className={`p-2 rounded-lg cursor-pointer transition-all
            ${
              isSelected(type, title)
                ? "border-2 border-primary"
                : "hover:bg-accent"
            }
          `}
          onClick={() => handleClick(type, title)}
        >
          {content}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1" side="top" align="start">
        <ToggleGroup type="single" onValueChange={handleAction}>
          <ToggleGroupItem value="copy" size="sm">
            <Copy className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="chat" size="sm">
            <MessageSquare className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="edit" size="sm">
            <PenLine className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="bg-border flex-1 h-full px-4 overflow-hidden overflow-y-auto">
      <div className="w-full bg-background rounded-lg my-4">
        <div className="px-8 py-10 space-y-8 h-full">
          {projectData.chapters.map((chapter) => (
            <div key={chapter.title} className="space-y-4">
              {renderItem(
                "chapter",
                chapter.title,
                <>
                  <h2 className="text-xl font-bold">{chapter.title}</h2>
                  <p className="text-sm">{chapter.description}</p>
                </>
              )}

              <div className="pl-6 space-y-6">
                {chapter.sections?.map((section) => (
                  <div key={section.title} className="space-y-2">
                    {renderItem(
                      "section",
                      section.title,
                      <>
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                        <p className="text-sm">{section.description}</p>
                      </>
                    )}

                    <div className="pl-6 space-y-4 mt-4">
                      {section.subSections?.map((subsection) => (
                        <div key={subsection.title}>
                          {renderItem(
                            "subsection",
                            subsection.title,
                            <>
                              <h4 className="text-base font-semibold">
                                {subsection.title}
                              </h4>
                              <p className="text-sm">
                                {subsection.description}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
