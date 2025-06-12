"use client";

import Flashcard from "@/components/Flashcard";
import { Sidebar } from "@/components/Sidebar";
import { problems } from "@/lib/load-problems";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import type { LeetCodeProblem } from "@/lib/types";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Filter,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

type Difficulty = "Easy" | "Medium" | "Hard";
type Topic = string;

export default function Home() {
  const [index, setIndex] = useState(0);
  const [shuffledProblems, setShuffledProblems] = useState<LeetCodeProblem[]>(
    []
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Move filter state to parent
  const [difficulties, setDifficulties] = useState<Record<Difficulty, boolean>>(
    {
      Easy: true,
      Medium: true,
      Hard: true,
    }
  );

  // Get available categories
  const availableCategories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    problems.forEach((problem) => {
      uniqueCategories.add(problem.category);
    });
    return Array.from(uniqueCategories).sort();
  }, []);

  // Initialize categories state
  const [categories, setCategories] = useState<Record<string, boolean>>(() => {
    const initialCategories = Object.fromEntries(
      availableCategories.map((category) => [category, true])
    );
    return initialCategories;
  });

  // Filter problems based on current filters
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty = difficulties[problem.difficulty];
      const matchesCategory = categories[problem.category];
      return matchesDifficulty && matchesCategory;
    });
  }, [difficulties, categories]);

  // Initialize and update shuffled problems when filters change
  useEffect(() => {
    if (filteredProblems.length > 0) {
      setShuffledProblems(filteredProblems);
    }
  }, [filteredProblems]);

  // Calculate progress percentage
  const progressValue =
    shuffledProblems.length > 0
      ? ((index + 1) / shuffledProblems.length) * 100
      : 0;

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

  const handleShuffle = async () => {
    if (filteredProblems.length === 0) return;

    setIsShuffling(true);

    // Brief delay to show animation
    await new Promise((resolve) => setTimeout(resolve, 400));

    const shuffled = [...filteredProblems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledProblems(shuffled);
    setIndex(0);
    setIsShuffling(false);
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-start gap-8 p-4 mt-4">
          {/* Navigation bar - always visible */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center justify-between w-full mb-4 px-2 mt-8">
              {/* Left side - Filter, Shuffle, and Search buttons */}
              <div className="flex gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
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
                      categories={categories}
                      availableCategories={availableCategories}
                      onDifficultyChange={setDifficulties}
                      onCategoryChange={setCategories}
                      onShuffle={handleShuffle}
                      noCard
                    />
                  </SheetContent>
                </Sheet>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={handleShuffle}
                        className="hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                        disabled={filteredProblems.length === 0 || isShuffling}
                      >
                        <motion.div
                          animate={
                            isShuffling ? { rotate: 360 } : { rotate: 0 }
                          }
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <Shuffle className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shuffle Deck</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSearchOpen(true)}
                        className="hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
                        disabled={shuffledProblems.length === 0}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search Problems</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Center - Card counter or status */}
              <motion.div
                key={`${index}-${shuffledProblems.length}-${isShuffling}-${filteredProblems.length}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="text-sm text-muted-foreground text-center font-medium"
              >
                {filteredProblems.length > 0 && shuffledProblems.length > 0
                  ? `Card ${index + 1} of ${shuffledProblems.length}`
                  : `${problems.length} problems available`}
              </motion.div>

              {/* Right side - Navigation buttons */}
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={prev}
                        className="hover:bg-accent hover:text-accent-foreground hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer"
                        disabled={shuffledProblems.length === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Previous</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={next}
                        className="hover:bg-accent hover:text-accent-foreground hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer"
                        disabled={shuffledProblems.length === 0}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Next</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Progress bar - only show when there are problems */}
            {filteredProblems.length > 0 && shuffledProblems.length > 0 && (
              <motion.div
                className="w-full mb-6 px-2"
                key={`progress-${index}-${shuffledProblems.length}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Progress value={progressValue} className="h-1.5" />
              </motion.div>
            )}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            {filteredProblems.length > 0 && shuffledProblems.length > 0 ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-3xl mx-auto"
              >
                <Flashcard problem={shuffledProblems[index]} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl mx-auto"
              >
                <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-8 text-center">
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">No Problems Found</div>
                    <div className="text-muted-foreground">
                      No problems match your current filter settings.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Try adjusting your difficulty filter to see more problems.
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="mt-4">
                          <Filter className="mr-2 h-4 w-4" />
                          Open Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="p-0 max-w-xs transition-all duration-300 ease-in-out"
                      >
                        <Sidebar
                          difficulties={difficulties}
                          categories={categories}
                          availableCategories={availableCategories}
                          onDifficultyChange={setDifficulties}
                          onCategoryChange={setCategories}
                          onShuffle={handleShuffle}
                          noCard
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Command Dialog */}
          <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
            <CommandInput placeholder="Search problems by title, category, topic, or difficulty..." />
            <CommandList>
              <CommandEmpty>No problems found.</CommandEmpty>
              <CommandGroup heading="Problems">
                {shuffledProblems.map((problem) => (
                  <CommandItem
                    key={problem.id}
                    value={problem.title}
                    onSelect={() => {
                      const problemIndex = shuffledProblems.findIndex(
                        (p) => p.title === problem.title
                      );
                      if (problemIndex !== -1) {
                        setIndex(problemIndex);
                        setSearchOpen(false);
                      }
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{problem.title}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                        <span>•</span>
                        <span>{problem.category}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center py-6 px-4 text-muted-foreground text-sm bg-white border-t">
        Code for the solutions were contributed by Marc Beepath, Daniel Diaz and
        Alex Rong
      </footer>
    </>
  );
}
