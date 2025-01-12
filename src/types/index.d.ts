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
