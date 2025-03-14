import { Developer, Meeting, Project } from "@/types";
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
    in_progress: "bg-cyan-400",
    pending: "bg-yellow-400",
    completed: "bg-green-400",
    cancelled: "bg-red-400",
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

export const translateEventStatus = (status: Meeting["status"]) =>
  translateStatus(status, {
    pending: "Pendente",
    accepted: "Aprovada",
    rejected: "Cancelada",
  });

export const getDeveloperStatusColor = (status: Developer["status"]) =>
  getStatusColor(status, {
    pending: "bg-yellow-400",
    approved: "bg-green-400",
    rejected: "bg-red-400",
  });

export const getEventStatusColor = (status: Meeting["status"]) =>
  getStatusColor(status, {
    pending: "bg-yellow-400",
    accepted: "bg-green-400",
    rejected: "bg-red-400",
  });

/**
 * Format a date to the custom "YYYY-MM-DD HH:mm" format.
 * @param date - The date to format.
 */
export function formatDateToCustomString(date: Date): string {
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function getCurrentMonthYear() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return `${month} ${year}`;
}

export function getTimeFromDate(dateTimeString: string) {
  return dateTimeString.split("T")[1];
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function setTimeInISODate(isoDate: string, newTime: string): string {
  const [hours, minutes] = newTime.split(":").map(Number);
  const [year, month, day] = isoDate.split("T")[0].split("-").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  return formatDateToISO(date);
}

export function formatDate(dateString: string) {
  const data = new Date(dateString);

  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
}
