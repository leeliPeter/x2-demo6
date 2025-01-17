import "./globals.css";
import { Providers } from "@/redux/provider";
import { getNavData } from "@/api/navData";
import { getNodeData } from "@/api/nodeData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch nav data and node data at the root level
  const [navData] = await getNavData();

  // Get the first graph's node data
  const firstGraph = navData.graph[0];
  const nodeData = firstGraph?.graph_id
    ? await getNodeData(firstGraph.graph_id)
    : {
        nodes: [],
        links: [],
      };

  return (
    <html lang="en">
      <body>
        <Providers navData={navData} nodeData={nodeData}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
