"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, MouseEvent } from "react";

const templates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const projects = Array.from({ length: 10 }, (_, i) => i + 1);

export default function ProjectsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-[334px]  w-full bg-border flex flex-col gap-4">
        <p className="text-base p-6 pb-0 text-muted-foreground">
          Start by using template
        </p>
        <div className="relative w-full h-full">
          <div
            ref={containerRef}
            className="flex gap-4 px-6 overflow-x-auto cursor-grab active:cursor-grabbing absolute w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {templates.map((template) => (
              <div
                key={template}
                className="bg-background p-3  flex-col flex h-60 w-[200px] shrink-0 rounded-lg select-none"
              >
                <div className="text-sm font-semibold mt-1">
                  Template Report {template}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Lorem ipsum dolor sit amet.
                </div>
                <div className="text-xs leading-6 mt-3 line-clamp-4 text-ellipsis overflow-hidden">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium consequatur possimus obcaecati. Voluptatibus
                  fugiat commodi qui necessitatibus, dolorum nam hic! Lorem
                  ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus, nisi voluptatum. Quisquam, voluptatum. Quisquam,
                  voluptatum. Repellendus, nisi voluptatum. Quisquam,
                  voluptatum. Quisquam, voluptatum.
                </div>
                <div className="mt-4">
                  <Button>Apply</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-371px)]">
        <div className="flex flex-col w-full h-full overflow-auto">
          <p className="text-base p-6 pb-0 text-muted-foreground">
            Project Name
          </p>
          <div className="flex-1 p-6">
            <div className="grid grid-cols-4 gap-4 overflow-y-auto">
              {projects.map((project) => (
                <div
                  key={project}
                  className="cursor-pointer border p-3 border-1 border-border h-[160px] rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="text-sm font-semibold mt-1">
                    Template Report {project}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="text-xs leading-6 mt-3 line-clamp-3 text-ellipsis overflow-hidden">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Praesentium consequatur possimus obcaecati. Voluptatibus
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
