import { _Node, Entity, Links } from "../type/graph";

export const nodeData: _Node[] = [
  {
    entity_id: "entity_id_1",
    title: "entity_title_1",
    level: 0,
    community: 0,
    degree: 2,
  },
  {
    entity_id: "entity_id_2",
    title: "entity_title_2",
    level: 0,
    community: 0,
    degree: 4,
  },
  {
    entity_id: "entity_id_3",
    title: "entity_title_3",
    level: 0,
    community: 0,
    degree: 5,
  },
  {
    entity_id: "entity_id_4",
    title: "entity_title_4",
    level: 0,
    community: 0,
    degree: 6,
  },
  {
    entity_id: "entity_id_5",
    title: "entity_title_5",
    level: 0,
    community: 0,
    degree: 6,
  },
  {
    entity_id: "entity_id_6",
    title: "entity_title_6",
    level: 0,
    community: 0,
    degree: 6,
  },
];

export const entityData: Entity[] = [
  {
    entity_id: "entity_id_1",
    description: "node_description_1",
    type: "equipment",
    text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
    text_units: [],
  },
  {
    entity_id: "entity_id_2",
    description: "node_description_2",
    type: "equipment",
    text_unit_ids: ["text_unit_id_3", "text_unit_id_4"],
    text_units: [],
  },
  {
    entity_id: "entity_id_3",
    description: "node_description_3",
    type: "equipment",
    text_unit_ids: ["text_unit_id_5", "text_unit_id_6"],
    text_units: [],
  },
  {
    entity_id: "entity_id_4",
    description: "node_description_4",
    type: "equipment",
    text_unit_ids: ["text_unit_id_7", "text_unit_id_8"],
    text_units: [],
  },
  {
    entity_id: "entity_id_5",
    description: "node_description_5",
    type: "equipment",
    text_unit_ids: ["text_unit_id_9", "text_unit_id_10"],
    text_units: [],
  },
  {
    entity_id: "entity_id_6",
    description: "node_description_6",
    type: "equipment",
    text_unit_ids: ["text_unit_id_11", "text_unit_id_12"],
    text_units: [],
  },
];

export const linkData: Links[] = [
  {
    links: [
      {
        relationship_id: "relationship_id_1",
        source: "entity_id_1",
        target: "entity_id_2",
      },
      {
        relationship_id: "relationship_id_2",
        source: "entity_id_2",
        target: "entity_id_3",
      },
      {
        relationship_id: "relationship_id_3",
        source: "entity_id_3",
        target: "entity_id_4",
      },
      {
        relationship_id: "relationship_id_4",
        source: "entity_id_4",
        target: "entity_id_1",
      },
      {
        relationship_id: "relationship_id_5",
        source: "entity_id_5",
        target: "entity_id_6",
      },
      {
        relationship_id: "relationship_id_6",
        source: "entity_id_6",
        target: "entity_id_1",
      },
    ],
  },
];
