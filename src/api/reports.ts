// http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com/api/graphs/community_reports

// .env
// NEXT_PUBLIC_API_URL=http://genialtx-x2-dev-lb-728896293.ap-northeast-1.elb.amazonaws.com

export interface CommunityReport {
  id: string;
  title: string;
  summary: string;
  community: number;
  rank: number;
  rank_explanation: string;
  findings: string[];
  full_content_json: string;
}

export const getCommunityReports = async (): Promise<CommunityReport[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/graphs/community_reports`,
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
    console.error("Error fetching community reports:", error);
    throw error;
  }
};
