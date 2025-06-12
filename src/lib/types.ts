export type Solution = {
  code: string;
  explanation: string;
};

export type TestCase = {
  input: Record<string, any>;
  output: any;
  explanation: string;
};

export type LeetCodeProblem = {
  id: number;
  title: string;
  description: string;
  solutions: {
    typescript: Solution;
    python: Solution;
  };
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  testCases: TestCase[];
  constraints: string[];
  topics: string[];
};
