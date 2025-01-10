"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { nodeData, linkData } from "@/data/nodeData";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { ArrowLeft, FolderUp, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { setPath } from "@/redux/features/navigationSlice";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

interface GraphProps {
  selectedPath: string[];
}

interface HoverNode {
  x: number;
  y: number;
  title: string;
  entity_id: string;
}

export default function Graph({ selectedPath }: GraphProps) {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverNode, setHoverNode] = useState<HoverNode | null>(null);
  const [switchStates, setSwitchStates] = useState({
    Titles: true,
    Relations: true,
    Preview: true,
  });

  const dropDownMenuItems = [
    {
      title: "Titles",
      description:
        "Show or hide the titles on the nodes for easier identification.",
    },
    {
      title: "Relations",
      description:
        "Display or hide the connections between nodes to visualize relationships.",
    },
    {
      title: "Preview",
      description:
        "Enable or disable a hover preview of the node's content on the graph.",
    },
  ];

  const handleBackClick = () => {
    if (selectedPath.length > 1) {
      const newPath = selectedPath.slice(0, -1);
      dispatch(setPath(newPath));
    }
  };

  const getScreenCoordinates = (x: number, y: number) => {
    if (!graphRef.current) return { x: 0, y: 0 };
    const screenPos = graphRef.current.graph2ScreenCoords(x, y);
    return screenPos;
  };

  const selectedCommunityNumber = useSelector(
    (state: RootState) => state.navigation.selectedCommunityNumber
  );

  const filteredNodes =
    selectedCommunityNumber !== null
      ? nodeData.filter((node) => node.community === selectedCommunityNumber)
      : nodeData;

  const filteredLinks = linkData[0].links.filter((link) => {
    const sourceNode = filteredNodes.find(
      (node) => node.entity_id === link.source
    );
    const targetNode = filteredNodes.find(
      (node) => node.entity_id === link.target
    );
    return sourceNode && targetNode;
  });

  const graphData = {
    nodes: filteredNodes.map((node) => ({
      id: node.entity_id,
      ...node,
    })),
    links: filteredLinks.map((link) => ({
      source: link.source,
      target: link.target,
      id: link.relationship_id,
    })),
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

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full relative overflow-hidden"
    >
      <div className="absolute items-center w-full top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-start w-full px-6 justify-between text-xl font-semibold text-foreground">
          {selectedPath.length > 1 ? (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors hover:bg-border p-1 px-2 rounded-md cursor-pointer"
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

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-border p-2 rounded-md cursor-pointer outline-none">
              <Settings2 className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel>Graph Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dropDownMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                  className="hover:bg-transparent focus:bg-transparent"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">{item.title}</div>
                      <div className="text-xs text-muted-foreground w-32">
                        {item.description}
                      </div>
                    </div>
                    <Switch
                      checked={
                        switchStates[item.title as keyof typeof switchStates]
                      }
                      onCheckedChange={(checked) => {
                        setSwitchStates((prev) => ({
                          ...prev,
                          [item.title]: checked,
                        }));
                      }}
                    />
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
                // Only show hover card for community nodes
                if (node && selectedPath.length > 2) {
                  const { x, y } = getScreenCoordinates(node.x, node.y);
                  setHoverNode({
                    x,
                    y,
                    title: node.title,
                    entity_id: node.entity_id,
                  });
                } else {
                  setHoverNode(null);
                }
              }}
              nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
                // Draw the node circle
                ctx.beginPath();
                const radius = node.type === "company" ? 8 : 5;
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Draw the text below the node
                const label = node.label || node.title;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillStyle = "#4b5563";
                ctx.fillText(label, node.x, node.y + 8);
              }}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleSpeed={0.01}
              linkDirectionalParticleColor={() => "#94a3b8"}
              d3AlphaDecay={0.02}
              d3VelocityDecay={0.3}
              warmupTicks={100}
              cooldownTicks={Infinity}
              onEngineStop={() => {}}
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              linkDirectionalArrowColor={() => "#94a3b8"}
              linkWidth={1}
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
                <div className="flex flex-col items-start gap-1.5">
                  <span className="font-semibold text-sm leading-5">
                    {hoverNode.title}
                  </span>
                  <span className="text-sm leading-5">123</span>
                  <span className="text-xs text-muted-foreground leading-4 flex items-center gap-1">
                    <FolderUp className="w-4 h-4" />
                    <p>Generated @</p>
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
