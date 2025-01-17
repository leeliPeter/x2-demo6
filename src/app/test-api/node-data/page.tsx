import React from "react";
import { getNodeData } from "@/api/nodeData";
import { getNavData } from "@/api/navData";

export default async function Page() {
  try {
    const [navData] = await getNavData();
    const firstGraph = navData.graph[0];

    if (!firstGraph?.graph_id) {
      throw new Error("No graph ID available");
    }

    const nodeData = await getNodeData(firstGraph.graph_id);

    // Create a map of entity_ids to node titles for easier lookup
    const nodeMap = nodeData.nodes.reduce((acc, node) => {
      acc[node.entity_id] = node.title;
      return acc;
    }, {} as { [key: string]: string });

    return (
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Current Graph</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[200px]">
            {JSON.stringify(firstGraph, null, 2)}
          </pre>
        </div>

        <h1 className="text-xl font-bold mb-4">
          Node Data Test for Graph ID: {firstGraph.graph_id}
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Nodes ({nodeData.nodes.length})
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
            {JSON.stringify(nodeData.nodes, null, 2)}
          </pre>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Links ({nodeData.links.length})
          </h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
            {nodeData.links.map((link, index) => (
              <div key={link.relationship_id} className="mb-2 p-2 border-b">
                <p className="font-medium">Relationship {index + 1}:</p>
                <p>
                  {nodeMap[link.source]} ({link.source}) →{" "}
                  {nodeMap[link.target]} ({link.target})
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Node Relationships Summary
          </h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>Total Nodes: {nodeData.nodes.length}</p>
            <p>Total Links: {nodeData.links.length}</p>
            <p>
              Average Connections per Node:{" "}
              {(nodeData.links.length / nodeData.nodes.length).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Sample Node with its Connections */}
        {nodeData.nodes.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Sample Node with Connections
            </h2>
            <div className="bg-gray-100 p-4 rounded">
              {(() => {
                const sampleNode = nodeData.nodes[0];
                const connections = nodeData.links.filter(
                  (link) =>
                    link.source === sampleNode.entity_id ||
                    link.target === sampleNode.entity_id
                );

                return (
                  <>
                    <h3 className="font-medium mb-2">
                      Node: {sampleNode.title} ({sampleNode.entity_id})
                    </h3>
                    <p className="mb-2">Connections:</p>
                    {connections.map((conn, index) => (
                      <div key={conn.relationship_id} className="ml-4">
                        {conn.source === sampleNode.entity_id ? (
                          <p>
                            → {nodeMap[conn.target]} ({conn.target})
                          </p>
                        ) : (
                          <p>
                            ← {nodeMap[conn.source]} ({conn.source})
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-600">
        <h1 className="text-xl font-bold mb-4">Error Loading Data</h1>
        <pre>
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </pre>
      </div>
    );
  }
}
