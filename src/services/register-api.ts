import api from "./api.ts";
import { RegisterData, AuthUser } from "@/types/index.js";

export async function register({ data }: { data: RegisterData }) {
  const response = await api.post<AuthUser>(`/api/public/auth/register`, data);

  return response.data;
}
