import React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BrandProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Brand: React.FC<BrandProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  };

  const logoSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const handleLogoClick = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
      ],
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
          onClick={handleLogoClick}
        >
          <Image
            src="/logo.png"
            alt="CodeDuck Logo"
            width={logoSizes[size]}
            height={logoSizes[size]}
            className="flex-shrink-0"
          />
          {showText && (
            <span
              className={`${sizeClasses[size]} font-bold text-foreground hidden sm:block`}
            >
              CodeDuck
            </span>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/logo.png"
              alt="CodeDuck Logo"
              width={48}
              height={48}
              className="flex-shrink-0"
            />
            <AlertDialogTitle className="text-2xl font-bold">
              Welcome to CodeDuck! 🚀
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base leading-relaxed">
            <strong>
              Short on time but want to ace your coding interviews?
            </strong>
            <br />
            <br />
            CodeDuck gathers the most popular LeetCode problems and turns them
            into bite-sized flashcards that you can tackle anywhere, anytime.
            <br />
            <br />
            Use the filter button to sort by curated list, difficulty or
            category.
            <br />
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-primary hover:bg-primary/90">
            Let&apos;s Go!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
