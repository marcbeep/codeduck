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
import { Code2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Flashcard({ problem }: { problem: LeetCodeProblem }) {
  const [showSolution, setShowSolution] = useState(false);
  const [language, setLanguage] = useState<"typescript" | "python">(
    "typescript"
  );

  const code = problem.solutions[language]?.code || "";
  const explanation = problem.solutions[language]?.explanation || "";

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{problem.title}</CardTitle>
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
                  className="hover:bg-accent/50 transition-colors cursor-pointer"
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
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4 whitespace-pre-line text-sm text-muted-foreground">
          {problem.description}
        </div>

        {/* Language Selector */}
        <div className="flex gap-2 justify-end">
          <Button
            variant={language === "typescript" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage("typescript")}
            className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            TypeScript
          </Button>
          <Button
            variant={language === "python" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage("python")}
            className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            Python
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSolution((s) => !s)}
            className="w-full hover:bg-accent hover:text-accent-foreground transition-colors group cursor-pointer"
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
        </div>

        {showSolution && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4" />
              <span>
                Solution ({language.charAt(0).toUpperCase() + language.slice(1)}
                )
              </span>
            </div>
            <SyntaxHighlighter
              language={language}
              style={oneLight}
              customStyle={{
                borderRadius: "0.5rem",
                fontSize: "0.95em",
                padding: "1em",
              }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
            {explanation && (
              <div className="text-xs text-muted-foreground mt-2">
                <b>Explanation:</b> {explanation}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
