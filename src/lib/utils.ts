import { Developer, Event, Project } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generic function to translate statuses based on a mapping.
 * @param status - The current status to translate.
 * @param translations - A mapping of statuses to their translations.
 */
function translateStatus<T extends string>(
  status: T,
  translations: Record<T, string>,
): string {
  return translations[status];
}

/**
 * Generic function to get a color class based on a status.
 * @param status - The current status to determine the color for.
 * @param colors - A mapping of statuses to their corresponding color classes.
 */
function getStatusColor<T extends string>(
  status: T,
  colors: Record<T, string>,
): string {
  return colors[status];
}

export const translateProjectStatus = (status: Project["status"]) =>
  translateStatus(status, {
    in_progress: "Em andamento",
    pending: "Pendente",
    completed: "Concluído",
    cancelled: "Cancelado",
  });

export const getProjectStatusColor = (status: Project["status"]) =>
  getStatusColor(status, {
    in_progress: "bg-cyan-500",
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  });

export const translateDeveloperStatus = (status: Developer["status"]) =>
  translateStatus(status, {
    pending: "Pendente",
    approved: "Aprovado",
    rejected: "Rejeitado",
  });

export const translateDeveloperLevel = (
  level: "junior" | "mid_level" | "senior",
) =>
  translateStatus(level, {
    junior: "Júnior",
    mid_level: "Pleno",
    senior: "Sênior",
  });

export const translateEventStatus = (status: Event["status"]) =>
  translateStatus(status, {
    pending: "Pendente",
    approved: "Aprovada",
    cancelled: "Cancelada",
  });

export const getDeveloperStatusColor = (status: Developer["status"]) =>
  getStatusColor(status, {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  });

export const getEventStatusColor = (status: Event["status"]) =>
  getStatusColor(status, {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    cancelled: "bg-red-500",
  });

/**
 * Format a date to the custom "YYYY-MM-DD HH:mm" format.
 * @param date - The date to format.
 */
export function formatDateToCustomString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function getCurrentMonthYear() {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return `${month} ${year}`;
}