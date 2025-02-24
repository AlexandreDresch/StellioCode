import { Service } from "@/types";
import api from "./api";

export async function getAllServices() {
  const response = await api.get<Service[]>(`/api/public/services`);

  return response.data;
}
