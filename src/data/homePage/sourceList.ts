// *
// *
// show all the documents
// *
// *

// document table
interface Document {
  document_id: string;
  document_title: string;
  document_content: string;
  text_unit_ids: string[];
}

interface Graph {
  graph_id: string;
  graph_name: string;
  documents: Document[];
}

interface SourceList {
  graphs: Graph[];
}

export const sourceList: SourceList = {
  graphs: [
    {
      graph_id: "graph_1",
      graph_name: "Knowledge set A",
      documents: [
        {
          document_id: "document_1",
          document_title: "document_1",
          document_content: "document_1",
          text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
        },
        {
          document_id: "document_2",
          document_title: "document_2",
          document_content: `||108 年度|109 年度|110 年度|111 年度|112 年度|
        |營業收入|916,280,028|991,279,270|1,171,613,858|1,003,642,791|874,914,215|
        |營業毛利|24,849,149|23,218,044|27,904,355|28,567,835|28,050,066|
        |營業損益|8,536,952|6,079,726|7,578,392|7,262,023|7,327,971|
        |營業外收入及支出|(713,273)|4,347,551|6,864,576|771,589|1,381,729|
        |稅前淨利|7,823,679|10,427`,
          text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
        },
        {
          document_id: "document_3",
          document_title: "document_3",
          document_content: `||108 年度|109 年度|110 年度|111 年度|112 年度|
        |營業收入|916,280,028|991,279,270|1,171,613,858|1,003,642,791|874,914,215|
        |營業毛利|24,849,149|23,218,044|27,904,355|28,567,835|28,050,066|
        |營業損益|8,536,952|6,079,726|7,578,392|7,262,023|7,327,971|
        |營業外收入及支出|(713,273)|4,347,551|6,864,576|771,589|1,381,729|
        |稅前淨利|7,823,679|10,427`,
          text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
        },
        {
          document_id: "document_4",
          document_title: "document_4",
          document_content: `||108 年度|109 年度|110 年度|111 年度|112 年度|
        |營業收入|916,280,028|991,279,270|1,171,613,858|1,003,642,791|874,914,215|
        |營業毛利|24,849,149|23,218,044|27,904,355|28,567,835|28,050,066|
        |營業損益|8,536,952|6,079,726|7,578,392|7,262,023|7,327,971|
        |營業外收入及支出|(713,273)|4,347,551|6,864,576|771,589|1,381,729|
        |稅前淨利|7,823,679|10,427`,
          text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
        },
        {
          document_id: "document_5",
          document_title: "document_5",
          document_content: `||108 年度|109 年度|110 年度|111 年度|112 年度|
              |營業收入|916,280,028|991,279,270|1,171,613,858|1,003,642,791|874,914,215|
              |營業毛利|24,849,149|23,218,044|27,904,355|28,567,835|28,050,066|
              |營業損益|8,536,952|6,079,726|7,578,392|7,262,023|7,327,971|
              |營業外收入及支出|(713,273)|4,347,551|6,864,576|771,589|1,381,729|
              |稅前淨利|7,823,679|10,427`,
          text_unit_ids: ["text_unit_id_1", "text_unit_id_2"],
        },
      ],
    },
  ],
};
