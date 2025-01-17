export interface Node {
  id: string;
  entity: string;
  title: string;
  community: number;
  level: number;
  degree: number;
}

export const getNodes = async (): Promise<Node[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/nodes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nodes:", error);
    throw error;
  }
};

export interface Entity {
  id: string;
  title: string;
  type?: string;
  description?: string;
  graph: string;
}

export const getEntitiesByGraphId = async (
  graphId: string
): Promise<Entity[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/entities/${graphId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching entities by graph ID:", error);
    throw error;
  }
};

export interface Relation {
  id: string;
  source: string;
  target: string;
  graph: string;
}

export const getRelations = async (): Promise<Relation[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/relations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching relations:", error);
    throw error;
  }
};

export interface NodeData {
  nodes: {
    entity_id: string;
    title: string;
    degree: number;
    level: number;
    type: string;
    community: number;
  }[];
  links: {
    relationship_id: string;
    source: string;
    target: string;
  }[];
}

export const getNodeData = async (
  graphId: string,
  communityNumber?: number
): Promise<NodeData> => {
  try {
    // Fetch all required data in parallel
    const [nodes, entities, relations] = await Promise.all([
      getNodes(),
      getEntitiesByGraphId(graphId),
      getRelations(),
    ]);

    // Create a map of entities for quick lookup and filter by graph
    const entityMap = entities.reduce((acc, entity) => {
      if (entity.graph === graphId) {
        acc[entity.id] = entity;
      }
      return acc;
    }, {} as { [key: string]: Entity });

    // Filter nodes that have matching entities in this graph
    const filteredNodes = nodes.filter(
      (node) =>
        node.entity in entityMap &&
        (communityNumber === undefined || node.community === communityNumber)
    );

    // Transform nodes with entity data
    const transformedNodes = filteredNodes.map((node) => ({
      entity_id: node.entity,
      title: node.title,
      degree: node.degree,
      level: node.level,
      type: entityMap[node.entity].type || "default",
      community: node.community,
    }));

    // Filter relations to only include connections between transformed nodes
    // and ensure they belong to this graph
    const validEntityIds = new Set(transformedNodes.map((n) => n.entity_id));
    const transformedLinks = relations
      .filter(
        (relation) =>
          validEntityIds.has(relation.source) &&
          validEntityIds.has(relation.target) &&
          relation.graph === graphId
      )
      .map((relation) => ({
        relationship_id: relation.id,
        source: relation.source,
        target: relation.target,
      }));

    return {
      nodes: transformedNodes,
      links: transformedLinks,
    };
  } catch (error) {
    console.error("Error fetching node data:", error);
    throw error;
  }
};
