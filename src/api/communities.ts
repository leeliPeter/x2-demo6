// .env
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

// get all communities
// /api/graphs/communities

export interface Community {
  id: string;
  size: number;
  period: string;
  community: number;
  parent: number;
  level: number;
  graph: string;
}

export const getAllCommunities = async (): Promise<Community[]> => {
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
