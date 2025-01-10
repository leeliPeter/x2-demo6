// Document table
interface _Document {
  id: string;
  title: string;
  raw_content: string;
  // create by the user, empty at the first
  description: string;
  // create by the user, empty at the first
  categories: string[];
  text_unit_ids: string[];
}

// Community Report table
interface CommunityReport {
  id: string;
  title: string;
  summary: string;
  community: number;
  full_content: string; // to explain the community
  rank: number;
  rank_explanation: string;
}

// Community table
interface Community {
  id: string;
  level: number;
  size: number;
  period: string;
  community: number; //for the parent child relationship
  parent?: number; //for the parent child relationship
  entity_ids: string[];
  text_unit_ids: string[]; // for getting  documents
}

interface TextUnit {
  id: string;
  text: string;
  document_ids: string[];
}

// nodes table
interface _Node {
  entity_id: string;
  title: string;
  level: number;
  degree: number;
  community: number; //show the node by community it belongs to
}

// entity table
interface Entity {
  entity_id: string;
  description: string;
  type: string;
  text_unit_ids: string[];
  // get it from text_unit_table by text_unit_ids
  text_units: TextUnit[];
}

// relationship table
interface Link {
  relationship_id: string;
  source: string; // entity_id
  target: string; // entity_id
}

interface Links {
  links: Link[];
}

// Create it
interface Graph {
  id: string;
  name: string;
  communities: Community[];
}

// Create it
interface Company {
  id: string;
  name: string;
  graphs: Graph[];
}

export type {
  Graph,
  Company,
  Community,
  Entity,
  Link,
  Links,
  TextUnit,
  _Document,
  _Node,
};
