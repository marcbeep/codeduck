"use server";

import type { LeetCodeProblem } from "@/lib/types";
import { VALID_CATEGORIES } from "@/lib/types";
import { allProblems } from "./generated-problem-imports";

export async function getProblems(): Promise<LeetCodeProblem[]> {
  // Sort problems by category (in VALID_CATEGORIES order) and then by difficulty
  const sortedProblems = [...allProblems].sort((a, b) => {
    // First, sort by category index in VALID_CATEGORIES
    const categoryA = VALID_CATEGORIES.indexOf(a.category);
    const categoryB = VALID_CATEGORIES.indexOf(b.category);

    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    // If categories are the same, sort by difficulty
    const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });

  return sortedProblems;
}
