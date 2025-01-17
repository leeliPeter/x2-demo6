import React from "react";
import { getNodeData } from "@/api/nodeData";
import { getNavData } from "@/api/navData";

export default async function Page() {
  try {
    // Get all graphs first
    const [navData] = await getNavData();

    // Get node data for each graph
    const graphsData = await Promise.all(
      navData.graph.map(async (graph) => {
        const data = await getNodeData(graph.graph_id);
        return {
          graphId: graph.graph_id,
          graphName: graph.graph_name,
          data,
        };
      })
    );

    return (
      <div className="p-4">
        {graphsData.map(({ graphId, graphName, data }) => (
          <div key={graphId} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Graph: {graphName} ({graphId})
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Nodes ({data.nodes.length})
              </h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[200px]">
                {JSON.stringify(data.nodes, null, 2)}
              </pre>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Links ({data.links.length})
              </h3>
              <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[200px]">
                {data.links.map((link) => (
                  <div key={link.relationship_id} className="mb-2">
                    <p>
                      {
                        data.nodes.find((n) => n.entity_id === link.source)
                          ?.title
                      }{" "}
                      →{" "}
                      {
                        data.nodes.find((n) => n.entity_id === link.target)
                          ?.title
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Summary</h3>
              <p>Total Nodes: {data.nodes.length}</p>
              <p>Total Links: {data.links.length}</p>
              <p>
                Average Connections:{" "}
                {(data.links.length / data.nodes.length || 0).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
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
