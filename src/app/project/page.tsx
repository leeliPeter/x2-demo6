import React from "react";
import { projectData } from "./projectData";

export default function ProjectPage() {
  return (
    <div className="bg-border flex-1 h-full  px-4 overflow-hidden overflow-y-auto">
      <div className="w-full bg-background rounded-lg  my-4">
        <div className="px-8 py-10 space-y-8 h-full ">
          {projectData.chapters.map((chapter) => (
            <div key={chapter.title} className="space-y-4">
              {/* Chapter */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{chapter.title}</h2>
                <p className="text-sm">{chapter.description}</p>
              </div>

              {/* Sections */}
              <div className="pl-6 space-y-6">
                {chapter.sections?.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <p className="text-sm">{section.description}</p>

                    {/* SubSections */}
                    <div className="pl-6 space-y-4 mt-4">
                      {section.subSections?.map((subsection) => (
                        <div key={subsection.title} className="space-y-1">
                          <h4 className="text-base font-semibold">
                            {subsection.title}
                          </h4>
                          <p className="text-sm">{subsection.description}</p>
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
