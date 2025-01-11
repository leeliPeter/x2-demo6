interface Community {
  community_id: string;
  community_title: string; // use community report title
  community: number;
  level: number;
  parent?: number;
  summary: string; //community report summary
  rank: number;
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

const navData: NavData = {
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
          community: 1,
          level: 0,
          summary:
            "该社区围绕5G分享器和5G路由器展开，这两种设备均由仁宝提供，旨在满足用户的网络需求。它们之间的关系表明了在现代通信中对高速网络连接的需求。",
          rank: 8.5,
        },
        {
          community_id: "graph_1_community_2",
          community_title: "5G模組及其關聯設備",
          community: 2,
          level: 0,
          summary:
            "本社群圍繞5G模組展開，該模組是多種5G設備的核心組件，包括5G路由器、5G隨身連網裝置、5G無人機等。這些設備之間存在密切的依賴關係，顯示出5G模組在推動5G技術發展中的重要性。",
          rank: 9.5,
        },
        {
          community_id: "graph_1_community_3",
          community_title: "淨利與綜合損益的關係",
          community: 3,
          parent: 1,
          level: 1,
          summary:
            "本社區圍繞淨利歸屬於母公司業主、綜合損益總額、淨利歸屬於非控制權益及其他綜合損益等關鍵實體，這些實體之間的關係揭示了企業財務表現的多維度結構。",
          rank: 8.5,
        },
        {
          community_id: "graph_1_community_4",
          community_title: "綜合損益與財務指標關係",
          community: 4,
          parent: 3,
          level: 2,
          summary:
            "本社群圍繞綜合損益及其相關財務指標，主要包括營業損益、每股盈餘及其他綜合損益。這些指標之間的關係顯示了企業的整體財務表現及經營成果。",
          rank: 8.5,
        },
        {
          community_id: "graph_1_community_5",
          community_title: "每股盈餘與企業盈利能力",
          community: 5,
          parent: 4,
          level: 3,
          summary:
            "本社群圍繞每股盈餘這一關鍵財務指標，涉及多個與企業盈利能力相關的實體，包括本期淨利（損）、稅後損益及繼續營業單位本期淨利。這些實體之間的關係顯示了它們在評估企業財務表現中的重要性。",
          rank: 9,
        },
      ],
    },
  ],
};
