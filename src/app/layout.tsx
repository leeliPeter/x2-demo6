import "./globals.css";
import { Providers } from "@/redux/provider";
import { getGraphDetail } from "@/api/graph_detail";
import { getNodeData } from "@/api/nodeData";
import Loading from "@/components/loading";
import { Suspense } from "react";

async function InitialDataLoader({ children }: { children: React.ReactNode }) {
  const graphData = await getGraphDetail();
  const firstGraph = graphData.graph[0];
  const nodeData = firstGraph?.graph_id
    ? await getNodeData(firstGraph.graph_id)
    : {
        nodes: [],
        links: [],
      };

  return (
    <Providers navData={graphData} nodeData={nodeData}>
      {children}
    </Providers>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <InitialDataLoader>{children}</InitialDataLoader>
        </Suspense>
      </body>
    </html>
  );
}
