import api from "./api";

export async function getDevelopersByProjectId({
  postId,
  token,
}: {
  postId: number;
  token: string;
}) {
  const response = await api.get(`/api/admin/developers/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
