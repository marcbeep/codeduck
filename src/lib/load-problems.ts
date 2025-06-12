import type { LeetCodeProblem } from "@/lib/types";
import twoSum from "@/problems/json/001-two-sum.json";
import reverseLinkedList from "@/problems/json/002-reverse-linked-list.json";

// Type assertion to ensure JSON files match our LeetCodeProblem type
const problemFiles = [
  twoSum as LeetCodeProblem,
  reverseLinkedList as LeetCodeProblem,
];

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
