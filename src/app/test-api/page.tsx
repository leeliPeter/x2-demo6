import React from "react";
import { getAllGraphs } from "@/api/graph";
import { getAllCommunities } from "@/api/communities";
import { getCommunitiesByGraphId } from "@/api/communitiesByGraphId";
import { getCommunityReports } from "@/api/reports";
import { getTextUnits } from "@/api/text_units";
import { getNodes } from "@/api/nodes";
import { getEntities } from "@/api/entities";
import { getRelations } from "@/api/relations";
import { getGraphDetail } from "@/api/graph_detail";
import { getNodeSheet } from "@/api/nodesheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface Community {
  id: string;
  size: number;
  period: string;
  community: number;
  parent: number;
  level: number;
  graph: string;
}

export interface Entity {
  id: string;
  title: string;
  type?: string;
  description?: string;
  graph: string;
}

export interface Graph {
  id: string;
  name: string;
  description?: string;
  owner: string;
  documents: string[];
  upload_filters: string[];
}

export interface Node {
  id: string;
  entity: string;
  title: string;
  community: number;
  level: number;
  degree: number;
}

export interface Relation {
  id: string;
  source: string;
  target: string;
  graph: string;
}

export interface CommunityReport {
  id: string;
  title: string;
  summary: string;
  community: number;
  rank: number;
  rank_explanation: string;
  findings: string[];
  full_content_json: string;
}

export interface TextUnit {
  id: string;
  human_readable_id: number;
  text: string;
  document: {
    id: string;
    title: string;
  };
}

export default async function Page() {
  // Fetch all data
  const communities = await getAllCommunities();
  const graphs = await getAllGraphs();
  const communitiesByGraphId = await getCommunitiesByGraphId(
    "6eb1dd4d-80d9-4059-bf80-afd0b4265c67"
  );
  const reports = await getCommunityReports();
  const textUnits = await getTextUnits();
  const nodes = await getNodes();
  const entities = await getEntities();
  const relations = await getRelations();
  const graphDetails = await getGraphDetail();
  // const nodesheet = await getNodeSheet("0028da7c-5fb4-4b9c-810d-bd2f4f52f481");

  const apiResults = [
    // { title: "Node Sheet", data: nodesheet },
    { title: "Graph Details", data: graphDetails },
    { title: "Communities", data: communities },
    { title: "Graphs", data: graphs },
    { title: "Communities by Graph ID", data: communitiesByGraphId },
    { title: "Reports", data: reports },
    { title: "Text Units", data: textUnits },
    { title: "Nodes", data: nodes },
    { title: "Entities", data: entities },
    { title: "Relations", data: relations },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">API Test Results</h1>
      {apiResults.map((result, index) => (
        <Collapsible key={index} className="border rounded-lg p-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between items-center"
            >
              <span>{result.title}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <pre className="bg-slate-100 p-4 rounded-lg overflow-auto max-h-96">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
