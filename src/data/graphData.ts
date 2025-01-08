export interface Node {
  id: string;
  title: string;
  icon: string;
  level: number;
  description: string;
  color: string;
  date?: string;
  type?: string;
  document?: Document;
}

export interface Document {
  id: string;
  title: string;
  text: string;
}

export interface Community {
  id: string;
  title: string;
  level: number;
  period?: string;
  icon?: string;
  size?: number;
  citedDocuments?: Document[];
  communityReport?: string;
  nodes: Node[];
  children?: Community[];
}

export interface Graph {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  communities: Community[];
}

export interface GraphData {
  id: string;
  company: string;
  graphs: Graph[];
}

export const graphData: GraphData = {
  id: "001",
  company: "FutureNest",
  graphs: [
    {
      id: "0001",
      title: "Graph A",
      color: "#62BEB3",
      communities: [
        {
          id: "001",
          title: "Community 0",
          level: 0,
          period: "2024-10-01",
          size: 100,
          citedDocuments: [],
          communityReport: "This is a community report for Graph A",
          nodes: [
            {
              id: "a-1-1",
              title: "Node A",
              icon: "CircleDotDashed",
              level: 0,
              type: "equipment",
              description: "This is a description of the node",
              color: "#62BEB3",
            },
            {
              id: "a-1-2",
              title: "Data Pipeline",
              icon: "CircleDotDashed",
              level: 0,
              type: "pipeline",
              description: "Data processing and transformation pipeline",
              color: "#f87171",
            },
            {
              id: "a-1-3",
              title: "Security Gateway",
              icon: "CircleDotDashed",
              level: 0,
              type: "security",
              description: "Security monitoring and control system",
              color: "#60a5fa",
            },
            {
              id: "a-1-4",
              title: "Storage Hub",
              icon: "CircleDotDashed",
              level: 0,
              type: "storage",
              description: "Central data storage management",
              color: "#4ade80",
            },
            {
              id: "a-1-5",
              title: "API Service",
              icon: "CircleDotDashed",
              level: 0,
              type: "service",
              description: "API management and routing",
              color: "#f472b6",
            },
            {
              id: "a-1-6",
              title: "Cache System",
              icon: "CircleDotDashed",
              level: 0,
              type: "cache",
              description: "Data caching and optimization",
              color: "#fbbf24",
            },
            {
              id: "a-1-7",
              title: "Auth Center",
              icon: "CircleDotDashed",
              level: 0,
              type: "security",
              description: "Authentication and authorization service",
              color: "#a78bfa",
            },
            {
              id: "a-1-8",
              title: "ML Engine",
              icon: "CircleDotDashed",
              level: 0,
              type: "ai",
              description: "Machine learning processing engine",
              color: "#34d399",
            },
            {
              id: "a-1-9",
              title: "Search Service",
              icon: "CircleDotDashed",
              level: 0,
              type: "service",
              description: "Search and indexing system",
              color: "#fb923c",
            },
            {
              id: "a-1-10",
              title: "Queue Manager",
              icon: "CircleDotDashed",
              level: 0,
              type: "service",
              description: "Message queue management system",
              color: "#94a3b8",
            },
            {
              id: "a-1-11",
              title: "Analytics Hub",
              icon: "CircleDotDashed",
              level: 0,
              type: "analytics",
              description: "Data analytics and processing center",
              color: "#c084fc",
            },
            {
              id: "a-1-12",
              title: "Backup Service",
              icon: "CircleDotDashed",
              level: 0,
              type: "storage",
              description: "Data backup and recovery system",
              color: "#2dd4bf",
            },
            {
              id: "a-1-13",
              title: "Config Manager",
              icon: "CircleDotDashed",
              level: 0,
              type: "service",
              description: "Configuration management system",
              color: "#f43f5e",
            },
            {
              id: "a-1-14",
              title: "Log Collector",
              icon: "CircleDotDashed",
              level: 0,
              type: "monitoring",
              description: "System logging and monitoring",
              color: "#facc15",
            },
            {
              id: "a-1-15",
              title: "ETL Service",
              icon: "CircleDotDashed",
              level: 0,
              type: "pipeline",
              description: "Extract, Transform, Load service",
              color: "#06b6d4",
            },
            {
              id: "a-1-16",
              title: "Metrics Center",
              icon: "CircleDotDashed",
              level: 0,
              type: "monitoring",
              description: "System metrics collection and analysis",
              color: "#ec4899",
            },
            {
              id: "a-1-17",
              title: "Data Lake",
              icon: "CircleDotDashed",
              level: 0,
              type: "storage",
              description: "Large-scale data storage system",
              color: "#8b5cf6",
            },
            {
              id: "a-1-18",
              title: "Load Balancer",
              icon: "CircleDotDashed",
              level: 0,
              type: "network",
              description: "Traffic distribution and management",
              color: "#10b981",
            },
            {
              id: "a-1-19",
              title: "Event Bus",
              icon: "CircleDotDashed",
              level: 0,
              type: "messaging",
              description: "Event distribution system",
              color: "#f97316",
            },
            {
              id: "a-1-20",
              title: "Resource Manager",
              icon: "CircleDotDashed",
              level: 0,
              type: "service",
              description: "Resource allocation and management",
              color: "#6366f1",
            },
          ],
          children: [
            {
              id: "002",
              title: "Community 1",
              level: 1,
              size: 120,
              period: "2024-01-01",
              citedDocuments: [],
              communityReport: "This is a community report",
              nodes: [
                {
                  id: "a-2-1",
                  title: "Data Processor",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "processor",
                  description: "High-performance data processing unit",
                  color: "#0ea5e9",
                },
                {
                  id: "a-2-2",
                  title: "Network Gateway",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "network",
                  description: "Network traffic management and routing",
                  color: "#14b8a6",
                },
                {
                  id: "a-2-3",
                  title: "Model Registry",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "ai",
                  description: "ML model versioning and storage",
                  color: "#8b5cf6",
                },
                {
                  id: "a-2-4",
                  title: "Stream Processor",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "streaming",
                  description: "Real-time data stream processing",
                  color: "#f43f5e",
                },
                {
                  id: "a-2-5",
                  title: "Identity Provider",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "security",
                  description: "Identity and access management",
                  color: "#22c55e",
                },
                {
                  id: "a-2-6",
                  title: "Workflow Engine",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "orchestration",
                  description: "Process workflow orchestration",
                  color: "#eab308",
                },
                {
                  id: "a-2-7",
                  title: "Time Series DB",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "database",
                  description: "Time series data storage",
                  color: "#ec4899",
                },
                {
                  id: "a-2-8",
                  title: "Alert Manager",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "monitoring",
                  description: "System alerting and notification",
                  color: "#6366f1",
                },
                {
                  id: "a-2-9",
                  title: "Graph Database",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "database",
                  description: "Graph relationship storage",
                  color: "#84cc16",
                },
                {
                  id: "a-2-10",
                  title: "Service Mesh",
                  icon: "CircleDotDashed",
                  level: 1,
                  type: "network",
                  description: "Service communication layer",
                  color: "#f97316",
                },
              ],
              children: [
                {
                  id: "003",
                  title: "Community 2",
                  level: 2,
                  size: 140,
                  period: "2024-01-01",
                  citedDocuments: [],
                  communityReport: "This is a community report",
                  nodes: [
                    {
                      id: "a-3-1",
                      title: "Metrics Collector",
                      icon: "CircleDotDashed",
                      level: 2,
                      type: "monitoring",
                      description: "System-wide metrics collection service",
                      color: "#0891b2",
                    },
                    {
                      id: "a-3-2",
                      title: "Data Validator",
                      icon: "CircleDotDashed",
                      level: 2,
                      type: "quality",
                      description: "Data validation and quality control",
                      color: "#db2777",
                    },
                    {
                      id: "a-3-3",
                      title: "Schema Registry",
                      icon: "CircleDotDashed",
                      level: 2,
                      type: "metadata",
                      description: "Schema management and versioning",
                      color: "#4f46e5",
                    },
                    {
                      id: "a-3-4",
                      title: "Task Scheduler",
                      icon: "CircleDotDashed",
                      level: 2,
                      type: "orchestration",
                      description: "Job scheduling and orchestration",
                      color: "#16a34a",
                    },
                    {
                      id: "a-3-5",
                      title: "Policy Engine",
                      icon: "CircleDotDashed",
                      level: 2,
                      type: "governance",
                      description: "Data governance and policy enforcement",
                      color: "#ea580c",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "0002",
      title: "Graph B",
      color: "#F472B6",
      communities: [
        {
          id: "b-001",
          title: "Community 0",
          level: 0,
          period: "2024-10-01",
          size: 100,
          citedDocuments: [],
          communityReport: "This is a community report for community 0",
          nodes: [
            {
              id: "b-1-1",
              title: "Node B",
              icon: "CircleDotDashed",
              level: 0,
              description: "This is a description of the node",
              color: "#F472B6",
              type: "equipment",
            },
            {
              id: "b-1-2",
              title: "Node B",
              icon: "CircleDotDashed",
              level: 0,
              description: "This is a description of the node",
              color: "#F472B6",
              type: "equipment",
            },
          ],
        },
      ],
    },
  ],
};

export const companyNode = {
  id: "company-futurenest",
  title: "FutureNest",
  icon: "CircleDotDashed",
  level: 0,
  type: "company",
  description: "Company root node",
  color: "#1F2B7B",
  label: "FutureNest",
};

export const companyLinks = [
  { source: "company-futurenest", target: "0001" },
  { source: "company-futurenest", target: "0002" },
];

export const links = [
  { source: "a-1-1", target: "a-1-2" },
  { source: "a-1-2", target: "a-1-3" },
  { source: "a-1-3", target: "a-1-4" },
  { source: "a-1-3", target: "a-1-6" },
  { source: "a-1-4", target: "a-1-5" },
  { source: "a-1-5", target: "a-1-6" },
  { source: "a-1-6", target: "a-1-7" },
  { source: "a-1-7", target: "a-1-8" },
  { source: "a-1-7", target: "a-1-1" },
  { source: "a-1-8", target: "a-1-9" },
  { source: "a-1-9", target: "a-1-10" },
  { source: "a-1-10", target: "a-1-11" },
  { source: "a-1-11", target: "a-1-12" },
  { source: "a-1-12", target: "a-1-13" },
  { source: "a-1-13", target: "a-1-14" },
  { source: "a-1-14", target: "a-1-15" },
  { source: "a-1-15", target: "a-1-16" },
  { source: "a-1-16", target: "a-1-17" },
  { source: "a-1-17", target: "a-1-18" },
  { source: "a-1-18", target: "a-1-19" },
  { source: "a-1-19", target: "a-1-20" },
  { source: "a-2-1", target: "a-2-2" },
  { source: "a-2-2", target: "a-2-3" },
  { source: "a-2-3", target: "a-2-4" },
  { source: "a-2-4", target: "a-2-5" },
  { source: "a-2-4", target: "a-2-3" },
  { source: "a-2-5", target: "a-2-6" },
  { source: "a-2-6", target: "a-2-7" },
  { source: "a-2-7", target: "a-2-8" },
  { source: "a-2-8", target: "a-2-9" },
  { source: "a-2-9", target: "a-2-10" },
  { source: "a-2-10", target: "a-2-1" },
  { source: "a-3-1", target: "a-3-2" },
  { source: "a-3-2", target: "a-3-3" },
  { source: "a-3-3", target: "a-3-4" },
  { source: "a-3-4", target: "a-3-5" },
  { source: "a-3-5", target: "a-3-1" },
  { source: "a-2-1", target: "a-1-2" },
  { source: "a-2-3", target: "a-1-8" },
  { source: "a-2-5", target: "a-1-7" },
  { source: "a-3-1", target: "a-2-8" },
  { source: "a-3-3", target: "a-2-9" },
  { source: "a-3-3", target: "a-3-3" },
  { source: "b-1-1", target: "b-1-2" },
];
