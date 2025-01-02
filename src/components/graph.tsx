"use client";

import { useCallback, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
    val?: number;
    color?: string;
    group?: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value?: number;
  }>;
}

interface GraphProps {
  data: GraphData;
  width?: number;
  height?: number;
}

const defaultData: GraphData = {
  nodes: [
    { id: "1", name: "Node 1", group: "A" },
    { id: "2", name: "Node 2", group: "A" },
    { id: "3", name: "Node 3", group: "B" },
    { id: "4", name: "Node 4", group: "B" },
    { id: "5", name: "Node 5", group: "C" },
  ],
  links: [
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "2", target: "4" },
    { source: "3", target: "4" },
    { source: "4", target: "5" },
  ],
};

export function Graph({
  data = defaultData,
  width = 800,
  height = 600,
}: GraphProps) {
  const graphRef = useRef<any>();

  const handleNodeClick = useCallback((node: any) => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  }, []);

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={data}
      nodeLabel="name"
      nodeColor={(node: any) => {
        switch (node.group) {
          case "A":
            return "#ff6b6b";
          case "B":
            return "#4ecdc4";
          case "C":
            return "#45b7d1";
          default:
            return "#666666";
        }
      }}
      nodeRelSize={6}
      linkWidth={1}
      linkColor={() => "#cccccc"}
      onNodeClick={handleNodeClick}
      width={width}
      height={height}
      cooldownTicks={100}
      onEngineStop={() => {
        graphRef.current?.zoomToFit(400, 50);
      }}
    />
  );
}
