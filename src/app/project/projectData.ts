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
