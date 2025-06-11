import type { LeetCodeProblem } from "@/lib/types";

// Manually import all problems for now. In the future, this can be automated.
import problem1 from "@/problems/001-two-sum";
import problem2 from "@/problems/002-reverse-linked-list";

export const problems: LeetCodeProblem[] = [problem1, problem2].sort(
  (a, b) => a.id - b.id
);
