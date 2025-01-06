"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { graphData } from "@/data/graphData";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

export default function Graph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const graphRef = useRef<any>(null);

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

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full relative overflow-hidden"
    >
      <div className="absolute inset-0">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel="label"
            nodeColor={(node: any) => node.color || "#4CAF50"}
            linkColor={() => "#e5e7eb"}
            backgroundColor="#ffffff"
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
      </div>
    </div>
  );
}
