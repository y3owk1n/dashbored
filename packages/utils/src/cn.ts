import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Function to merge Tailwind classes
 * @param {ClassValue[]} inputs - Array of Tailwind classes
 * @returns {string} - Merged Tailwind classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
