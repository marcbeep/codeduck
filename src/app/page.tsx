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
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-start gap-8 p-4 mt-4">
          <div className="flex w-full items-center mb-4 gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 max-w-xs transition-all duration-300 ease-in-out"
              >
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
          <AnimatePresence mode="wait">
            {filteredProblems.length > 0 && shuffledProblems.length > 0 ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full max-w-3xl mx-auto flex flex-col items-stretch"
              >
                {/* Nav row inside card area */}
                <div className="flex items-center justify-between w-full mb-2 px-2 mt-8">
                  <Button
                    variant="secondary"
                    onClick={prev}
                    className="hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    disabled={shuffledProblems.length === 0}
                  >
                    Previous
                  </Button>
                  <motion.div
                    key={`${index}-${shuffledProblems.length}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground text-center flex-1"
                  >
                    Card {index + 1} of {shuffledProblems.length}
                  </motion.div>
                  <Button
                    variant="secondary"
                    onClick={next}
                    className="hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    disabled={shuffledProblems.length === 0}
                  >
                    Next
                  </Button>
                </div>
                <Flashcard problem={shuffledProblems[index]} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground"
              >
                No problems match the current filters
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center py-6 px-4 text-muted-foreground text-sm bg-white border-t">
        Code for the solutions were contributed by Marc Beepath, Daniel Diaz and
        Alex Rong
      </footer>
    </>
  );
}
