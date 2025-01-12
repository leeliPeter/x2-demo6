import React from "react";
import { Card } from "@/components/ui/card";
import { Hexagon, CircleDotDashed, FolderUp } from "lucide-react";

interface HoverCardProps {
  node: any;
  position: {
    x: number;
    y: number;
  };
  show: boolean;
}

const NodeIcon = {
  community: CircleDotDashed,
  default: Hexagon,
};

export default function HoverCard({ node, position, show }: HoverCardProps) {
  if (!show || !node || node.type === "graph" || node.type === "company")
    return null;

  const IconComponent =
    NodeIcon[node.type as keyof typeof NodeIcon] || NodeIcon.default;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      className="absolute px-3 py-2 bg-white shadow-lg rounded-lg z-30 max-w-[300px]"
      style={{
        left: position.x,
        top: position.y + 15,
        transform: "translate(-50%, 0)",
        pointerEvents: "none",
      }}
    >
      <div className="flex gap-2 mt-1 items-start">
        <div className="mt-0.5">
          <IconComponent className="w-4 h-4 text-muted-foreground" />
        </div>
        {node.type === "community" && (
          <div className="flex flex-col ">
            <h3 className="font-semibold mb-2 text-sm">{node.label}</h3>
            <div className="text-xs text-muted-foreground flex flex-col gap-1">
              {typeof node.level === "number" && (
                <p>Community Level: {node.level}</p>
              )}
              {node.size && <p>Size: {node.size}</p>}
              {node.period && (
                <p className="flex items-center gap-1">
                  <FolderUp className="w-4 h-4" />
                  Generated @{formatDate(node.period)}
                </p>
              )}
            </div>
          </div>
        )}
        {node.type === "node" && (
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2 text-sm">{node.label}</h3>
            <div className="text-xs text-muted-foreground flex flex-col gap-1">
              {typeof node.degree === "number" && <p>Degree: {node.degree}</p>}
              {node.category && <p>Type: {node.category}</p>}
              {typeof node.level === "number" && (
                <p>Community Level: {node.level}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
