// .env
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

// get all communities
// /api/graphs/communities

interface Community {
  id: string;
  size: number;
  period: string;
  community: number;
  parent: number;
  level: number;
  graph: string; // graph_id
}

const getAllCommunities = async (): Promise<Community[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/communities`,
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
    console.error("Error fetching communities:", error);
    throw error;
  }
};

interface Graph {
  id: string;
  name: string;
  description?: string;
  owner: string;
  documents: string[];
  upload_filters: string[];
}
const getAllGraphs = async (): Promise<Graph[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs`,
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
    console.error("Error fetching graphs:", error);
    throw error;
  }
};

export interface NavData {
  company_id: string;
  company_name: string;
  graph: {
    graph_id: string;
    graph_name: string;
    communities: {
      community_id: string;
      community_title: string;
      community: number;
      level: number;
      parent?: number;
      size: number;
      period: string;
      text_unit_ids: string[];
    }[];
  }[];
}

export const getNavData = async (): Promise<NavData[]> => {
  try {
    // Fetch all required data
    const graphs = await getAllGraphs();
    const communities = await getAllCommunities();

    // Group communities by graph
    const communitiesByGraph = communities.reduce((acc, community) => {
      if (!acc[community.graph]) {
        acc[community.graph] = [];
      }
      acc[community.graph].push(community);
      return acc;
    }, {} as { [key: string]: Community[] });

    // Construct NavData structure
    const navData: NavData = {
      company_id: "default_company", // You might want to get this from somewhere
      company_name: "Company_name", // You might want to get this from somewhere
      graph: graphs.map((graph) => ({
        graph_id: graph.id,
        graph_name: graph.name,
        communities: (communitiesByGraph[graph.id] || []).map((community) => ({
          community_id: community.id,
          community_title: `Community ${community.community}`,
          community: community.community,
          level: community.level,
          parent: community.parent,
          size: community.size,
          period: community.period,
          text_unit_ids: [],
        })),
      })),
    };

    return [navData];
  } catch (error) {
    console.error("Error constructing nav data:", error);
    throw error;
  }
};
