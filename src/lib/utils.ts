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
    in_progress: "bg-cyan-500",
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return colors[status];
}

export function translateDeveloperStatus(
  status: "pending" | "approved" | "rejected",
): string {
  const translations: Record<typeof status, string> = {
    pending: "Pendente",
    approved: "Aprovado",
    rejected: "Rejeitado",
  };

  return translations[status];
}

export function translateDeveloperLevel(
  status: "junior" | "mid_level" | "senior",
): string {
  const translations: Record<typeof status, string> = {
    junior: "Júnior",
    mid_level: "Pleno",
    senior: "Sênior",
  };

  return translations[status];
}

export function getDeveloperStatusColor(
  status: "pending" | "approved" | "rejected",
): string {
  const colors: Record<typeof status, string> = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };

  return colors[status];
}
