"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shuffle, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";
type Topic = string;

interface SidebarProps {
  difficulties: Record<Difficulty, boolean>;
  topics: Record<Topic, boolean>;
  availableTopics: Topic[];
  onDifficultyChange: Dispatch<SetStateAction<Record<Difficulty, boolean>>>;
  onTopicChange: Dispatch<SetStateAction<Record<Topic, boolean>>>;
  onShuffle: () => void;
}

export function Sidebar({
  difficulties,
  topics,
  availableTopics,
  onDifficultyChange,
  onTopicChange,
  onShuffle,
}: SidebarProps) {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

  const handleDifficultyChange = (
    difficulty: Difficulty,
    checked: boolean | "indeterminate"
  ) => {
    onDifficultyChange((prev) => ({
      ...prev,
      [difficulty]: checked === true,
    }));
  };

  const handleTopicChange = (
    topic: Topic,
    checked: boolean | "indeterminate"
  ) => {
    onTopicChange((prev) => ({
      ...prev,
      [topic]: checked === true,
    }));
  };

  return (
    <Card className="w-80 h-[calc(100vh-2rem)] m-4 flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="space-y-4">
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
            open={isTopicsOpen}
            onOpenChange={setIsTopicsOpen}
            className="space-y-2"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent/50 rounded-md px-2 py-1.5 transition-colors cursor-pointer">
              <h3 className="text-sm font-medium">Topics</h3>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isTopicsOpen ? "transform rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-2">
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-2">
                  {availableTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center space-x-2 group"
                    >
                      <Checkbox
                        id={`topic-${topic}`}
                        checked={topics[topic]}
                        onCheckedChange={(checked) =>
                          handleTopicChange(topic, checked)
                        }
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={`topic-${topic}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-accent-foreground transition-colors"
                      >
                        {topic}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          <Button
            variant="outline"
            className="w-full hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={onShuffle}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle Deck
          </Button>
        </div>
      </div>
    </Card>
  );
}
