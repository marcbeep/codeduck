import React from "react";
import { Globe, Github, Linkedin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-white text-muted-foreground text-sm px-4 py-8 mt-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
        {/* About the App */}
        <div>
          <h2 className="font-semibold text-lg mb-2 text-black">
            About CodeDuck
          </h2>
          <p className="mb-1">
            A minimal, modern LeetCode flashcard app for focused interview prep.
            Practice, filter, and track your progress.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with Next.js, TypeScript, and{" "}
            <Heart className="inline w-3 h-3 fill-black" />
          </p>
        </div>
        {/* About Marc Beepath */}
        <div>
          <h2 className="font-semibold text-lg mb-2 text-black">
            Marc Beepath
          </h2>
          <p className="mb-2">
            Software engineer from Trinidad & Tobago, based in the UK. I build
            things people love.
          </p>
          <div className="flex gap-3 text-primary">
            <a
              href="https://marc.tt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/marcbeep"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/marcbeepath/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
