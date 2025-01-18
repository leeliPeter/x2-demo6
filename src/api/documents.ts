// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/documents

// .evn
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

export interface Document {
  text_unit_ids: string[];
  id: string;
  human_readable_id: string;
  title: string;
  text: string;
}

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const response = await fetch("/api/documents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};
