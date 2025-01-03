interface NavItem {
  title: string;
  icon?: React.ReactNode;
  size?: string;
  date?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "All Data",
    children: [
      {
        title: "Graph A",
        size: "316MB",
        date: "2024-01-01",
        children: [
          {
            title: "Community L1",
            size: "100MB",
            date: "2024-01-01",
            children: [
              {
                title: "Node 1",
                size: "45MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node A1",
                    size: "15MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node A2",
                    size: "15MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node A3",
                    size: "15MB",
                    date: "2024-01-01",
                  },
                ],
              },
              {
                title: "Node 2",
                size: "55MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node B1",
                    size: "20MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node B2",
                    size: "35MB",
                    date: "2024-01-01",
                  },
                ],
              },
            ],
          },
          {
            title: "Community L2",
            size: "100MB",
            date: "2024-01-01",
            children: [
              {
                title: "Node 3",
                size: "60MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node C1",
                    size: "30MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node C2",
                    size: "30MB",
                    date: "2024-01-01",
                  },
                ],
              },
              {
                title: "Node 4",
                size: "40MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node D1",
                    size: "20MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node D2",
                    size: "20MB",
                    date: "2024-01-01",
                  },
                ],
              },
            ],
          },
          {
            title: "Community L3",
            size: "116MB",
            date: "2024-01-01",
            children: [
              {
                title: "Node 5",
                size: "66MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node E1",
                    size: "22MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node E2",
                    size: "22MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node E3",
                    size: "22MB",
                    date: "2024-01-01",
                  },
                ],
              },
              {
                title: "Node Group 6",
                size: "50MB",
                date: "2024-01-01",
                children: [
                  {
                    title: "Node F1",
                    size: "25MB",
                    date: "2024-01-01",
                  },
                  {
                    title: "Node F2",
                    size: "25MB",
                    date: "2024-01-01",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Graph B",
        size: "316MB",
        date: "2024-01-01",
        children: [
          {
            title: "Community B1",
            size: "100MB",
            date: "2024-01-01",
            children: [],
          },
          {
            title: "Community B2",
            size: "100MB",
            date: "2024-01-01",
            children: [],
          },
          {
            title: "Community B3",
            size: "100MB",
            date: "2024-01-01",
            children: [],
          },
        ],
      },
    ],
  },
];
