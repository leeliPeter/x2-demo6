import "./globals.css";
import { Providers } from "@/redux/provider";
import { getGraphDetail } from "@/api/graph_detail";
import { getNodeData } from "@/api/nodeData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch graph details instead of nav data
  const graphData = await getGraphDetail();

  // Get the first graph's node data
  const firstGraph = graphData.graph[0];
  const nodeData = firstGraph?.graph_id
    ? await getNodeData(firstGraph.graph_id)
    : {
        nodes: [],
        links: [],
      };

  return (
    <html lang="en">
      <body>
        <Providers navData={graphData} nodeData={nodeData}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
