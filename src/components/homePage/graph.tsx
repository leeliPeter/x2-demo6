"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

// Sample data structure for the graph
const graphData = {
  nodes: [
    { id: "node1", label: "Node 1" },
    { id: "node2", label: "Node 2" },
    { id: "node3", label: "Node 3" },
    { id: "node4", label: "Node 4" },
  ],
  links: [
    { source: "node1", target: "node2" },
    { source: "node2", target: "node3" },
    { source: "node3", target: "node4" },
    { source: "node4", target: "node1" },
  ],
};

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
            nodeColor={() => "#4CAF50"}
            linkColor={() => "#999"}
            backgroundColor="#ffffff"
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
      </div>
    </div>
  );
}
