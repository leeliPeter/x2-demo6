"use client";

import React from "react";
import { projectData, updateProjectData } from "./projectData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Copy, MessageSquare, PenLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPendingMessage, setIsOpen } from "@/redux/features/chatSlice";
import type { Section, SubSection, Chapter } from "./projectData";

type SelectedItem = {
  type: "chapter" | "section" | "subsection";
  title: string;
} | null;

interface EditState {
  isEditing: boolean;
  text: string;
}

export default function ProjectPage() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = React.useState<SelectedItem>(null);
  const [selectedText, setSelectedText] = React.useState("");
  const [editState, setEditState] = React.useState<EditState>({
    isEditing: false,
    text: "",
  });
  const [data, setData] = React.useState(projectData);

  const handleClick = (
    type: "chapter" | "section" | "subsection",
    title: string,
    description: string
  ) => {
    if (editState.isEditing && isSelected(type, title)) {
      return;
    }

    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedItem?.type === type && selectedItem?.title === title) {
      setSelectedItem(null);
      setSelectedText("");
    } else {
      setSelectedItem({ type, title });
      setSelectedText(selectedText || description);
    }
  };

  const handleAction = (value: string) => {
    if (!selectedItem) return;
    switch (value) {
      case "copy":
        navigator.clipboard.writeText(selectedText);
        setSelectedItem(null);
        break;
      case "chat":
        dispatch(setIsOpen(true));
        setTimeout(() => {
          dispatch(setPendingMessage(selectedText));
        }, 100);
        setSelectedItem(null);
        break;
      case "edit":
        setEditState({ isEditing: true, text: selectedText });
        break;
    }
    setSelectedText("");
  };

  const handleSaveEdit = () => {
    if (!selectedItem) return;

    const newData = JSON.parse(JSON.stringify(data));
    const { type, title } = selectedItem;

    switch (type) {
      case "chapter":
        const chapterIndex = newData.chapters.findIndex(
          (c: Chapter) => c.title === title
        );
        if (chapterIndex !== -1) {
          newData.chapters[chapterIndex].description = editState.text;
        }
        break;

      case "section":
        for (const chapter of newData.chapters) {
          const section = chapter.sections?.find(
            (s: Section) => s.title === title
          );
          if (section) {
            section.description = editState.text;
            break;
          }
        }
        break;

      case "subsection":
        for (const chapter of newData.chapters) {
          for (const section of chapter.sections || []) {
            const subsection = section.subSections?.find(
              (s: SubSection) => s.title === title
            );
            if (subsection) {
              subsection.description = editState.text;
              break;
            }
          }
        }
        break;
    }

    setData(newData);
    updateProjectData(newData);
    setEditState({ isEditing: false, text: "" });
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
    content: React.ReactNode,
    description: string
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
          onClick={() => handleClick(type, title, description)}
        >
          {editState.isEditing && isSelected(type, title) ? (
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <textarea
                value={editState.text}
                onChange={(e) =>
                  setEditState({ ...editState, text: e.target.value })
                }
                className="w-full min-h-[100px] p-2 rounded border border-input bg-background focus:outline-none focus:ring-0 focus:border-input [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditState({ isEditing: false, text: "" });
                    setSelectedItem(null);
                  }}
                  className="px-3 py-1 rounded bg-secondary hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit();
                  }}
                  className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            content
          )}
        </div>
      </PopoverTrigger>
      {!editState.isEditing && (
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
      )}
    </Popover>
  );

  return (
    <div className="bg-border flex-1 h-full px-4 overflow-hidden overflow-y-auto">
      <div className="w-full bg-background rounded-lg my-4">
        <div className="px-8 py-10 space-y-8 h-full">
          {data.chapters.map((chapter) => (
            <div key={chapter.title} className="space-y-4">
              {renderItem(
                "chapter",
                chapter.title,
                <>
                  <h2 className="text-xl font-bold">{chapter.title}</h2>
                  <p className="text-sm">{chapter.description}</p>
                </>,
                chapter.description
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
                      </>,
                      section.description
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
                            </>,
                            subsection.description
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
