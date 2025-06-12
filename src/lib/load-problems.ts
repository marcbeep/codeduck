import type { LeetCodeProblem } from "@/lib/types";
import fs from "fs";
import path from "path";

// Get the absolute path to the problems directory
const problemsDir = path.join(process.cwd(), "src/problems/json");

// Read all JSON files in the directory
const problemFiles = fs
  .readdirSync(problemsDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => {
    const filePath = path.join(problemsDir, file);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as LeetCodeProblem;
  });

// Sort problems by ID
export const problems: LeetCodeProblem[] = problemFiles.sort(
  (a, b) => a.id - b.id
);

// Helper function to get a problem by ID
export const getProblemById = (id: number): LeetCodeProblem | undefined => {
  return problems.find((problem) => problem.id === id);
};

// Helper function to get problems by category
export const getProblemsByCategory = (category: string): LeetCodeProblem[] => {
  return problems.filter((problem) => problem.category === category);
};

// Helper function to get problems by difficulty
export const getProblemsByDifficulty = (
  difficulty: LeetCodeProblem["difficulty"]
): LeetCodeProblem[] => {
  return problems.filter((problem) => problem.difficulty === difficulty);
};
