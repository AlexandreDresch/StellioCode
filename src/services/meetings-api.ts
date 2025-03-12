import { MeetingsApiResponse } from "@/types";

import api from "./api";

export async function getAllMeetings({
  token,
  page = 0,
  size = 10,
}: {
  token: string;
  page?: number;
  size?: number;
}) {
  const response = await api.get<MeetingsApiResponse>(
    `/api/admin/dashboard/meetings?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getAllDeveloperMeetings({
  token,
  developerId,
  page = 0,
  size = 10,
}: {
  token: string;
  developerId: string;
  page?: number;
  size?: number;
}) {
  const response = await api.get<MeetingsApiResponse>(
    `/api/developer/dashboard/meetings?developerId=${developerId}&page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function updateMeetingStatus({
  meetingId,
  status,
  token,
}: {
  meetingId: string;
  status: string;
  token: string;
}) {
  const data = {
    status,
  };

  const response = await api.put(
    `/api/admin/dashboard/meetings/${meetingId}/status`,
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

export async function updateMeetingDate({
  meetingId,
  date,
  token,
}: {
  meetingId: string;
  date: string;
  token: string;
}) {
  const data = {
    date,
  };

  const response = await api.put(
    `/api/admin/dashboard/meetings/${meetingId}/date`,
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
