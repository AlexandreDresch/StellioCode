export interface IDeveloper {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  currentProjectId: string | null;
  projectsCount: number;
  githubUrl: string;
  techStack: string[];
}

export interface IDeveloperCardProps extends IDeveloper {
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export type Project = {
  id: string;
  title: string;
  client: string;
  price: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
};

export type Developer = {
  id: string;
  name: string;
  activeProjectsCount: number;
  status: "pending" | "approved" | "rejected";
  level: "junior" | "mid_level" | "senior";
};

export type Event = {
  id: string;
  project: string;
  client: string;
  status: "pending" | "approved" | "cancelled";
  date: Date;
};

export type SummaryMetric = {
  change: number;
  current: number;
  previous: number;
};

export type Summary = {
  totalRevenue: SummaryMetric;
  completedProjects: SummaryMetric;
  newProjects: SummaryMetric;
  newClients: SummaryMetric;
};