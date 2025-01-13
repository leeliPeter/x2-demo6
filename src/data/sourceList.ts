// document table
interface Document {
  document_id: string;
  document_title: string;
  document_content: string;
}

interface SourceList {
  documents: Document[];
}

export const sourceList: SourceList = {
  documents: [
    {
      document_id: "document_1",
      document_title: "document_1",
      document_content: "document_1",
    },
    {
      document_id: "document_2",
      document_title: "document_2",
      document_content: "document_2",
    },
    {
      document_id: "document_3",
      document_title: "document_3",
      document_content: "document_3",
    },
    {
      document_id: "document_4",
      document_title: "document_4",
      document_content: "document_4",
    },
    {
      document_id: "document_5",
      document_title: "document_5",
      document_content: "document_5",
    },
  ],
};
