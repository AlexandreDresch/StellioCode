import { AuthUser, LoginData } from "@/types/index.js";
import api from "./api.ts";

export async function login({ data }: { data: LoginData }) {
  const response = await api.post<AuthUser>(`/api/public/auth/login`, data);

  return response.data;
}
