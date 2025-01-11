interface Community {
  community_id: string;
  community_title: string; // use community report title
  community: number;
  level: number;
  parent?: number;
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
        },
        {
          community_id: "graph_1_community_2",
          community_title: "5G模組及其關聯設備",
          community: 1,
          level: 0,
        },
        {
          community_id: "graph_1_community_3",
          community_title: "淨利與綜合損益的關係",
          community: 2,
          parent: 0,
          level: 1,
        },
        {
          community_id: "graph_1_community_4",
          community_title: "綜合損益與財務指標關係",
          community: 3,
          parent: 2,
          level: 2,
        },
        {
          community_id: "graph_1_community_5",
          community_title: "每股盈餘與企業盈利能力",
          community: 4,
          parent: 3,
          level: 3,
        },
      ],
    },
  ],
};
