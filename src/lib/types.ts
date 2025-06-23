export type Solution = {
  code: string;
  explanation: string;
};

export type TestCase = {
  input: Record<string, unknown>;
  output: unknown;
  explanation: string;
};

// Definitive list of categories from template.md
export type Category =
  | "Arrays & Hashing"
  | "Two Pointers"
  | "Stack"
  | "Binary Search"
  | "Sliding Window"
  | "Linked List"
  | "Trees"
  | "Tries"
  | "Heap / Priority Queue"
  | "Backtracking"
  | "Intervals"
  | "Greedy"
  | "Advanced Graphs"
  | "Graphs"
  | "1-D DP"
  | "2-D DP"
  | "Bit Manipulation"
  | "Math & Geometry";

// Array of all valid categories for runtime validation (in predefined order)
export const VALID_CATEGORIES: Category[] = [
  "Arrays & Hashing",
  "Two Pointers",
  "Stack",
  "Binary Search",
  "Sliding Window",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Intervals",
  "Greedy",
  "Advanced Graphs",
  "Graphs",
  "1-D DP",
  "2-D DP",
  "Bit Manipulation",
  "Math & Geometry",
];

// Utility function to validate if a string is a valid category
export function isValidCategory(category: string): category is Category {
  return VALID_CATEGORIES.includes(category as Category);
}

export type LeetCodeProblem = {
  id: number;
  title: string;
  description: string;
  solution: Solution;
  category: Category;
  difficulty: "Easy" | "Medium" | "Hard";
  testCases: TestCase[];
  constraints: string[];
  list: string[];
};
