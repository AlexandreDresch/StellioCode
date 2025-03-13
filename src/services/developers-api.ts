import {
  DevelopersApiResponse,
  DevelopersStats,
  IDeveloper,
  IDeveloperById,
} from "@/types";
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
    },
  );

  return response.data;
}

export async function getDevelopersStats({ token }: { token: string }) {
  const response = await api.get<DevelopersStats>(
    `/api/admin/dashboard/developers/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getApprovedDevelopers({ token }: { token: string }) {
  const response = await api.get<IDeveloper[]>(
    `/api/admin/dashboard/developers/approved`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getDeveloperById({
  token,
  developerId,
}: {
  token: string;
  developerId: string;
}) {
  const response = await api.get<IDeveloperById>(
    `/api/admin/dashboard/developers/${developerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getProfileData({
  token,
  developerId,
}: {
  token: string;
  developerId: string;
}) {
  const response = await api.get<IDeveloperById>(
    `/api/developer/dashboard/profile/${developerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function editProfile({
  token,
  developerId,
  data,
}: {
  token: string;
  developerId: string;
  data: IDeveloperById;
}) {
  const response = await api.patch<IDeveloper[]>(
    `/api/developer/dashboard/profile/${developerId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function editDeveloper({
  token,
  developerId,
  data,
}: {
  token: string;
  developerId: string;
  data: IDeveloperById;
}) {
  const response = await api.patch<IDeveloper[]>(
    `/api/admin/dashboard/developers/${developerId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteDeveloper({
  token,
  developerId,
}: {
  token: string;
  developerId: string;
}) {
  const response = await api.delete(
    `/api/admin/dashboard/developers/${developerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
