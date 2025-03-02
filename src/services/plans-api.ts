import { PricingPlan } from "@/types";
import api from "./api";

export async function getAllPlans() {
  const response = await api.get<PricingPlan[]>(`/api/public/plans`);

  return response.data;
}

export async function getPlansStats({ token }: { token: string }) {
  const response = await api.get(`/api/admin/dashboard/plans/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function addPlan({
  token,
  data,
}: {
  token: string;
  data: PricingPlan;
}) {
  const response = await api.post<PricingPlan>(
    `/api/admin/dashboard/plans`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function editPlan({
  token,
  planId,
  data,
}: {
  token: string;
  planId: string;
  data: PricingPlan;
}) {
  const response = await api.put<PricingPlan>(
    `/api/admin/dashboard/plans/${planId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function deletePlan({
  token,
  planId,
}: {
  token: string;
  planId: string;
}) {
  const response = await api.delete(`/api/admin/dashboard/plans/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
