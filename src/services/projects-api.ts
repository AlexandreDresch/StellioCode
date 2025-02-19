import { ProjectsApiResponse, ProjectStats } from "@/types";
import api from "./api";

export async function getAllProjectsAdmin({
  token,
  page = 0,
  size = 10,
}: {
  token: string;
  page?: number;
  size?: number;
}) {
  const response = await api.get<ProjectsApiResponse>(
    `/api/admin/dashboard/projects?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getLastSixMonthsStats({ token }: { token: string }) {
  const response = await api.get<ProjectStats[]>(
    `/api/admin/dashboard/projects/stats/last-6-months`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function assignDevelopersToProject({
  projectId,
  developerIds,
  token,
}: {
  projectId: string;
  developerIds: string[];
  token: string;
}) {
  const data = {
    developerIds,
  };

  const response = await api.post(
    `/api/admin/dashboard/projects/${projectId}/developers?roleInProject=FRONTEND`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}

export async function removeDeveloperFromProject({
  projectId,
  developerId,
  token,
}: {
  projectId: string;
  developerId: string;
  token: string;
}) {
  const response = await api.delete(
    `/api/admin/dashboard/projects/${projectId}/developers/${developerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}