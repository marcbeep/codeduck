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
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Difficulty = "Easy" | "Medium" | "Hard";
type Category = string;
type List = string;

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
  onResetFilters?: () => void;
  noCard?: boolean;
  isResetting?: boolean;
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
  onResetFilters,
  noCard = false,
  isResetting = false,
}: SidebarProps) {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isListsOpen, setIsListsOpen] = useState(true);
  const [resetAnimation, setResetAnimation] = useState(false);

  // Trigger reset animation when isResetting changes
  useEffect(() => {
    if (isResetting) {
      setResetAnimation(true);
      const timer = setTimeout(() => setResetAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

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
    onCategoryChange((prev: Record<string, boolean>) => {
      const cleared = { ...prev };
      Object.keys(cleared).forEach((key) => (cleared[key] = false));
      return cleared;
    });
  };
  const selectAllCategories = () => {
    onCategoryChange((prev: Record<string, boolean>) => {
      const selected = { ...prev };
      Object.keys(selected).forEach((key) => (selected[key] = true));
      return selected;
    });
  };

  const content = (
    <motion.div
      className="p-4"
      animate={
        resetAnimation ? { scale: [1, 1.02, 1], opacity: [1, 0.8, 1] } : {}
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <Collapsible
          open={isListsOpen}
          onOpenChange={setIsListsOpen}
          className="space-y-2"
        >
          <div className="flex items-center justify-between w-full px-2 py-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Lists</h3>
              <button
                type="button"
                onClick={selectAllLists}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearLists}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Clear
              </button>
            </div>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="ml-2 p-1 rounded hover:bg-accent/50 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isListsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pl-2">
            <motion.div
              initial={false}
              animate={{ opacity: isListsOpen ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-2"
            >
              {availableLists.map((list, index) => (
                <motion.div
                  key={list}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="flex items-center space-x-2 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={lists[list] ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      id={`list-${list}`}
                      checked={lists[list]}
                      onCheckedChange={(checked) => {
                        handleListChange(list, checked);
                      }}
                      className="cursor-pointer"
                    />
                  </motion.div>
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
                      : list}
                  </Label>
                </motion.div>
              ))}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
        <Separator />
        <Collapsible
          open={isDifficultyOpen}
          onOpenChange={setIsDifficultyOpen}
          className="space-y-2"
        >
          <div className="flex items-center justify-between w-full px-2 py-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Difficulty</h3>
              <button
                type="button"
                onClick={selectAllDifficulties}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearDifficulties}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Clear
              </button>
            </div>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="ml-2 p-1 rounded hover:bg-accent/50 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isDifficultyOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pl-2">
            <motion.div
              initial={false}
              animate={{ opacity: isDifficultyOpen ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-2"
            >
              {(Object.keys(difficulties) as Difficulty[]).map(
                (difficulty, index) => (
                  <motion.div
                    key={difficulty}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="flex items-center space-x-2 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={
                        difficulties[difficulty] ? { scale: [1, 1.2, 1] } : {}
                      }
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        id={`difficulty-${difficulty}`}
                        checked={difficulties[difficulty]}
                        onCheckedChange={(checked) => {
                          handleDifficultyChange(difficulty, checked);
                        }}
                        className="cursor-pointer"
                      />
                    </motion.div>
                    <Label
                      htmlFor={`difficulty-${difficulty}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors flex-1 select-none"
                    >
                      {difficulty}
                    </Label>
                  </motion.div>
                )
              )}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
        <Separator />
        <Collapsible
          open={isCategoriesOpen}
          onOpenChange={setIsCategoriesOpen}
          className="space-y-2"
        >
          <div className="flex items-center justify-between w-full px-2 py-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <button
                type="button"
                onClick={selectAllCategories}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearCategories}
                className="ml-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors px-1 py-0.5 rounded cursor-pointer focus:outline-none"
                tabIndex={0}
              >
                Clear
              </button>
            </div>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="ml-2 p-1 rounded hover:bg-accent/50 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pl-2">
            <motion.div
              initial={false}
              animate={{ opacity: isCategoriesOpen ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-2">
                  {availableCategories.map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.2 }}
                      className="flex items-center space-x-2 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={
                          categories[category] ? { scale: [1, 1.2, 1] } : {}
                        }
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={categories[category]}
                          onCheckedChange={(checked) => {
                            handleCategoryChange(category, checked);
                          }}
                          className="cursor-pointer"
                        />
                      </motion.div>
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors flex-1 select-none"
                      >
                        {category}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
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
              className="w-full"
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
    </motion.div>
  );

  if (noCard) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">{content}</ScrollArea>
        </div>
        {onResetFilters && (
          <div className="p-4 border-t bg-background">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    );
  }
  return (
    <Card className="w-80 h-[calc(100vh-2rem)] mt-4 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">{content}</ScrollArea>
      </div>
      {onResetFilters && (
        <div className="p-4 border-t bg-background">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </Card>
  );
}
