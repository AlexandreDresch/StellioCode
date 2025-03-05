import { FeaturedProject } from "@/types";
import api from "./api";

export async function getAllFeaturedProjects() {
  const response = await api.get<FeaturedProject[]>(
    `/api/public/featured-projects`,
  );

  return response.data;
}

export async function addFeaturedProject({
  token,
  data,
}: {
  token: string;
  data: { title: string; description: string; image: File };
}) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("image", data.image);

  const response = await api.post<FeaturedProject>(
    "/api/admin/dashboard/featured-projects",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function editFeaturedProject({
  token,
  featuredProjectId,
  data,
}: {
  token: string;
  featuredProjectId: string;
  data: { title: string; description: string; image?: File };
}) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.put<FeaturedProject>(
    `/api/admin/dashboard/featured-projects/${featuredProjectId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteFeaturedProject({
  token,
  featuredProjectId,
}: {
  token: string;
  featuredProjectId: string;
}) {
  const response = await api.delete(
    `/api/admin/dashboard/featured-projects/${featuredProjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
