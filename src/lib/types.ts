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
  | "Array / String"
  | "Two Pointers"
  | "Sliding Window"
  | "Matrix"
  | "Hashmap"
  | "Intervals"
  | "Stack"
  | "Linked List"
  | "Binary Tree General"
  | "Binary Tree BFS"
  | "Binary Search Tree"
  | "Graph General"
  | "Graph BFS"
  | "Trie"
  | "Backtracking"
  | "Divide & Conquer"
  | "Kadane Algorithm"
  | "Binary Search"
  | "Heap"
  | "Bit Manipulation"
  | "Math"
  | "1D DP"
  | "Multidimensional DP";

// Array of all valid categories for runtime validation
export const VALID_CATEGORIES: Category[] = [
  "Array / String",
  "Two Pointers",
  "Sliding Window",
  "Matrix",
  "Hashmap",
  "Intervals",
  "Stack",
  "Linked List",
  "Binary Tree General",
  "Binary Tree BFS",
  "Binary Search Tree",
  "Graph General",
  "Graph BFS",
  "Trie",
  "Backtracking",
  "Divide & Conquer",
  "Kadane Algorithm",
  "Binary Search",
  "Heap",
  "Bit Manipulation",
  "Math",
  "1D DP",
  "Multidimensional DP",
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
