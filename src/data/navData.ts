interface NavItem {
  title: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "All Data",
    children: [
      {
        title: "Graph A",
        children: [
          {
            title: "Community L1",
          },
          {
            title: "Community L2",
          },
          {
            title: "Community L3",
          },
        ],
      },
      {
        title: "Graph B",
        children: [
          {
            title: "Community L1",
          },
          {
            title: "Community L2",
          },
          {
            title: "Community L3",
          },
        ],
      },
    ],
  },
];
