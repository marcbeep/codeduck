"use server";

import type { LeetCodeProblem } from "@/lib/types";
import fs from "fs";
import path from "path";

export async function getProblems(): Promise<LeetCodeProblem[]> {
  const problemsDir = path.join(process.cwd(), "src/problems/json");
  const problemFiles = fs
    .readdirSync(problemsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(problemsDir, file);
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as LeetCodeProblem;
    });
  return problemFiles.sort((a, b) => a.id - b.id);
}
