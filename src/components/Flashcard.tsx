"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import type { LeetCodeProblem } from "@/lib/leetcode-data";

export default function Flashcard({ problem }: { problem: LeetCodeProblem }) {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <Card
      className="w-full max-w-xl cursor-pointer select-none"
      onClick={() => setShowSolution((s) => !s)}
    >
      <CardHeader>
        <CardTitle>{problem.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 whitespace-pre-line">{problem.description}</div>
        {showSolution ? (
          <pre className="bg-muted p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
            {problem.solution}
          </pre>
        ) : (
          <div className="text-muted-foreground italic">
            Click to show solution
          </div>
        )}
      </CardContent>
    </Card>
  );
}
