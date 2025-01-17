import React from "react";
import { getNodes, getRelations } from "@/api/nodeData";

export default async function Page() {
  const nodes = await getNodes();
  const relations = await getRelations();
  return (
    <div>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
      <pre>{JSON.stringify(relations, null, 2)}</pre>
    </div>
  );
}
