interface SubSubSection {
  title: string;
  description: string;
}

interface SubSection {
  title: string;
  description: string;
  subSubSections?: SubSubSection[];
}

interface Section {
  title: string;
  description: string;
  subSections?: SubSection[];
}

interface Chapter {
  title: string;
  description: string;
  sections?: Section[];
}

interface ProjectData {
  id: string;
  name: string;
  chapters: Chapter[];
}

export const projectData: ProjectData = {
  id: "1",
  name: "Project 1",
  chapters: [
    {
      title: "Chapter 1",
      description:
        "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
      sections: [
        {
          title: "Section 1.1",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI ",
          subSections: [
            {
              title: "SubSection 1.1.1",
              description:
                "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
            },
            {
              title: "SubSection 1.1.2",
              description:
                "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
            },
            {
              title: "SubSection 1.1.3",
              description:
                "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
            },
          ],
        },
        {
          title: "Section 1.2",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
        },
        {
          title: "Section 1.3",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
        },
        {
          title: "Section 1.4",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
          subSections: [
            {
              title: "SubSection 1.4.1",
              description:
                "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
            },
          ],
        },
      ],
    },
    {
      title: "Chapter 2",
      description:
        "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
      sections: [
        {
          title: "Section 2.1",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
        },
        {
          title: "Section 2.2",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
          subSections: [
            {
              title: "SubSection 2.2.1",
              description:
                "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
            },
          ],
        },
        {
          title: "Section 2.3",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
        },
        {
          title: "Section 2.4",
          description:
            "Intelligent financial assistant for SMEs, combining AI and BI with patented technology, allowing business owners to quickly grasp the company's situation and complete tedious financial and accounting procedures by AI.",
        },
      ],
    },
  ],
};

interface AI_Section {
  title: string;
  systemPrompt: string;
  referenceInfo: string;
  query?: string;
}

interface AI_Chapter {
  title: string;
  sections: AI_Section[];
}

interface AI_Project {
  id: string;
  title: string;
  chapters: AI_Chapter[];
}

const systemPrompt = `你是一個專業的財務報表生成助手，能夠準確地根據用戶提供的數字生成固定格式的財務報告。請使用以下格式和內容，並保持一字不差，僅將數字替換為用戶提供的新數字：
6.2.3 現金流量分析台積公司及子公司財務報表單位：新台幣仟元
營業活動之現金流入約[數字]億：主要係包含稅後淨利及折舊、攤銷費用。
投資活動之現金流出約[數字]億：主要係用於資本支出。
以上為固定格式，您只需替換數字部分即可生成相應的報告。如果有其他特別需求，請告知！`;

const referenceInfo = `請提供以下財務資訊：
年初現金餘額(民國109年12月31日)的金額。
全年來自營業活動淨現金流量(民國110年)的金額。
全年因投資活動淨現金流量(民國110年)的金額。
請依照原報表格式提供詳細資訊，並確認數字是否與最新報表一致。
`;

const query = `請提供以下財務資訊：
年初現金餘額(民國109年12月31日)的金額。
全年來自營業活動淨現金流量(民國110年)的金額。
全年因投資活動淨現金流量(民國110年)的金額。
請依照原報表格式提供詳細資訊，並確認數字是否與最新報表一致。
`;

export const aiProjectData: AI_Project = {
  id: "1",
  title: "Project 1",
  chapters: [
    {
      title: "Chapter 1",
      sections: [
        {
          title: "Section 1.1",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.1.1",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.1.2",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.1.3",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.2",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.3",
          systemPrompt,
          referenceInfo,
        },
        {
          title: "Subsection 1.4",
          systemPrompt,
          referenceInfo,
        },
      ],
    },
    {
      title: "Chapter 2",
      sections: [
        {
          title: "Subsection 2.1",
          systemPrompt,
          referenceInfo,
          query,
        },
        {
          title: "Subsection 2.2",
          systemPrompt,
          referenceInfo,
          query,
        },
        {
          title: "Subsection 2.3",
          systemPrompt,
          referenceInfo,
          query,
        },
        {
          title: "Subsection 2.4",
          systemPrompt,
          referenceInfo,
          query,
        },
        {
          title: "Subsection 2.5",
          systemPrompt,
          referenceInfo,
          query,
        },
      ],
    },
  ],
};
