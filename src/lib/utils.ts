import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translateProjectStatus(
  status: "in_progress" | "pending" | "completed" | "cancelled",
): string {
  const translations: Record<typeof status, string> = {
    in_progress: "Em andamento",
    pending: "Pendente",
    completed: "Concluído",
    cancelled: "Cancelado",
  };

  return translations[status];
}

export function getProjectStatusColor(
  status: "in_progress" | "pending" | "completed" | "cancelled",
): string {
  const colors: Record<typeof status, string> = {
    in_progress: "border-orange-500",
    pending: "border-yellow-500",
    completed: "border-green-500",
    cancelled: "border-red-500",
  };

  return colors[status];
}
