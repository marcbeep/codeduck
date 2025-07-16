"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";

type Difficulty = "Easy" | "Medium" | "Hard";
type List = string;

// The roadmap-based category groups
const categoryGroups: { name: string; categories: Category[] }[] = [
  {
    name: "Fundamentals",
    categories: ["Arrays & Hashing", "Two Pointers", "Stack"],
  },
  {
    name: "Core Patterns",
    categories: ["Binary Search", "Sliding Window", "Linked List", "Intervals"],
  },
  {
    name: "Trees & Graphs",
    categories: [
      "Trees",
      "Tries",
      "Heap / Priority Queue",
      "Backtracking",
      "Graphs",
      "Advanced Graphs",
    ],
  },
  {
    name: "Dynamic Programming",
    categories: ["1-D DP", "2-D DP"],
  },
  {
    name: "Advanced",
    categories: ["Greedy", "Bit Manipulation", "Math & Geometry"],
  },
];

interface SidebarProps {
  difficulties: Record<Difficulty, boolean>;
  categories: Record<Category, boolean>;
  lists: Record<List, boolean>;
  availableCategories: Category[];
  availableLists: List[];
  maxCards: number;
  maxCardsAvailable: number;
  onDifficultyChange: Dispatch<SetStateAction<Record<Difficulty, boolean>>>;
  onCategoryChange: Dispatch<SetStateAction<Record<Category, boolean>>>;
  onListChange: Dispatch<SetStateAction<Record<List, boolean>>>;
  onMaxCardsChange: (value: number) => void;
  noCard?: boolean;
}

export function Sidebar({
  difficulties,
  categories,
  lists,
  availableCategories,
  availableLists,
  maxCards,
  maxCardsAvailable,
  onDifficultyChange,
  onCategoryChange,
  onListChange,
  onMaxCardsChange,
  noCard = false,
}: SidebarProps) {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isListsOpen, setIsListsOpen] = useState(true);

  const handleDifficultyChange = (
    difficulty: Difficulty,
    checked: boolean | "indeterminate"
  ) => {
    onDifficultyChange((prev) => ({
      ...prev,
      [difficulty]: checked === true,
    }));
  };

  const handleCategoryChange = (
    category: Category,
    checked: boolean | "indeterminate"
  ) => {
    onCategoryChange((prev) => ({
      ...prev,
      [category]: checked === true,
    }));
  };

  const handleListChange = (list: List, checked: boolean | "indeterminate") => {
    onListChange((prev) => ({
      ...prev,
      [list]: checked === true,
    }));
  };

  // Handler functions must be defined before JSX uses them
  const clearLists = () => {
    onListChange((prev: Record<string, boolean>) => {
      const cleared = { ...prev };
      Object.keys(cleared).forEach((key) => (cleared[key] = false));
      return cleared;
    });
  };
  const selectAllLists = () => {
    onListChange((prev: Record<string, boolean>) => {
      const selected = { ...prev };
      Object.keys(selected).forEach((key) => (selected[key] = true));
      return selected;
    });
  };
  const clearDifficulties = () => {
    onDifficultyChange(() => ({
      Easy: false,
      Medium: false,
      Hard: false,
    }));
  };
  const selectAllDifficulties = () => {
    onDifficultyChange(() => ({
      Easy: true,
      Medium: true,
      Hard: true,
    }));
  };
  const clearCategories = () => {
    onCategoryChange((prev: Record<Category, boolean>) => {
      const cleared = { ...prev };
      Object.keys(cleared).forEach((key) => (cleared[key as Category] = false));
      return cleared;
    });
  };
  const selectAllCategories = () => {
    onCategoryChange((prev: Record<Category, boolean>) => {
      const selected = { ...prev };
      Object.keys(selected).forEach(
        (key) => (selected[key as Category] = true)
      );
      return selected;
    });
  };

  // Global select all and clear all functions
  const selectAllFilters = () => {
    selectAllDifficulties();
    selectAllCategories();
    selectAllLists();
  };

  const clearAllFilters = () => {
    clearDifficulties();
    clearCategories();
    clearLists();
  };

  const content = (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-6">
        {/* Select All and Clear All */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={selectAllFilters}
            className="text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded cursor-pointer focus:outline-none"
          >
            Select All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded cursor-pointer focus:outline-none"
          >
            Clear All
          </Button>
        </div>

        {/* Lists */}
        <Collapsible open={isListsOpen} onOpenChange={setIsListsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between items-center p-2 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <span className="font-medium">Lists</span>
              <motion.div
                animate={{ rotate: isListsOpen ? 180 : 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ willChange: "transform" }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="pl-2">
            <div
              className="space-y-2 transition-opacity duration-200"
              style={{ opacity: isListsOpen ? 1 : 0 }}
            >
              {availableLists.map((list) => (
                <div key={list} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={`list-${list}`}
                    checked={lists[list]}
                    onCheckedChange={(checked) => {
                      handleListChange(list, checked);
                    }}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`list-${list}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors flex-1 select-none"
                  >
                    {list === "blind75"
                      ? "Blind 75"
                      : list === "grind75"
                      ? "Grind 75"
                      : list === "neetcode150"
                      ? "NeetCode 150"
                      : list === "leetcode150"
                      ? "LeetCode 150"
                      : list === "marc30"
                      ? "Marc 30"
                      : list}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Difficulty */}
        <Collapsible open={isDifficultyOpen} onOpenChange={setIsDifficultyOpen}>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-between items-center p-2 hover:bg-accent/50 transition-colors flex-1 cursor-pointer"
              >
                <span className="font-medium">Difficulty</span>
                <motion.div
                  animate={{ rotate: isDifficultyOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <div className="flex gap-1">
              <button
                onClick={clearDifficulties}
                className="text-xs text-muted-foreground hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
              >
                clear
              </button>
              <button
                onClick={selectAllDifficulties}
                className="text-xs text-muted-foreground hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
              >
                all
              </button>
            </div>
          </div>

          <CollapsibleContent className="pl-2">
            <div
              className="space-y-2 transition-opacity duration-200"
              style={{ opacity: isDifficultyOpen ? 1 : 0 }}
            >
              {(Object.keys(difficulties) as Difficulty[]).map((difficulty) => (
                <div
                  key={difficulty}
                  className="flex items-center space-x-2 group"
                >
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={difficulties[difficulty]}
                    onCheckedChange={(checked) => {
                      handleDifficultyChange(difficulty, checked);
                    }}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`difficulty-${difficulty}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors flex-1 select-none"
                  >
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Categories */}
        <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-between items-center p-2 hover:bg-accent/50 transition-colors flex-1 cursor-pointer"
              >
                <span className="font-medium">Categories</span>
                <motion.div
                  animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <div className="flex gap-1">
              <button
                onClick={clearCategories}
                className="text-xs text-muted-foreground hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
              >
                clear
              </button>
              <button
                onClick={selectAllCategories}
                className="text-xs text-muted-foreground hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
              >
                all
              </button>
            </div>
          </div>

          <CollapsibleContent className="pl-2">
            <div
              className="transition-opacity duration-200 pr-4"
              style={{ opacity: isCategoriesOpen ? 1 : 0 }}
            >
              <div className="space-y-2">
                {categoryGroups.map((group, groupIndex) => (
                  <div key={group.name}>
                    {groupIndex > 0 && <Separator className="my-3" />}
                    <h4 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.name}
                    </h4>
                    <div className="space-y-2">
                      {group.categories
                        .filter((category) =>
                          availableCategories.includes(category)
                        )
                        .map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2 group"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              checked={categories[category]}
                              onCheckedChange={(checked) => {
                                handleCategoryChange(category, checked);
                              }}
                              className="cursor-pointer"
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors flex-1 select-none"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Max Cards Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Max Cards</h3>
            <span className="text-xs text-muted-foreground">
              {maxCards} / {maxCardsAvailable}
            </span>
          </div>
          <div className="px-2">
            <Slider
              value={[maxCards]}
              onValueChange={(value) => onMaxCardsChange(value[0])}
              min={1}
              max={Math.max(1, maxCardsAvailable)}
              step={1}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="text-xs text-muted-foreground px-2">
            {maxCardsAvailable === 0
              ? "No problems match your filters"
              : maxCards === maxCardsAvailable
              ? "Showing all available problems"
              : `Showing ${maxCards} of ${maxCardsAvailable} problems`}
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );

  if (noCard) {
    return (
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1">{content}</ScrollArea>
      </div>
    );
  }
  return (
    <Card className="w-80 h-[calc(100vh-2rem)] mt-4 flex flex-col">
      <ScrollArea className="flex-1">{content}</ScrollArea>
    </Card>
  );
}
