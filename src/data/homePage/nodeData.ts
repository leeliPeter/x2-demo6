// *
// *
// I will provide community :number and graph_id
// and return the nodes based match the community number
// *
// *

interface Nodes {
  entity_id: string;
  title: string;
  degree: number;
  level: number;
  type: string; // Entitles table;
  community: number;
}

interface Link {
  relationship_id: string;
  source: string; // entity_id
  target: string; // entity_id
}

interface Links {
  links: Link[];
}

export const nodeData: Nodes[] = [
  {
    entity_id: "entity_1",
    title: "筆記型電腦",
    degree: 20,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_2",
    title: "超薄筆記型電腦",
    degree: 10,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_3",
    title: "2-IN-1 筆記型電腦",
    degree: 30,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_4",
    title: "一體式電腦",
    degree: 50,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_5",
    title: "5G 終端應用產品",
    degree: 40,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_6",
    title: "5G 小基站",
    degree: 80,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_7",
    title: "5G O-RAN 專網",
    degree: 90,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_8",
    title: "平板電腦",
    degree: 30,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_9",
    title: "智慧型手機",
    degree: 50,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_10",
    title: "智慧型穿戴裝置",
    degree: 60,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_11",
    title: "無線智慧藍芽耳機",
    degree: 70,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_12",
    title: "智慧顯示產品",
    degree: 10,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_13",
    title: "AR/VR 智慧型顯示裝置",
    degree: 40,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_14",
    title: "智慧家庭裝置",
    degree: 50,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_15",
    title: "仁寶",
    degree: 60,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_16",
    title: "商用筆記型電腦",
    degree: 20,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_17",
    title: "電競筆記型電腦",
    degree: 30,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_18",
    title: "CHROMEBOOK",
    degree: 40,
    level: 0,
    type: "設備",
    community: 0,
  },
  {
    entity_id: "entity_19",
    title: "英特爾",
    degree: 50,
    level: 0,
    type: "設備",
    community: 0,
  },
];

export const linkData: Links[] = [
  {
    links: [
      // Computer-related connections
      {
        relationship_id: "link_1",
        source: "entity_1", // 筆記型電腦
        target: "entity_2", // 超薄筆記型電腦
      },
      {
        relationship_id: "link_2",
        source: "entity_1", // 筆記型電腦
        target: "entity_3", // 2-IN-1 筆記型電腦
      },
      {
        relationship_id: "link_3",
        source: "entity_1", // 筆記型電腦
        target: "entity_16", // 商用筆記型電腦
      },
      {
        relationship_id: "link_4",
        source: "entity_1", // 筆記型電腦
        target: "entity_17", // 電競筆記型電腦
      },
      {
        relationship_id: "link_5",
        source: "entity_1", // 筆記型電腦
        target: "entity_18", // CHROMEBOOK
      },
      // 5G related connections
      {
        relationship_id: "link_6",
        source: "entity_5", // 5G 終端應用產品
        target: "entity_6", // 5G 小基站
      },
      {
        relationship_id: "link_7",
        source: "entity_6", // 5G 小基站
        target: "entity_7", // 5G O-RAN 專網
      },
      // Mobile device connections
      {
        relationship_id: "link_8",
        source: "entity_9", // 智慧型手機
        target: "entity_10", // 智慧型穿戴裝置
      },
      {
        relationship_id: "link_9",
        source: "entity_9", // 智慧型手機
        target: "entity_11", // 無線智慧藍芽耳機
      },
      // Smart display connections
      {
        relationship_id: "link_10",
        source: "entity_12", // 智慧顯示產品
        target: "entity_13", // AR/VR 智慧型顯示裝置
      },
      {
        relationship_id: "link_11",
        source: "entity_13", // AR/VR 智慧型顯示裝置
        target: "entity_14", // 智慧家庭裝置
      },
      // Company connections
      {
        relationship_id: "link_12",
        source: "entity_15", // 仁寶
        target: "entity_1", // 筆記型電腦
      },
      {
        relationship_id: "link_13",
        source: "entity_19", // 英特爾
        target: "entity_1", // 筆記型電腦
      },
      // Tablet connections
      {
        relationship_id: "link_14",
        source: "entity_8", // 平板電腦
        target: "entity_9", // 智慧型手機
      },
      {
        relationship_id: "link_15",
        source: "entity_8", // 平板電腦
        target: "entity_1", // 筆記型電腦
      },
      {
        relationship_id: "link_16",
        source: "entity_4", // 筆記型電腦
        target: "entity_10", // 英特爾
      },
    ],
  },
];
