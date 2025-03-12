import { Summary } from "@/types";
import api from "./api";

export async function getSummary({ token }: { token: string }): Promise<Summary> {
    const response = await api.get<Summary>("/api/admin/dashboard/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
