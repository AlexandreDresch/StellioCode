import { Service } from "@/types";
import api from "./api";

export async function getAllServices() {
  const response = await api.get<Service[]>(`/api/public/services`);

  return response.data;
}

export async function getServicesStats({ token }: { token: string }) {
  const response = await api.get(`/api/admin/dashboard/services/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function addService({
  token,
  data,
}: {
  token: string;
  data: Service;
}) {
  const response = await api.post<Service>(
    `/api/admin/dashboard/services`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function editService({
  token,
  serviceId,
  data,
}: {
  token: string;
  serviceId: string;
  data: Service;
}) {
  const response = await api.put<Service>(
    `/api/admin/dashboard/services/${serviceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deleteService({
  token,
  serviceId,
}: {
  token: string;
  serviceId: string;
}) {
  const response = await api.delete(
    `/api/admin/dashboard/services/${serviceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
