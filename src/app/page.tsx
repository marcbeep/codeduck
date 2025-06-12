"use client";

import Flashcard from "@/components/Flashcard";
import { Sidebar } from "@/components/Sidebar";
import { problems } from "@/lib/load-problems";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { LeetCodeProblem } from "@/lib/types";

type Difficulty = "Easy" | "Medium" | "Hard";
type Topic = string;

export default function Home() {
  const [index, setIndex] = useState(0);

  // Move filter state to parent
  const [difficulties, setDifficulties] = useState<Record<Difficulty, boolean>>(
    {
      Easy: true,
      Medium: true,
      Hard: true,
    }
  );

  // Get available topics
  const availableTopics = useMemo(() => {
    const uniqueTopics = new Set<Topic>();
    problems.forEach((problem) => {
      problem.topics.forEach((topic) => uniqueTopics.add(topic));
    });
    return Array.from(uniqueTopics).sort();
  }, []);

  // Initialize topics state
  const [topics, setTopics] = useState<Record<Topic, boolean>>(() => {
    const initialTopics = Object.fromEntries(
      availableTopics.map((topic) => [topic, true])
    );
    return initialTopics;
  });

  // Filter problems based on current filters
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty = difficulties[problem.difficulty];
      const matchesTopics = problem.topics.some((topic) => topics[topic]);
      return matchesDifficulty && matchesTopics;
    });
  }, [difficulties, topics]);

  const next = () => setIndex((i) => (i + 1) % filteredProblems.length);
  const prev = () =>
    setIndex(
      (i) => (i - 1 + filteredProblems.length) % filteredProblems.length
    );

  const handleShuffle = () => {
    const shuffled = [...filteredProblems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setIndex(0);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        difficulties={difficulties}
        topics={topics}
        availableTopics={availableTopics}
        onDifficultyChange={setDifficulties}
        onTopicChange={setTopics}
        onShuffle={handleShuffle}
      />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <h1 className="text-3xl font-bold mb-4">LeetCode Flashcards</h1>
        {filteredProblems.length > 0 ? (
          <>
            <Flashcard problem={filteredProblems[index]} />
            <div className="flex gap-4 mt-4">
              <Button
                variant="secondary"
                onClick={prev}
                className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={next}
                className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                Next
              </Button>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Card {index + 1} of {filteredProblems.length}
            </div>
          </>
        ) : (
          <div className="text-muted-foreground">
            No problems match the current filters
          </div>
        )}
      </div>
    </div>
  );
}
