"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ForceGraph2D with SSR disabled
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface GraphProps {
  selectedPath: string[];
  selectedFilters: {
    [key: string]: string;
  };
}

interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
    val: number;
  }>;
  links: Array<{
    source: string;
    target: string;
  }>;
}

export default function Graph({ selectedPath, selectedFilters }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData] = useState<GraphData>({
    nodes: [
      { id: "1", name: "Main Node", val: 30 },
      { id: "2", name: "Connected Node 1", val: 20 },
      { id: "3", name: "Connected Node 2", val: 20 },
      { id: "4", name: "Sub Node 1", val: 15 },
      { id: "5", name: "Sub Node 2", val: 15 },
    ],
    links: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "4" },
      { source: "3", target: "5" },
    ],
  });

  const updateDimensions = () => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({
        width: clientWidth,
        height: clientHeight,
      });
    }
  };

  useEffect(() => {
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full relative">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ForceGraph2D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeLabel="name"
            nodeRelSize={1}
            linkWidth={1.5}
            linkColor={() => "#cccccc"}
            nodeColor={() => "#F97316"}
            backgroundColor="#ffffff"
            onNodeClick={(node) => {
              console.log("Clicked node:", node);
            }}
          />
        )}
      </div>
    </div>
  );
}
