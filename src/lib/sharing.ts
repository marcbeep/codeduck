import { LeetCodeProblem } from "./types";

/**
 * Generate a shareable URL for a problem
 */
export function generateShareUrl(problem: LeetCodeProblem): string {
  // Create a slug from the problem ID and title
  const slug = `${problem.id.toString().padStart(3, "0")}-${problem.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

  // Get the current origin, or fallback for server-side rendering
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://your-app-domain.com"; // Replace with your actual domain

  return `${origin}/problem/${slug}`;
}

/**
 * Generate a slug from a problem (useful for routing)
 */
export function generateProblemSlug(problem: LeetCodeProblem): string {
  return `${problem.id.toString().padStart(3, "0")}-${problem.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

/**
 * Copy text to clipboard with modern API fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Generate social media sharing URLs
 */
export function generateSocialShareUrls(problem: LeetCodeProblem) {
  const shareUrl = generateShareUrl(problem);
  const text = `Check out this ${problem.difficulty} ${problem.category} problem: ${problem.title}`;

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`,

    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(text)}`,

    discord: shareUrl, // Discord auto-unfurls URLs with metadata

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
  };
}

/**
 * Generate a share text for the problem
 */
export function generateShareText(problem: LeetCodeProblem): string {
  return `🧩 ${problem.title} (${problem.difficulty})
  
${problem.category} • ${problem.topics.join(", ")}

${problem.description.slice(0, 200)}${
    problem.description.length > 200 ? "..." : ""
  }

Practice it here: ${generateShareUrl(problem)}`;
}
