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
    }
  );

  return response.data;
}

export async function getLastSixMonthsStats({
  token,
}: {
  token: string;
}) {
  const response = await api.get<ProjectStats[]>(
    `/api/admin/dashboard/projects/stats/last-6-months`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}