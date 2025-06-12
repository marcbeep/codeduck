"use server";

import type { LeetCodeProblem } from "@/lib/types";
import { allProblems } from "./generated-problem-imports";

export async function getProblems(): Promise<LeetCodeProblem[]> {
  return allProblems;
}
