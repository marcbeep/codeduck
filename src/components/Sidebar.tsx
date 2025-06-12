"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";
type Category = string;
type List = string;

interface SidebarProps {
  difficulties: Record<Difficulty, boolean>;
  categories: Record<Category, boolean>;
  list: string;
  availableCategories: Category[];
  availableLists: List[];
  onDifficultyChange: Dispatch<SetStateAction<Record<Difficulty, boolean>>>;
  onCategoryChange: Dispatch<SetStateAction<Record<Category, boolean>>>;
  onListChange: (list: string) => void;
  noCard?: boolean;
}

export function Sidebar({
  difficulties,
  categories,
  list,
  availableCategories,
  availableLists,
  onDifficultyChange,
  onCategoryChange,
  onListChange,
  noCard = false,
}: SidebarProps) {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

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

  const handleListChange = (value: string) => {
    onListChange(value);
  };

  const content = (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div className="mb-2">
          <h3 className="text-sm font-medium mb-1">List</h3>
          <Select value={list} onValueChange={handleListChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select list" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lists</SelectItem>
              {availableLists.map((l) => (
                <SelectItem key={l} value={l}>
                  {l === "blind75" ? "Blind 75" : l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
