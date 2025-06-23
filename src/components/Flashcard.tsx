"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import type { LeetCodeProblem } from "@/lib/types";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import {
  Code2,
  Eye,
  EyeOff,
  ExternalLink,
  TestTube2,
  Tag,
  Link,
  Check,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { generateShareUrl, copyToClipboard } from "@/lib/sharing";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/50";
    case "Medium":
      return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-950/50";
    case "Hard":
      return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950/50";
    default:
      return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-950/50";
  }
};

export default function Flashcard({ problem }: { problem: LeetCodeProblem }) {
  const [showSolution, setShowSolution] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [copied, setCopied] = useState(false);

  const code = problem.solution?.code || "";
  const explanation = problem.solution?.explanation || "";

  const handleShare = async () => {
    const shareUrl = generateShareUrl(problem);
    const success = await copyToClipboard(shareUrl);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold">
                {problem.title}
              </CardTitle>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare();
                      }}
                      className="hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Link className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy Problem Link"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://leetcode.com/problems/${problem.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`,
                          "_blank"
                        );
                      }}
                      className="hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open on LeetCode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              <span>{problem.category}</span>
            </div>
            {problem.list && problem.list.length > 0 && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {problem.list.map((list) => (
                    <span
                      key={list}
                      className="px-2 py-0.5 rounded-full text-xs border border-border text-muted-foreground font-medium"
                    >
                      {list === "blind75"
                        ? "Blind 75"
                        : list === "grind75"
                        ? "Grind 75"
                        : list === "neetcode150"
                        ? "NeetCode 150"
                        : list === "leetcode150"
                        ? "LeetCode 150"
                        : list}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 whitespace-pre-line text-sm text-muted-foreground leading-relaxed"
        >
          {problem.description}
        </motion.div>

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold text-sm">Constraints:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="list-disc">
                  <code className="text-xs bg-accent/50 px-1 py-0.5 rounded">
                    {constraint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTestCases((s) => !s)}
            className="w-full hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-98 transition-all duration-200 group cursor-pointer"
          >
            {showTestCases ? (
              <>
                <EyeOff className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Hide Test Cases
              </>
            ) : (
              <>
                <TestTube2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Show Test Cases
              </>
            )}
          </Button>
          <AnimatePresence mode="wait">
            {showTestCases && (
              <div key="test-cases">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TestTube2 className="h-4 w-4" />
                    <span>Test Cases</span>
                  </div>
                  <div className="space-y-4">
                    {problem.testCases.map((testCase, index) => {
                      const inputStr = Object.entries(testCase.input)
                        .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                        .join(", ");
                      const outputStr =
                        Array.isArray(testCase.output) ||
                        typeof testCase.output === "object"
                          ? JSON.stringify(testCase.output)
                          : String(testCase.output);
                      return (
                        <motion.div
                          key={
                            index +
                            "-" +
                            JSON.stringify(testCase.input) +
                            "-" +
                            JSON.stringify(testCase.output)
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="bg-accent/30 p-3 rounded-lg text-sm space-y-2"
                        >
                          <div className="font-medium">
                            Test Case {index + 1}:
                          </div>
                          <div>
                            <span className="font-medium">Input:</span>{" "}
                            <code className="bg-background px-1 py-0.5 rounded text-xs">
                              {inputStr}
                            </code>
                          </div>
                          <div>
                            <span className="font-medium">Output:</span>{" "}
                            <code className="bg-background px-1 py-0.5 rounded text-xs">
                              {outputStr}
                            </code>
                          </div>
                          {testCase.explanation && (
                            <div className="text-muted-foreground">
                              <span className="font-medium">Explanation:</span>{" "}
                              {testCase.explanation}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSolution((s) => !s)}
            className="w-full hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-98 transition-all duration-200 group cursor-pointer"
          >
            {showSolution ? (
              <>
                <EyeOff className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Hide Solution
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Show Solution
              </>
            )}
          </Button>
          <AnimatePresence mode="wait">
            {showSolution && (
              <div key="solution">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Code2 className="h-4 w-4" />
                    <span>Solution</span>
                  </div>

                  {code && (
                    <div className="rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={oneLight}
                        customStyle={{
                          margin: 0,
                          fontSize: "14px",
                          lineHeight: "1.4",
                        }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  )}

                  {explanation && (
                    <div className="bg-accent/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-sm">Explanation:</h4>
                      <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                        {explanation}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
