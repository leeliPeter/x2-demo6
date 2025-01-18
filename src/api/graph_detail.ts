// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/graph_details

// .env
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

export interface GraphDetail {
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

export const getGraphDetail = async (): Promise<GraphDetail> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/graph_details`,
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

    const data = {
      company_id: "company_1",
      company_name: "Genial.ly",
      graph: await response.json(),
    };
    return data;
  } catch (error) {
    console.error("Error fetching graph details:", error);
    throw error;
  }
};
