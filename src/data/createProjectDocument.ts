interface Document {
  document_id: string;
  document_title: string;
  document_content: string;
}

interface KnowledgeSet {
  knowledge_set_id: string;
  knowledge_set_name: string;
  knowledge_set_documents: Document[];
}

interface CreateProjectDocument {
  knowledge_sets: KnowledgeSet[];
}

export const createProjectDocument: CreateProjectDocument = {
  knowledge_sets: [
    {
      knowledge_set_id: "knowledge_set_1",
      knowledge_set_name: "knowledge_set_1",
      knowledge_set_documents: [
        {
          document_id: "document_1_id",
          document_title: "document_1_title",
          document_content: "document_1_content",
        },
        {
          document_id: "document_2_id",
          document_title: "document_2_title",
          document_content: "document_2_content",
        },
        {
          document_id: "document_3_id",
          document_title: "document_3_title",
          document_content: "document_3_content",
        },
      ],
    },
    {
      knowledge_set_id: "knowledge_set_2",
      knowledge_set_name: "knowledge_set_2",
      knowledge_set_documents: [
        {
          document_id: "document_4_id",
          document_title: "document_4_title",
          document_content: "document_4_content",
        },
        {
          document_id: "document_5_id",
          document_title: "document_5_title",
          document_content: "document_5_content",
        },
        {
          document_id: "document_6_id",
          document_title: "document_6_title",
          document_content: "document_6_content",
        },
      ],
    },
  ],
};
