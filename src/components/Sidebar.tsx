"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";
type Category = string;
type List = string;

interface SidebarProps {
  difficulties: Record<Difficulty, boolean>;
  categories: Record<Category, boolean>;
  lists: Record<List, boolean>;
  availableCategories: Category[];
  availableLists: List[];
  onDifficultyChange: Dispatch<SetStateAction<Record<Difficulty, boolean>>>;
  onCategoryChange: Dispatch<SetStateAction<Record<Category, boolean>>>;
  onListChange: Dispatch<SetStateAction<Record<List, boolean>>>;
  noCard?: boolean;
}

export function Sidebar({
  difficulties,
  categories,
  lists,
  availableCategories,
  availableLists,
  onDifficultyChange,
  onCategoryChange,
  onListChange,
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

  const content = (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <Collapsible
          open={isListsOpen}
          onOpenChange={setIsListsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent/50 rounded-md px-2 py-1.5 transition-colors cursor-pointer">
            <h3 className="text-sm font-medium">Lists</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isListsOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-2">
            <div className="space-y-2">
              {availableLists.map((list) => (
                <div key={list} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={`list-${list}`}
                    checked={lists[list]}
                    onCheckedChange={(checked) =>
                      handleListChange(list, checked)
                    }
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`list-${list}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors"
                  >
                    {list === "blind75"
                      ? "Blind 75"
                      : list === "neetcode150"
                      ? "NeetCode 150"
                      : list === "leetcode150"
                      ? "LeetCode 150"
                      : list}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Separator />
        <Collapsible
          open={isDifficultyOpen}
          onOpenChange={setIsDifficultyOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent/50 rounded-md px-2 py-1.5 transition-colors cursor-pointer">
            <h3 className="text-sm font-medium">Difficulty</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDifficultyOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-2">
            {(Object.keys(difficulties) as Difficulty[]).map((difficulty) => (
              <div
                key={difficulty}
                className="flex items-center space-x-2 group"
              >
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={difficulties[difficulty]}
                  onCheckedChange={(checked) =>
                    handleDifficultyChange(difficulty, checked)
                  }
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors"
                >
                  {difficulty}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <Separator />
        <Collapsible
          open={isCategoriesOpen}
          onOpenChange={setIsCategoriesOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent/50 rounded-md px-2 py-1.5 transition-colors cursor-pointer">
            <h3 className="text-sm font-medium">Categories</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isCategoriesOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-2">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 group"
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={categories[category]}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked)
                      }
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
        <Separator />
      </div>
    </div>
  );

  if (noCard) {
    return content;
  }
  return (
    <Card className="w-80 h-[calc(100vh-2rem)] mt-4 flex flex-col">
      {content}
    </Card>
  );
}
