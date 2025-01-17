// .env
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

// get all graphs
// /api/graphs

export interface Graph {
  id: string;
  name: string;
  description?: string;
  owner: string;
  documents: string[];
  upload_filters: string[];
}

export const getAllGraphs = async (): Promise<Graph[]> => {
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
