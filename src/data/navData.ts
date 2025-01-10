import { Company } from "../type/graph";

// get navigation data
export const navData: Company = {
  id: "1",
  name: "FutureNest",
  graphs: [
    {
      id: "graph_A_1",
      name: "Graph A",
      communities: [
        {
          id: "community_id_1",
          level: 0,
          size: 12,
          period: "2024-01-01",
          community: 0,
          parent: -1,
          entity_ids: [
            "community_1_entity_id_1",
            "community_1_entity_id_2",
            "community_1_entity_id_3",
          ],
          text_unit_ids: [
            "community_1_text_unit_id_1",
            "community_1_text_unit_id_2",
            "community_1_text_unit_id_3",
          ],
        },
        {
          id: "community_id_2",
          level: 1,
          size: 46,
          period: "2024-01-01",
          community: 1,
          parent: 0,
          entity_ids: [
            "community_2_entity_id_1",
            "community_2_entity_id_2",
            "community_2_entity_id_3",
          ],
          text_unit_ids: [
            "community_2_text_unit_id_1",
            "community_2_text_unit_id_2",
            "community_2_text_unit_id_3",
          ],
        },
        {
          id: "community_id_3",
          level: 2,
          size: 100,
          period: "2024-01-01",
          community: 2,
          parent: 1,
          entity_ids: [
            "community_3_entity_id_1",
            "community_3_entity_id_2",
            "community_3_entity_id_3",
          ],
          text_unit_ids: [
            "community_3_text_unit_id_1",
            "community_3_text_unit_id_2",
            "community_3_text_unit_id_3",
          ],
        },
        {
          id: "community_id_4",
          level: 2,
          size: 100,
          period: "2024-01-01",
          community: 3,
          parent: 1,
          entity_ids: [
            "community_4_entity_id_1",
            "community_4_entity_id_2",
            "community_4_entity_id_3",
          ],
          text_unit_ids: [
            "community_4_text_unit_id_1",
            "community_4_text_unit_id_2",
            "community_4_text_unit_id_3",
          ],
        },
        {
          id: "community_id_5",
          level: 3,
          size: 100,
          period: "2024-01-01",
          community: 4,
          parent: 2,
          entity_ids: [
            "community_5_entity_id_1",
            "community_5_entity_id_2",
            "community_5_entity_id_3",
          ],
          text_unit_ids: [
            "community_5_text_unit_id_1",
            "community_5_text_unit_id_2",
            "community_5_text_unit_id_3",
          ],
        },
        {
          id: "community_id_6",
          level: 0,
          size: 100,
          period: "2024-01-01",
          community: 5,
          parent: -1,
          entity_ids: [
            "community_6_entity_id_1",
            "community_6_entity_id_2",
            "community_6_entity_id_3",
          ],
          text_unit_ids: [
            "community_6_text_unit_id_1",
            "community_6_text_unit_id_2",
            "community_6_text_unit_id_3",
          ],
        },
      ],
    },
    {
      id: "graph_B_1",
      name: "Graph B",
      communities: [
        {
          id: "community_id_7",
          level: 0,
          size: 100,
          period: "2024-01-01",
          community: 5,
          parent: -1,
          entity_ids: [
            "community_7_entity_id_1",
            "community_7_entity_id_2",
            "community_7_entity_id_3",
          ],
          text_unit_ids: [
            "community_7_text_unit_id_1",
            "community_7_text_unit_id_2",
            "community_7_text_unit_id_3",
          ],
        },
      ],
    },
  ],
};
