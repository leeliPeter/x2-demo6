"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { graphData, links, companyNode, companyLinks } from "@/data/graphData";
import { CircleDotDashed, FolderUp, Settings2, ArrowLeft } from "lucide-react";
import { NodeSheet } from "./sheet";
import { useDispatch } from "react-redux";
import { setPath } from "@/redux/features/navigationSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

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
  title: string;
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

    // Don't slice the path when it's "All Data"
    let searchPath = path;
    if (searchPath[0] === "All Data" && searchPath.length > 1) {
      searchPath = searchPath.slice(1);
    }

    // Find the graph
    const targetGraph = graphData.graphs.find((g) => g.title === searchPath[0]);
    if (!targetGraph || searchPath.length === 1)
      return targetGraph?.communities[0];

    // Find the community
    let community = targetGraph.communities[0];
    for (let i = 1; i < searchPath.length; i++) {
      const nextCommunity = community.children?.find(
        (c) => c.title === searchPath[i]
      );
      if (nextCommunity) {
        community = nextCommunity;
      }
    }

    return community;
  };

  // Add this helper function to get all nodes from current and lower levels
  const getNodesForCommunity = (community: any, currentLevel: number) => {
    let allNodes: any[] = [];

    // Only include nodes if they're at current level or below
    allNodes = [
      ...allNodes,
      ...community.nodes.filter((node: any) => node.level >= currentLevel),
    ];

    // Recursively get nodes from child communities
    if (community.children) {
      community.children.forEach((childCommunity: any) => {
        allNodes = [...allNodes, ...childCommunity.nodes];

        // Get nodes from level 2 if they exist
        if (childCommunity.children) {
          childCommunity.children.forEach((grandChild: any) => {
            allNodes = [...allNodes, ...grandChild.nodes];
          });
        }
      });
    }

    return allNodes;
  };

  useEffect(() => {
    // Only show company and graphs view when explicitly on "All Data"
    if (selectedPath.length === 1 && selectedPath[0] === "All Data") {
      // Show company and its graphs
      const graphNodes = graphData.graphs.map((graph) => ({
        id: graph.id,
        title: graph.title,
        icon: "CircleDotDashed",
        level: 0,
        type: "graph",
        description: `Graph ${graph.title}`,
        color: graph.color || "#94a3b8",
        label: graph.title,
      }));

      // Create proper links by mapping the companyLinks
      const mappedLinks = companyLinks.map((link) => ({
        source: link.source,
        target: link.target,
      }));

      setGraphData2D({
        nodes: [companyNode, ...graphNodes],
        links: mappedLinks, // Use the mapped links
      });
      return;
    }

    // Handle graph-level view (when at All Data > Graph X)
    if (selectedPath.length === 2 && selectedPath[0] === "All Data") {
      const selectedGraph = graphData.graphs.find(
        (graph) => graph.title === selectedPath[1]
      );

      if (selectedGraph) {
        const graphNode = {
          id: selectedGraph.id,
          title: selectedGraph.title,
          icon: "CircleDotDashed",
          level: 0,
          type: "graph",
          description: `Graph ${selectedGraph.title}`,
          color: selectedGraph.color || "#94a3b8",
          label: selectedGraph.title,
          period: selectedGraph.communities[0]?.period,
        };

        setGraphData2D({
          nodes: [graphNode],
          links: [],
        });
        return;
      }
    }

    // Handle community view
    const currentCommunity = findCurrentCommunity(selectedPath);
    if (currentCommunity) {
      // Get all relevant nodes based on current level
      const allNodes = getNodesForCommunity(
        currentCommunity,
        currentCommunity.level
      );

      const nodes = allNodes.map((node) => ({
        ...node,
        label: node.title,
        communityTitle: currentCommunity.title,
        period: currentCommunity.period,
        citedDocuments: currentCommunity.citedDocuments,
        communityReport: currentCommunity.communityReport,
      }));

      // Filter links to only include connections between visible nodes
      const nodeIds = new Set(nodes.map((node) => node.id));
      const filteredLinks = links
        .map((link) => ({
          source: link.source,
          target: link.target,
        }))
        .filter((link) => nodeIds.has(link.source) && nodeIds.has(link.target));

      setGraphData2D({
        nodes: [...nodes],
        links: filteredLinks,
      });
    }
  }, [selectedPath]);

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
              graphData={graphData2D}
              nodeLabel=""
              nodeColor={(node: any) => node.color}
              linkColor={() => "#e5e7eb"}
              backgroundColor="#ffffff"
              width={dimensions.width}
              height={dimensions.height}
              onNodeClick={(node: any) => {
                // Only show node sheet for community nodes
                if (selectedPath.length > 2) {
                  setSelectedNode({
                    x: node.x,
                    y: node.y,
                    icon: node.icon,
                    level: node.level,
                    description: node.description,
                    period: node.period,
                    label: node.label,
                    title: node.title,
                    communityName: node.communityTitle,
                    citedDocuments: node.citedDocuments,
                    communityReport: node.communityReport,
                  });
                }
              }}
              onNodeHover={(node: any) => {
                // Only show hover card for community nodes
                if (node && selectedPath.length > 2) {
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
