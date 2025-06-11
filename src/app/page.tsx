"use client";

import Flashcard from "@/components/Flashcard";
import { problems } from "@/lib/load-problems";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % problems.length);
  const prev = () =>
    setIndex((i) => (i - 1 + problems.length) % problems.length);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <h1 className="text-3xl font-bold mb-4">LeetCode Flashcards</h1>
      <Flashcard problem={problems[index]} />
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 rounded bg-muted hover:bg-muted-foreground text-foreground"
          onClick={prev}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded bg-muted hover:bg-muted-foreground text-foreground"
          onClick={next}
        >
          Next
        </button>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Card {index + 1} of {problems.length}
      </div>
    </div>
  );
}
