import { DevelopersApiResponse } from "@/types";
import api from "./api";

export async function getDevelopersByProjectId({
  projectId,
  token,
}: {
  projectId: string;
  token: string;
}) {
  const response = await api.get(`/api/admin/developers/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDeveloperById({ developerId, token }: { developerId: string, token: string }) {
  const response = await api.get(`/api/admin/developers/${developerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});

  return response.data;
}

export async function getAllDevelopers({
  token,
  page = 0,
  size = 10,
}: {
  token: string;
  page?: number;
  size?: number;
}) {
  const response = await api.get<DevelopersApiResponse>(
    `/api/admin/dashboard/developers?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}