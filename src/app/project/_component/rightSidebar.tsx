"use client";

import { cn } from "@/lib/utils";
import { Bot, ChevronsUpDown } from "lucide-react";
import { aiProjectData } from "../projectData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ContentBoxProps {
  title: string;
  content: string;
}

function ContentBox({ title, content }: ContentBoxProps) {
  return (
    <div className="rounded-md p-2 text-xs bg-gray-50 my-2">
      <div className="font-medium mb-2 text-xs text-muted-foreground">
        {title}:
      </div>
      <p className="text-foreground text-xs whitespace-pre-wrap">{content}</p>
    </div>
  );
}

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectRightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const [openChapters, setOpenChapters] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((current) =>
      current.includes(chapterId)
        ? current.filter((id) => id !== chapterId)
        : [...current, chapterId]
    );
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full overflow-y-auto p-3 space-y-4 scrollbar-none">
        {aiProjectData.chapters.map((chapter, index) => (
          <Collapsible
            key={`${chapter.title}-${index}`}
            open={openChapters.includes(chapter.title)}
            onOpenChange={() => toggleChapter(chapter.title)}
            className="space-y-2 bg-gray-100 pb-[10px] rounded-md"
          >
            <CollapsibleTrigger className="flex w-full text-sm items-center justify-between rounded-md p-2 pt-4 pl-4 font-medium hover:bg-muted">
              <span>{chapter.title}</span>
              <ChevronsUpDown className="h-4 w-4 transition-transform duration-200 mr-2" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 px-3">
              {chapter.sections.map((section, sectionIndex) => (
                <Collapsible
                  key={`${section.title}-${sectionIndex}`}
                  open={openSections.includes(section.title)}
                  onOpenChange={() => toggleSection(section.title)}
                  className="pr-[12px] bg-background mb-3 py-3 rounded-md border border-1 border-border"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md text-sm ml-4">
                    <span>{section.title}</span>
                    <ChevronsUpDown className="h-3 w-3 transition-transform duration-200 mr-[10px]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-3 space-y-2">
                    <ContentBox
                      title="System Prompt"
                      content={section.systemPrompt}
                    />
                    <ContentBox
                      title="Reference Info"
                      content={section.referenceInfo}
                    />
                    {section.query && (
                      <ContentBox title="Query" content={section.query} />
                    )}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
