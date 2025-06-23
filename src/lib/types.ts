export type Solution = {
  code: string;
  explanation: string;
};

export type TestCase = {
  input: Record<string, unknown>;
  output: unknown;
  explanation: string;
};

export type LeetCodeProblem = {
  id: number;
  title: string;
  description: string;
  solution: Solution;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  testCases: TestCase[];
  constraints: string[];
  list: string[];
};
