import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { codeToHtml } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Highlight Python code to HTML using Shiki's codeToHtml
export async function highlightPythonCodeToHtml(code: string): Promise<string> {
  return await codeToHtml(code, { lang: "python", theme: "light-plus" });
}
