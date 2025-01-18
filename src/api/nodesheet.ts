// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/node_sheet

interface NodeSheetResponse {
  entity_id: string;
  description: string;
  text_units: {
    id: string;
    human_readable_id: number;
    text: string;
    document: {
      id: string;
      title: string;
    };
  }[];
}

export const getNodeSheet = async (
  entityId: string
): Promise<NodeSheetResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/node_sheet?entity_id=${entityId}`,
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
    console.error("Error fetching node sheet:", error);
    throw error;
  }
};
