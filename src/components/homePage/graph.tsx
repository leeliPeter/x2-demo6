"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { nodeData, linkData } from "@/data/nodeData";
import { ArrowLeft, Settings2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/redux/features/navigationSlice";
import type { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-gray-100" />,
});

export default function Graph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fgRef = useRef<any>(null);

  // Update graphData to filter by community
  const graphData = useMemo(() => {
    const filteredNodes =
      selectedCommunityNumber !== null
        ? nodeData.filter((node) => node.community === selectedCommunityNumber)
        : nodeData;

    const nodes = filteredNodes.map((node) => ({
      id: node.entity_id,
      label: node.title,
      val: node.degree,
      level: node.level,
      community: node.community,
    }));

    const links = linkData[0].links
      .filter(
        (link) =>
          nodes.some((n) => n.id === link.source) &&
          nodes.some((n) => n.id === link.target)
      )
      .map((link) => ({
        source: link.source,
        target: link.target,
        id: link.relationship_id,
      }));

    return { nodes, links };
  }, [selectedCommunityNumber]);

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
    if (selectedPath.length > 1) {
      const newPath = selectedPath.slice(0, -1);
      dispatch(setPath(newPath));
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
    if (!fgRef.current) return { x: 0, y: 0 };

    // Use graph2ScreenCoords to get accurate screen coordinates
    const screenPos = fgRef.current.graph2ScreenCoords(x, y);
    return screenPos;
  };

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
            nodeAutoColorBy="community"
            linkColor={() => "#999"}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.01}
            linkDirectionalParticleColor={() => "#94a3b8"}
            linkWidth={1}
            backgroundColor="#ffffff"
            width={dimensions.width}
            height={dimensions.height}
            onNodeHover={(node: any) => {
              setHoveredNode(node);
              if (node) {
                const screenPos = getScreenCoordinates(node.x, node.y);
                setMousePosition(screenPos);
              }
            }}
            nodeCanvasObject={(
              node: any,
              ctx: CanvasRenderingContext2D,
              globalScale: number
            ) => {
              // Draw the node circle
              const label = node.label;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const nodeR = Math.sqrt(node.val) * 3;

              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeR, 0, 2 * Math.PI);
              ctx.fillStyle = node.color;
              ctx.fill();

              // Draw the text below the node
              if (graphSettings.titles) {
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(label, node.x, node.y + nodeR + 2);
              }
            }}
          />
        )}
      </div>

      {hoveredNode && graphSettings.preview && (
        <Card
          className="absolute p-4 bg-white shadow-lg rounded-lg z-30 max-w-[300px]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y + 15,
            transform: "translate(-50%, 0)",
            pointerEvents: "none",
          }}
        >
          <h3 className="font-semibold mb-2 text-xs">{hoveredNode.label}</h3>
          <div className="text-xs text-muted-foreground">
            <p>Community: {hoveredNode.community}</p>
            <p>Level: {hoveredNode.level}</p>
            <p>Connections: {hoveredNode.val}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
