export interface IDeveloper {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  level: string;
  currentProjectIds: string[] | null;
  projectsCount: number;
  githubUrl: string;
  techStack: string[];
}

export interface IDeveloperById {
  id: string;
  name: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  level: "junior" | "mid_level" | "senior";
  technologies: string[];
}

export interface IDeveloperCardProps extends IDeveloper {
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
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

export type Meeting = {
  id: string;
  status: "pending" | "accepted" | "rejected";
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  projectDescription: string;
  scheduledAt: Date;
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

interface MeetingsApiResponse {
  _embedded: {
    meetingResponseDTOList: Meeting[];
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
  month: string;
  inProgress: number;
  completed: number;
}

export interface DevelopersStats {
  totalDevelopers: number;
  developersByStatus: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  popular: boolean;
}

export interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  view: "dashboard" | "client";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface IProjectUpdateData {
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  price: number;
  planId: string;
  serviceId: string;
}

export interface IPlanStatsData {
  planName: string;
  monthlyRevenue: number;
  totalContracts: number;
}

export interface FeaturedProject {
  projectId: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
