"use client";

import Flashcard from "@/components/Flashcard";
import { Sidebar } from "@/components/Sidebar";
import { problems } from "@/lib/load-problems";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import type { LeetCodeProblem } from "@/lib/types";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";
type Topic = string;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [shuffledProblems, setShuffledProblems] = useState<LeetCodeProblem[]>(
    []
  );

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

  // Initialize and update shuffled problems when filters change
  useEffect(() => {
    if (filteredProblems.length > 0) {
      setShuffledProblems(filteredProblems);
    }
  }, [filteredProblems]);

  const next = () => {
    if (shuffledProblems.length === 0) return;
    setIndex((i) => (i + 1) % shuffledProblems.length);
  };

  const prev = () => {
    if (shuffledProblems.length === 0) return;
    setIndex(
      (i) => (i - 1 + shuffledProblems.length) % shuffledProblems.length
    );
  };

  const handleShuffle = () => {
    if (filteredProblems.length === 0) return;
    const shuffled = [...filteredProblems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledProblems(shuffled);
    setIndex(0);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Mobile/Tablet: Sheet for Sidebar */}
        <div className="block lg:hidden w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="m-4">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 max-w-xs">
              <Sidebar
                difficulties={difficulties}
                topics={topics}
                availableTopics={availableTopics}
                onDifficultyChange={setDifficulties}
                onTopicChange={setTopics}
                onShuffle={handleShuffle}
                noCard
              />
            </SheetContent>
          </Sheet>
        </div>
        {/* Desktop: persistent Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Sidebar
            difficulties={difficulties}
            topics={topics}
            availableTopics={availableTopics}
            onDifficultyChange={setDifficulties}
            onTopicChange={setTopics}
            onShuffle={handleShuffle}
          />
        </div>
        {/* Flashcard area: centered, responsive */}
        <div className="flex-1 flex flex-col items-center justify-start gap-8 p-4">
          {filteredProblems.length > 0 && shuffledProblems.length > 0 ? (
            <div className="w-full flex flex-col items-stretch p-4 sm:p-6">
              <div className="flex w-full justify-end items-center mb-4 gap-4">
                <div className="text-sm text-muted-foreground">
                  Card {index + 1} of {shuffledProblems.length}
                </div>
                <Button
                  variant="secondary"
                  onClick={prev}
                  className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  disabled={shuffledProblems.length === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={next}
                  className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  disabled={shuffledProblems.length === 0}
                >
                  Next
                </Button>
              </div>
              <Flashcard problem={shuffledProblems[index]} />
            </div>
          ) : (
            <div className="text-muted-foreground">
              No problems match the current filters
            </div>
          )}
        </div>
      </div>
      <footer className="w-full flex justify-center items-center py-6 text-muted-foreground text-sm bg-white border-t">
        Code for the solutions were contributed by Marc Beepath, Daniel Diaz and
        Alex Rong
      </footer>
    </>
  );
}
