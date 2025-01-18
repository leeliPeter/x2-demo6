// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/node_sheet

export interface NodeSheetResponse {
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
    const response = await fetch(`/api/nodesheet?entity_id=${entityId}`);

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
