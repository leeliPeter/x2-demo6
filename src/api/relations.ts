// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/relations

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
