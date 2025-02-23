import { PricingPlan } from "@/types";
import api from "./api";

export async function getAllPlans() {
  const response = await api.get<PricingPlan[]>(`/api/public/plans`);

  return response.data;
}
