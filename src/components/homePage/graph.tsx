"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { graphData, links } from "@/data/graphData";
import { CircleDotDashed, FolderUp, Settings2, ArrowLeft } from "lucide-react";
import { NodeSheet } from "./sheet";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/navigationSlice";

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
  period?: string;
}

interface SelectedNode extends HoverNode {
  label: string;
  communityName: string;
  citedDocuments: string;
  communityReport: string;
}

interface GraphProps {
  selectedPath: string[];
}

interface ForceGraphData {
  nodes: any[];
  links: { source: string; target: string }[];
}

export default function Graph({ selectedPath }: GraphProps) {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const graphRef = useRef<any>(null);
  const [hoverNode, setHoverNode] = useState<HoverNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [graphData2D, setGraphData2D] = useState<ForceGraphData>({
    nodes: [],
    links: [],
  });

  const getScreenCoordinates = (x: number, y: number) => {
    if (!graphRef.current) return { x: 0, y: 0 };

    // Convert graph coordinates to screen coordinates
    const screenPos = graphRef.current.graph2ScreenCoords(x, y);
    return screenPos;
  };

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

  const handleBackClick = () => {
    if (selectedPath.length > 1) {
      const newPath = selectedPath.slice(0, -1);
      dispatch(setPath(newPath));
    }
  };

  const findCurrentCommunity = (path: string[]) => {
    if (path.length === 0) return null;

    // Skip "All Data" instead of company name
    if (path[0] === "All Data") {
      path = path.slice(1);
    }

    // Find the graph
    const targetGraph = graphData.graphs.find((g) => g.title === path[0]);
    if (!targetGraph || path.length === 1) return targetGraph?.communities[0];

    // Find the community
    let community = targetGraph.communities[0];
    for (let i = 1; i < path.length; i++) {
      const nextCommunity = community.children?.find(
        (c) => c.title === path[i]
      );
      if (nextCommunity) {
        community = nextCommunity;
      }
    }

    return community;
  };

  useEffect(() => {
    const currentCommunity = findCurrentCommunity(selectedPath);
    if (currentCommunity) {
      const nodes = currentCommunity.nodes.map((node) => ({
        ...node,
        label: node.title,
        communityTitle: currentCommunity.title,
        communityPeriod: currentCommunity.period,
        citedDocuments: currentCommunity.citedDocuments,
        communityReport: currentCommunity.communityReport,
      }));

      // Filter links to only include connections between visible nodes
      const nodeIds = new Set(nodes.map((node) => node.id));
      const filteredLinks = links.filter(
        (link) => nodeIds.has(link.source) && nodeIds.has(link.target)
      );

      setGraphData2D({ nodes, links: filteredLinks });
    }
  }, [selectedPath]);

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full relative overflow-hidden"
    >
      <div className="absolute items-center w-full top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center w-full px-6 justify-between text-xl font-semibold text-foreground">
          {selectedPath.length > 1 ? (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {selectedPath.length > 0 ? (
            <span className="underline">
              {selectedPath[selectedPath.length - 1]}
            </span>
          ) : (
            <span className="text-gray-400">No path selected</span>
          )}

          <Settings2 className="w-4 h-4" />
        </div>
      </div>

      <div className="absolute inset-0">
        {dimensions.width > 0 && dimensions.height > 0 && (
          <>
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData2D}
              nodeLabel=""
              nodeColor={(node: any) => node.color}
              linkColor={() => "#e5e7eb"}
              backgroundColor="#ffffff"
              width={dimensions.width}
              height={dimensions.height}
              onNodeClick={(node: any) => {
                setSelectedNode({
                  x: node.x,
                  y: node.y,
                  icon: node.icon,
                  level: node.level,
                  description: node.description,
                  period: node.period,
                  label: node.label,
                  communityName: node.communityTitle,
                  citedDocuments: node.citedDocuments,
                  communityReport: node.communityReport,
                });
              }}
              onNodeHover={(node: any) => {
                if (node) {
                  const { x, y } = getScreenCoordinates(node.x, node.y);
                  setHoverNode({
                    x,
                    y,
                    icon: node.icon,
                    level: node.level,
                    description: node.description,
                    period: node.period,
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
                className="absolute bg-white p-4 rounded-lg shadow-lg flex max-w-80 gap-4 transition-all duration-200"
                style={{
                  left: `${hoverNode.x}px`,
                  top: `${hoverNode.y + 20}px`,
                  transform: "translate(-50%, 0)",
                  zIndex: 10,
                }}
              >
                <CircleDotDashed className="min-w-8 min-h-8 " />
                <div className="flex flex-col items-start gap-1.5">
                  <span className="font-semibold text-sm leading-5">
                    level {hoverNode.level}
                  </span>
                  <span className="text-sm leading-5">
                    {hoverNode.description}
                  </span>
                  <span className="text-xs text-muted-foreground leading-4 flex items-center gap-1">
                    <FolderUp className="w-4 h-4" />
                    <p>
                      Generated @
                      {hoverNode.period && formatDate(hoverNode.period)}
                    </p>
                  </span>
                </div>
              </div>
            )}
            <NodeSheet
              isOpen={!!selectedNode}
              onClose={() => setSelectedNode(null)}
              selectedNode={selectedNode}
            />
          </>
        )}
      </div>
    </div>
  );
}
