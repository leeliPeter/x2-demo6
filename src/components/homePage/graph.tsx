"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { graphData } from "@/data/graphData";
import { CircleDotDashed, FolderUp } from "lucide-react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

interface HoverNode {
  x: number;
  y: number;
  icon: string;
  level: string;
  description: string;
  date?: string;
}

export default function Graph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const graphRef = useRef<any>(null);
  const [hoverNode, setHoverNode] = useState<HoverNode | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newDimensions = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
        setDimensions(newDimensions);

        if (graphRef.current) {
          graphRef.current
            .d3Force("center", null)
            .d3Force("charge")
            .strength(-100)
            .distanceMax(200);
          graphRef.current.resumeAnimation();
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full relative overflow-hidden"
    >
      <div className="absolute inset-0">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <>
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel=""
              nodeColor={(node: any) => node.color}
              linkColor={() => "#e5e7eb"}
              backgroundColor="#ffffff"
              width={dimensions.width}
              height={dimensions.height}
              onNodeHover={(node: any) => {
                if (node) {
                  setHoverNode({
                    x: node.x,
                    y: node.y,
                    icon: node.icon,
                    level: node.level,
                    description: node.description,
                    date: node.date,
                  });
                } else {
                  setHoverNode(null);
                }
              }}
              nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
                // Draw the node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Draw the text below the node
                const label = node.label;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillStyle = "#4b5563";
                ctx.fillText(label, node.x, node.y + 8);
              }}
            />
            {hoverNode && (
              <div
                className="absolute bg-white p-4 rounded-lg shadow-lg flex max-w-80 gap-4  transition-all duration-200"
                style={{
                  left: `${hoverNode.x + 800}px`,
                  top: `${hoverNode.y + 320}px`,
                  transform: "translateX(-50%)",
                  zIndex: 10,
                }}
              >
                <CircleDotDashed className="w-10 h-10" />
                <div className="flex flex-col items-start gap-1.5">
                  <span className="font-semibold text-sm leading-5">
                    {hoverNode.level}
                  </span>
                  <span className="text-sm leading-5">
                    {hoverNode.description}
                  </span>
                  <span className="text-xs text-muted-foreground leading-4 flex items-center gap-1">
                    <FolderUp className="w-4 h-4" />
                    <p>
                      Generated @{hoverNode.date && formatDate(hoverNode.date)}
                    </p>
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
