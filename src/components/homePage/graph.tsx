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

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0,
        });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex-1 w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
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
  );
}
