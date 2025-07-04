import React from "react";

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="w-full border-t bg-white text-muted-foreground text-sm px-4 py-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <p>
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://marc.tt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Marc Beepath
          </a>
        </p>
      </div>
    </footer>
  );
};
