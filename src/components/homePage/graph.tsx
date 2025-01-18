"use client";

import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, Settings2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPath,
  setPathIds,
  setCommunityNumber,
  setTextUnitIds,
} from "@/redux/features/navigationSlice";
import type { RootState } from "@/redux/store";
import { NavDataContext, NodeDataContext } from "@/redux/provider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import HoverCard from "./hoverCard";
import {
  companyColor,
  graphColor,
  communityColor,
  nodeColor,
} from "@/data/color";
import NodeSheet from "./nodeSheet";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

export default function Graph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const dispatch = useDispatch();
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );
  const [graphSettings, setGraphSettings] = useState({
    titles: true,
    relations: true,
    preview: true,
  });
  const selectedCommunityNumber = useSelector(
    (state: RootState) => state.navigation.selectedCommunityNumber
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const selectedPathIds = useSelector(
    (state: RootState) => state.navigation.selectedPathIds
  );

  // Get data from context
  const navData = useContext(NavDataContext);
  const nodeData = useContext(NodeDataContext);

  // Get graph ID from pathIds[1] if it exists
  const graphId = selectedPathIds.length > 1 ? selectedPathIds[1] : null;

  // Add this at the top of the component
  const colorMap = useRef(new Map<string, string>()).current;

  // Update graphData to filter by community
  const graphData = useMemo(() => {
    if (!navData || !nodeData) return { nodes: [], links: [] };

    // If path length is 1 (All Data), show company-graph connections
    if (selectedPath.length === 1) {
      const nodes = [
        // Company node
        {
          id: navData.company_id,
          label: navData.company_name,
          type: "company",
          val: 10,
          color: companyColor,
        },
        // Graph nodes with entity counts
        ...navData.graph.map((graph, index) => {
          const graphEntities = nodeData.nodes.filter(
            (node) => graph.graph_id === graphId
          );
          return {
            id: graph.graph_id,
            label: `${graph.graph_name}`,
            type: "graph",
            val: Math.max(7),
            color: graphColor[index % graphColor.length],
          };
        }),
      ];

      const links = navData.graph.map((graph) => ({
        source: navData.company_id,
        target: graph.graph_id,
        id: `link-${navData.company_id}-${graph.graph_id}`,
      }));

      return { nodes, links };
    }

    // If path length is 2 (Graph level), show communities
    if (selectedPath.length === 2) {
      const currentGraph = navData.graph.find(
        (g) => g.graph_name === selectedPath[1]
      );
      if (!currentGraph) return { nodes: [], links: [] };

      const nodes = [
        {
          id: currentGraph.graph_id,
          label: currentGraph.graph_name,
          val: 10,
          type: "graph",
          color: graphColor[0],
        },
        ...currentGraph.communities
          .filter((comm) => comm.level === 0)
          .map((comm) => {
            const communityNodes = nodeData.nodes.filter(
              (node) => node.community === comm.community
            );
            return {
              id: comm.community_id,
              label: `${comm.community_title} (${communityNodes.length})`,
              val: Math.max(3, communityNodes.length / 10),
              level: comm.level,
              type: "community",
              size: communityNodes.length,
              period: comm.period,
              community: comm.community,
              color: communityColor[comm.community % communityColor.length],
            };
          }),
      ];

      const links = currentGraph.communities
        .filter((comm) => comm.level === 0)
        .map((comm) => ({
          source: currentGraph.graph_id,
          target: comm.community_id,
          id: `link-${currentGraph.graph_id}-${comm.community_id}`,
        }));

      return { nodes, links };
    }

    // For community level, show filtered nodes and their connections
    if (selectedPath.length > 2 && selectedCommunityNumber !== null) {
      const filteredNodes = nodeData.nodes.filter(
        (node) => node.community === selectedCommunityNumber
      );

      const nodes = filteredNodes.map((node) => ({
        id: node.entity_id,
        label: node.title,
        val: node.degree / 5,
        level: node.level,
        type: "node",
        category: node.type,
        degree: node.degree,
        community: node.community,
        color: nodeColor[Math.floor(Math.random() * nodeColor.length)],
      }));

      const nodeIds = new Set(filteredNodes.map((n) => n.entity_id));
      const links = nodeData.links
        .filter((link) => nodeIds.has(link.source) && nodeIds.has(link.target))
        .map((link) => ({
          source: link.source,
          target: link.target,
          id: link.relationship_id,
        }));

      return { nodes, links };
    }

    return { nodes: [], links: [] };
  }, [selectedPath, selectedCommunityNumber, navData, nodeData]);

  const dropdownMenuItems = [
    {
      id: "titles",
      title: "Titles",
      description:
        "Show or hide the titles on the nodes for easier identifiction.",
      switch: graphSettings.titles,
    },
    {
      id: "relations",
      title: "Relations",
      description:
        "Display or hide the connections between nodes to visualize relationships.",
      switch: graphSettings.relations,
    },
    {
      id: "preview",
      title: "Preview",
      description:
        "Enable or disable a hover preview of the node's content on the graph.",
      switch: graphSettings.preview,
    },
  ];

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

  const handleBackClick = () => {
    if (selectedPath.length > 1 && navData) {
      const newPath = selectedPath.slice(0, -1);
      dispatch(setPath(newPath));

      const newPathIds = ["company_1"];
      if (newPath.length > 1) {
        const graphName = newPath[1];
        const graph = navData.graph.find((g) => g.graph_name === graphName);
        if (graph) {
          newPathIds.push(graph.graph_id);
        }
      }

      dispatch(setPathIds(newPathIds));
      dispatch(setCommunityNumber(null));
      dispatch(setTextUnitIds([]));
    }
  };

  const handleSettingChange = (id: string) => {
    setGraphSettings((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  // Update the getScreenCoordinates function
  const getScreenCoordinates = (x: number, y: number) => {
    if (!fgRef.current || typeof x !== "number" || typeof y !== "number") {
      return { x: 0, y: 0 };
    }

    const screenPos = fgRef.current.graph2ScreenCoords(x, y);
    return {
      x: isNaN(screenPos.x) ? 0 : screenPos.x,
      y: isNaN(screenPos.y) ? 0 : screenPos.y,
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNodeColor = (node: any) => {
    // For company node
    if (node.type === "company") {
      return companyColor;
    }

    // For graph nodes
    if (node.type === "graph") {
      const index = parseInt(node.id.split("_")[1]) % graphColor.length;
      return graphColor[index];
    }

    // For community nodes
    if (node.type === "community") {
      const index = node.community % communityColor.length;
      return communityColor[index];
    }

    // For entity nodes - use consistent random color
    if (node.type === "node") {
      if (!colorMap.has(node.id)) {
        const index = Math.floor(Math.random() * nodeColor.length);
        colorMap.set(node.id, nodeColor[index]);
      }
      return colorMap.get(node.id);
    }

    return "#cccccc"; // Default color
  };

  // Add this function to handle graph clicks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGraphClick = (node: any) => {
    if (node.type === "graph") {
      // Set the path
      const newPath = ["All Data", node.label];
      dispatch(setPath(newPath));

      // Set the pathIds
      const pathIds = ["company_1"]; // Start with company ID
      const graphId = node.id; // Get graph ID directly from node
      pathIds.push(graphId);

      dispatch(setPathIds(pathIds));

      // Reset community number and text unit ids when switching graphs
      dispatch(setCommunityNumber(null));
      dispatch(setTextUnitIds([]));
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full relative overflow-hidden"
    >
      <div className="absolute bg-red-500 text-white top-40 text-center left-0 z-30">
        {typeof selectedCommunityNumber === "number" &&
          `Community: ${selectedCommunityNumber}`}
      </div>
      <div className="absolute bg-red-500 text-white top-48 text-center left-0 z-30">
        {graphId && `Graph: ${graphId}`}
      </div>
      <div className="absolute items-center w-full top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-start w-full px-6 justify-between text-xl font-semibold text-foreground">
          {selectedPath.length > 1 ? (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1 text-sm hover:text-primary px-3 py-1 rounded-md hover:bg-border transition-colors"
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
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-border rounded-md p-2">
                <Settings2 className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Graph Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dropdownMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onSelect={(e) => e.preventDefault()}
                  className="hover:bg-transparent focus:bg-transparent"
                >
                  <div className="flex my-2 w-full justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold">{item.title}</p>
                      <p className="text-xs font-normal text-muted-foreground max-w-40">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={item.switch}
                      onCheckedChange={() => handleSettingChange(item.id)}
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
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeLabel=""
            nodeRelSize={6}
            nodeVal={(node) => node.val}
            nodeColor={(node) => node.color || getNodeColor(node)}
            linkColor={() => "#999"}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.01}
            linkDirectionalParticleColor={() => "#94a3b8"}
            linkWidth={1}
            backgroundColor="#ffffff"
            width={dimensions.width}
            height={dimensions.height}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onNodeHover={(node: any) => {
              setHoveredNode(node);
              if (
                node &&
                typeof node.x === "number" &&
                typeof node.y === "number"
              ) {
                const screenPos = getScreenCoordinates(node.x, node.y);
                setMousePosition({
                  x: isNaN(screenPos.x) ? 0 : screenPos.x,
                  y: isNaN(screenPos.y) ? 0 : screenPos.y,
                });
              }
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onNodeClick={(node: any) => {
              if (node.type === "graph") {
                handleGraphClick(node);
              } else if (node.type === "node") {
                setSelectedNode({
                  id: node.id,
                  title: node.label,
                  level: node.level,
                  degree: node.degree,
                  category: node.category,
                  type: node.type,
                });
                setIsSheetOpen(true);
              } else if (node.type === "community") {
                setSelectedNode({
                  id: node.id,
                  title: node.label,
                  level: node.level,
                  size: node.size,
                  type: "community",
                  community: node.community,
                });
                setIsSheetOpen(true);
              }
            }}
            nodeCanvasObject={(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              node: any,
              ctx: CanvasRenderingContext2D,
              globalScale: number
            ) => {
              // Draw the node circle
              const label = node.label;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              // const textWidth = ctx.measureText(label).width;
              const nodeR = Math.sqrt(node.val) * 3;

              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeR, 0, 2 * Math.PI);
              ctx.fillStyle = node.color || getNodeColor(node);
              ctx.fill();

              // Draw the text below the node
              if (graphSettings.titles) {
                ctx.fillStyle = "gray";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(label, node.x, node.y + nodeR + 2);
              }
            }}
          />
        )}
      </div>

      <HoverCard
        node={hoveredNode}
        position={mousePosition}
        show={graphSettings.preview}
      />

      <NodeSheet entityId={selectedNode?.id} />

      {/* <NodeSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        selectedNode={selectedNode}
      /> */}
    </div>
  );
}
