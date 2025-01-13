interface Community {
  community_id: string;
  community_title: string; // use community report title
  community: number;
  level: number;
  parent?: number;
  size: number;
  period: string;
  text_unit_ids: string[];
}

interface GraphData {
  graph_id: string;
  graph_name: string;
  communities: Community[];
}

interface NavData {
  company_id: string;
  conpanyName: string;
  graph: GraphData[];
}

export const navData: NavData = {
  company_id: "company_1",
  conpanyName: "FutureNest",
  graph: [
    {
      graph_id: "graph_1",
      graph_name: "Graph A",
      communities: [
        {
          community_id: "graph_1_community_1",
          community_title: "5G分享器与5G路由器的关系",
          community: 0,
          level: 0,
          size: 90,
          period: "2024-01-01",
          text_unit_ids: ["text_unit_1", "text_unit_2"],
        },
        {
          community_id: "graph_1_community_2",
          community_title: "5G模組及其關聯設備",
          community: 1,
          level: 0,
          size: 20,
          period: "2024-01-01",
          text_unit_ids: ["text_unit_3", "text_unit_4"],
        },
        {
          community_id: "graph_1_community_3",
          community_title: "淨利與綜合損益的關係",
          community: 2,
          parent: 0,
          level: 1,
          size: 40,
          period: "2024-01-01",
          text_unit_ids: ["text_unit_5", "text_unit_6"],
        },
        {
          community_id: "graph_1_community_4",
          community_title: "綜合損益與財務指標關係",
          community: 3,
          parent: 2,
          level: 2,
          size: 50,
          period: "2024-01-01",
          text_unit_ids: ["text_unit_7", "text_unit_8"],
        },
        {
          community_id: "graph_1_community_5",
          community_title: "每股盈餘與企業盈利能力",
          community: 4,
          parent: 3,
          level: 3,
          size: 90,
          period: "2024-01-01",
          text_unit_ids: ["text_unit_9", "text_unit_10"],
        },
      ],
    },
  ],
};
