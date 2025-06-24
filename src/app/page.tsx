"use client";

import Flashcard from "@/components/Flashcard";
import { Sidebar } from "@/components/Sidebar";
import { Brand } from "@/components/Brand";
import { getProblems } from "@/lib/actions";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import type { LeetCodeProblem, Category } from "@/lib/types";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Filter,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
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
import { isValidCategory } from "@/lib/types";

type Difficulty = "Easy" | "Medium" | "Hard";

export default function Home() {
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      try {
        const loadedProblems = await getProblems();
        setProblems(loadedProblems);
      } catch (error) {
        console.error("Failed to load problems:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProblems();
  }, []);

  const [index, setIndex] = useState(0);
  const [shuffledProblems, setShuffledProblems] = useState<LeetCodeProblem[]>(
    []
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isDailyMode, setIsDailyMode] = useState(false);
  const [dailyProblems, setDailyProblems] = useState<LeetCodeProblem[]>([]);

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
    const uniqueCategories = new Set<Category>();
    problems.forEach((problem) => {
      if (isValidCategory(problem.category)) {
        uniqueCategories.add(problem.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [problems]);

  // Initialize categories state with useEffect to ensure it's set after availableCategories is populated
  const [categories, setCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (availableCategories.length > 0) {
      setCategories(
        Object.fromEntries(
          availableCategories.map((category) => [category, true])
        )
      );
    }
  }, [availableCategories]);

  // Get available lists - now works with arrays
  const availableLists = useMemo(() => {
    const uniqueLists = new Set<string>();
    problems.forEach((problem) => {
      if (problem.list && Array.isArray(problem.list)) {
        problem.list.forEach((list) => {
          uniqueLists.add(list);
        });
      }
    });
    return Array.from(uniqueLists).sort();
  }, [problems]);

  // Initialize lists state with useEffect to ensure it's set after availableLists is populated
  const [lists, setLists] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (availableLists.length > 0) {
      setLists(Object.fromEntries(availableLists.map((list) => [list, true])));
    }
  }, [availableLists]);

  // Add background color state
  const [backgroundClass, setBackgroundClass] = useState("");

  // Add max cards state
  const [maxCards, setMaxCards] = useState(50);

  // The definitive list of problems to be displayed, based on shuffle state and filters.
  const displayedProblems = useMemo(() => {
    let sourceProblems: LeetCodeProblem[];

    if (isDailyMode) {
      sourceProblems = dailyProblems;
    } else if (isShuffled) {
      sourceProblems = shuffledProblems;
    } else {
      sourceProblems = problems;
    }

    // In daily mode, don't apply filters since problems are already curated
    if (isDailyMode) {
      return sourceProblems;
    }

    const filtered = sourceProblems.filter((problem) => {
      const matchesDifficulty = difficulties[problem.difficulty];
      const matchesCategory = categories[problem.category];

      // Check if problem matches any selected list
      const matchesList =
        problem.list && Array.isArray(problem.list)
          ? problem.list.some((list) => lists[list])
          : false;

      return matchesDifficulty && matchesCategory && matchesList;
    });

    // Limit the number of problems based on maxCards setting
    return filtered.slice(0, maxCards);
  }, [
    difficulties,
    categories,
    lists,
    problems,
    maxCards,
    isShuffled,
    shuffledProblems,
    isDailyMode,
    dailyProblems,
  ]);

  // Get the total number of problems that match the filters (before limiting)
  const totalFilteredProblems = useMemo(() => {
    let sourceProblems: LeetCodeProblem[];

    if (isDailyMode) {
      sourceProblems = dailyProblems;
    } else if (isShuffled) {
      sourceProblems = shuffledProblems;
    } else {
      sourceProblems = problems;
    }

    // In daily mode, return the total daily problems without filtering
    if (isDailyMode) {
      return sourceProblems.length;
    }

    return sourceProblems.filter((problem) => {
      const matchesDifficulty = difficulties[problem.difficulty];
      const matchesCategory = categories[problem.category];

      // Check if problem matches any selected list
      const matchesList =
        problem.list && Array.isArray(problem.list)
          ? problem.list.some((list) => lists[list])
          : false;

      return matchesDifficulty && matchesCategory && matchesList;
    }).length;
  }, [
    difficulties,
    categories,
    lists,
    problems,
    isShuffled,
    shuffledProblems,
    isDailyMode,
    dailyProblems,
  ]);

  // Exit daily mode and return to normal view
  const exitDailyMode = useCallback(() => {
    setIsDailyMode(false);
    setDailyProblems([]);
    setIndex(0);
  }, []);

  // Shuffle the entire deck of available problems once.
  const handleShuffle = useCallback(async () => {
    if (problems.length === 0) return;

    setIsShuffling(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const shuffled = [...problems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledProblems(shuffled);
    setIsShuffled(true);
    setIndex(0);
    setIsShuffling(false);
  }, [problems]);

  // Handle daily problems - select one random problem from each category
  const handleDailyProblems = useCallback(async () => {
    if (problems.length === 0) return;

    setIsShuffling(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const daily: LeetCodeProblem[] = [];

    // Get one random problem from each category in the order defined in types.ts
    availableCategories.forEach((category) => {
      const categoryProblems = problems.filter(
        (problem) => problem.category === category
      );
      if (categoryProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryProblems.length);
        daily.push(categoryProblems[randomIndex]);
      }
    });

    // Sort the problems by difficulty: Easy first, then Medium, then Hard
    const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
    daily.sort(
      (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );

    setDailyProblems(daily);
    setIsDailyMode(true);
    setIsShuffled(false);
    setIndex(0);
    setIsShuffling(false);
  }, [problems, availableCategories]);

  // Effect to reset index when filters change the displayed problems
  useEffect(() => {
    setIndex(0);
  }, [displayedProblems]);

  // Calculate progress percentage
  const progressValue =
    displayedProblems.length > 0
      ? ((index + 1) / displayedProblems.length) * 100
      : 0;

  const next = () => {
    if (displayedProblems.length === 0) return;
    setIndex((i) => (i + 1) % displayedProblems.length);
  };

  const prev = () => {
    if (displayedProblems.length === 0) return;
    setIndex(
      (i) => (i - 1 + displayedProblems.length) % displayedProblems.length
    );
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

  // Get difficulty-based background class
  const getDifficultyBackground = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50/30";
      case "Medium":
        return "bg-amber-50/30";
      case "Hard":
        return "bg-red-50/30";
      default:
        return "";
    }
  };

  // Update background when current problem changes
  useEffect(() => {
    if (displayedProblems.length > 0 && displayedProblems[index]) {
      const newBackgroundClass = getDifficultyBackground(
        displayedProblems[index].difficulty
      );
      setBackgroundClass(newBackgroundClass);
    } else {
      setBackgroundClass("");
    }
  }, [displayedProblems, index]);

  // Auto-reset maxCards whenever filters change
  useEffect(() => {
    if (!isLoading && totalFilteredProblems > 0) {
      setMaxCards(totalFilteredProblems);
    }
  }, [isLoading, totalFilteredProblems, difficulties, categories, lists]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex flex-col min-h-screen transition-all duration-700 ease-in-out ${backgroundClass}`}
      >
        <div className="flex-1 flex flex-col items-center justify-start gap-8 p-4 mt-4">
          {/* Navigation bar - always visible */}
          <div className="w-full max-w-3xl mx-auto">
            {/* Top row - Logo and Page Count */}
            <div className="flex items-center justify-between w-full mb-4 px-2 mt-4 md:mt-8">
              {/* Left side - Brand Logo */}
              <div className="flex items-center">
                <Brand size="md" showText={true} />
              </div>

              {/* Right side - Page Count */}
              <div className="text-sm text-muted-foreground text-center font-medium">
                {displayedProblems.length > 0
                  ? `${index + 1} / ${displayedProblems.length}${
                      !isDailyMode && totalFilteredProblems > maxCards
                        ? ` (of ${totalFilteredProblems})`
                        : ""
                    }${isDailyMode ? " • Daily" : ""}`
                  : `${problems.length} problems available`}
              </div>
            </div>

            {/* Second row - Action Buttons and Navigation */}
            <div className="flex items-center justify-between w-full mb-4 px-2">
              {/* Left side - Filter, Shuffle, Daily, and Search buttons */}
              <div className="flex gap-1 sm:gap-2 md:gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer text-xs sm:text-sm"
                            disabled={isDailyMode}
                          >
                            <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">Filters</span>
                            <span className="xs:hidden">Filter</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side="left"
                          className="p-0 max-w-xs transition-all duration-300 ease-in-out"
                        >
                          <Sidebar
                            difficulties={difficulties}
                            categories={categories}
                            lists={lists}
                            availableCategories={availableCategories}
                            availableLists={availableLists}
                            maxCards={maxCards}
                            maxCardsAvailable={totalFilteredProblems}
                            onDifficultyChange={setDifficulties}
                            onCategoryChange={setCategories}
                            onListChange={setLists}
                            onMaxCardsChange={setMaxCards}
                            noCard
                          />
                        </SheetContent>
                      </Sheet>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isDailyMode
                          ? "Filters disabled in daily mode"
                          : "Filters"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShuffle}
                        className="hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
                        disabled={
                          problems.length === 0 || isShuffling || isDailyMode
                        }
                      >
                        <motion.div
                          animate={
                            isShuffling ? { rotate: 360 } : { rotate: 0 }
                          }
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ willChange: "transform" }}
                        >
                          <Shuffle className="h-3 w-3 sm:h-4 sm:w-4" />
                        </motion.div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isDailyMode
                          ? "Shuffle disabled in daily mode"
                          : "Shuffle Deck"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isDailyMode ? "default" : "outline"}
                        size="sm"
                        onClick={
                          isDailyMode ? exitDailyMode : handleDailyProblems
                        }
                        className="hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
                        disabled={problems.length === 0 || isShuffling}
                      >
                        <motion.div
                          animate={
                            isShuffling ? { rotate: 360 } : { rotate: 0 }
                          }
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ willChange: "transform" }}
                        >
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        </motion.div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isDailyMode ? "Exit Daily Mode" : "Daily Problems"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchOpen(true)}
                        className="hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
                        disabled={displayedProblems.length === 0 || isDailyMode}
                      >
                        <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isDailyMode
                          ? "Search disabled in daily mode"
                          : "Search Problems"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Right side - Navigation buttons */}
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={prev}
                        className="hover:bg-accent hover:text-accent-foreground hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
                        disabled={displayedProblems.length === 0}
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
                        className="hover:bg-accent hover:text-accent-foreground hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
                        disabled={displayedProblems.length === 0}
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
            {displayedProblems.length > 0 && (
              <div className="w-full mb-6 px-2">
                <Progress
                  value={progressValue}
                  className="h-1.5 transition-all duration-300"
                />
              </div>
            )}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            {displayedProblems.length > 0 && displayedProblems[index] ? (
              <motion.div
                key={index}
                className="w-full max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ willChange: "opacity" }}
              >
                <Flashcard problem={displayedProblems[index]} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-3xl mx-auto"
                style={{ willChange: "opacity" }}
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
                        <Button
                          variant="outline"
                          className="mt-4 cursor-pointer"
                        >
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
                          lists={lists}
                          availableCategories={availableCategories}
                          availableLists={availableLists}
                          maxCards={maxCards}
                          maxCardsAvailable={totalFilteredProblems}
                          onDifficultyChange={setDifficulties}
                          onCategoryChange={setCategories}
                          onListChange={setLists}
                          onMaxCardsChange={setMaxCards}
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
                {displayedProblems.map((problem) => (
                  <CommandItem
                    key={problem.id}
                    value={problem.title}
                    onSelect={() => {
                      const problemIndex = displayedProblems.findIndex(
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
      <footer className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 py-6 px-4 text-muted-foreground text-sm bg-white border-t text-center">
        <span>Code for the solutions were contributed by</span>
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
          <a
            href="https://marc.tt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Marc Beepath
          </a>
          <span className="hidden sm:inline">,</span>
          <a
            href="https://github.com/Daniel-04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Daniel Diaz
          </a>
          <span>and</span>
          <a
            href="https://github.com/HaowenRong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Haowen Rong
          </a>
        </div>
      </footer>
    </>
  );
}
