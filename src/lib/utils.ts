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

/**
 * Retrieves the current month and year as a formatted string.
 *
 * @returns {string} A string representing the current month and year in the format "Month Year".
 *                   For example: "Janeiro 2023".
 */
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

/**
 * Extracts the time portion from an ISO 8601 date-time string.
 *
 * @param dateTimeString - The ISO 8601 date-time string to extract the time from.
 * @returns The time portion of the date-time string in the format "HH:mm:ss.sssZ".
 *
 * @example
 * ```typescript
 * const time = getTimeFromDate("2023-03-15T14:30:00Z");
 * console.log(time); // Output: "14:30:00Z"
 * ```
 */
export function getTimeFromDate(dateTimeString: string) {
  return dateTimeString.split("T")[1];
}

/**
 * Formats a given Date object into an ISO 8601 string representation
 * with the format `YYYY-MM-DDTHH:mm`.
 *
 * @param date - The Date object to format.
 * @returns A string representing the date in ISO 8601 format.
 */
export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Updates the time portion of an ISO 8601 date string with a new time.
 *
 * @param isoDate - The ISO 8601 date string to update (e.g., "2023-03-15T10:00:00Z").
 * @param newTime - The new time to set in "HH:mm" format (e.g., "14:30").
 * @returns A new ISO 8601 date string with the updated time.
 *
 * @throws Will throw an error if the input strings are not in the expected format.
 */
export function setTimeInISODate(isoDate: string, newTime: string): string {
  const [hours, minutes] = newTime.split(":").map(Number);
  const [year, month, day] = isoDate.split("T")[0].split("-").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  return formatDateToISO(date);
}

/**
 * Formats a given date string into the format "DD/MM/YYYY".
 *
 * @param dateString - The date string to be formatted. It should be in a format
 *                     that can be parsed by the JavaScript `Date` object.
 * @returns A string representing the formatted date in "DD/MM/YYYY" format.
 *
 * @example
 * ```typescript
 * const formattedDate = formatDate("2023-03-15");
 * console.log(formattedDate); // Output: "15/03/2023"
 * ```
 */
export function formatDate(dateString: string) {
  const data = new Date(dateString);

  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * A regular expression to validate GitHub profile URLs.
 *
 * This regex ensures that the URL:
 * - Starts with "https://github.com/"
 * - Contains a valid GitHub username, which:
 *   - Can include lowercase letters, digits, and hyphens.
 *   - Cannot start or end with a hyphen.
 *   - Must be between 1 and 39 characters long.
 *
 * The regex is case-insensitive.
 */
export const githubRegex =
  /^https:\/\/github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

/**
 * A regular expression to validate phone numbers.
 *
 * The pattern matches phone numbers with the following format:
 * - Optional parentheses around the area code (2 digits).
 * - An optional space after the area code.
 * - An optional single digit before the main number.
 * - A 4-digit main number followed by an optional hyphen or space.
 * - A 4-digit trailing number.
 *
 * Examples of valid formats:
 * - (12) 3456-7890
 * - 12 34567890
 * - 123456-7890
 * - 1234567890
 */
export const phoneRegex = /^\(?\d{2}\)?\s?\d{1}?\d{4}[-\s]?\d{4}$/;
