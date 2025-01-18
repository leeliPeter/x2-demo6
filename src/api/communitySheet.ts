export interface CommunitySheetResponse {
  summary: string;
  community: number;
  rank: number;
  rank_explanation: string;
  documents: {
    document_id: string;
    document_title: string;
    document_text: string;
  }[];
}

export const getCommunitySheet = async (
  communityId: string
): Promise<CommunitySheetResponse> => {
  try {
    const response = await fetch(
      `/api/communitysheet?community_id=${communityId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching community sheet:", error);
    throw error;
  }
};
