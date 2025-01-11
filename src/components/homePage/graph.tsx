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

  // Prepare the data in the format required by ForceGraph2D
  const graphData = useMemo(() => {
    return {
      nodes: nodeData.map((node) => ({
        id: node.entity_id,
        label: node.title,
        val: node.degree, // Node size based on degree
        level: node.level,
        community: node.community,
      })),
      links: linkData[0].links.map((link) => ({
        source: link.source,
        target: link.target,
        id: link.relationship_id,
      })),
    };
  }, []);

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

  const handleNodeClick = (node: any) => {
    console.log("Clicked node:", node);
    // Add the clicked node's label to the path
    dispatch(setPath([...selectedPath, node.label]));
  };

  const handleSettingChange = (id: string) => {
    setGraphSettings((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
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
            ref={graphRef}
            graphData={graphData}
            nodeLabel="label"
            nodeRelSize={6}
            nodeVal={(node) => node.val}
            nodeAutoColorBy="community"
            linkColor={() => "#999"}
            backgroundColor="#ffffff"
            width={dimensions.width}
            height={dimensions.height}
            onNodeClick={handleNodeClick}
          />
        )}
      </div>
    </div>
  );
}
