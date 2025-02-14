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

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  price: number;
  planName: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientProfilePicture: string;
  developers: DeveloperProject[];
}

export interface DeveloperProject {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type Developer = {
  id: string;
  fullName: string;
  activeProjects: number;
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

interface ProjectsApiResponse {
  _embedded: {
    internalProjectDetailsResponseDTOList: Project[];
  };
  _links: {
    self: {
      href: string;
    };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface DevelopersApiResponse {
  _embedded: {
    developerResponseDTOList: Developer[];
  };
  _links: {
    self: {
      href: string;
    };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface ProjectStats {
  month: string
  inProgress: number
  completed: number
}