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
    }
  );

  return response.data;
}