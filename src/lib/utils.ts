import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseRules(input: string): string[] {
  if (!input) return [];

  const cleaned = JSON.parse(input).replace(/[{}]/g, "").trim();

  if (!cleaned) return [];

  return cleaned.split(",").map((item: string) => item.trim());
}
