import { getProblems } from "@/lib/actions";
import { notFound } from "next/navigation";
import { SharedProblemView } from "@/components/SharedProblemView";
import { Metadata } from "next";

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for better social sharing
export async function generateMetadata({
  params,
}: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const problems = await getProblems();
  const problem = problems.find(
    (p) =>
      p.title.toLowerCase().replace(/\s+/g, "-") === slug ||
      `${p.id.toString().padStart(3, "0")}-${p.title
        .toLowerCase()
        .replace(/\s+/g, "-")}` === slug
  );

  if (!problem) {
    return {
      title: "Problem Not Found",
    };
  }

  return {
    title: `${problem.title} - ${problem.difficulty} ${problem.category} Problem`,
    description: problem.description.slice(0, 160) + "...",
    openGraph: {
      title: `${problem.title} - LeetCode Practice`,
      description: `${problem.difficulty} ${
        problem.category
      } problem: ${problem.description.slice(0, 100)}...`,
      type: "article",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(problem.title)}&difficulty=${
            problem.difficulty
          }&category=${problem.category}`,
          width: 1200,
          height: 630,
          alt: `${problem.title} - ${problem.difficulty} Problem`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${problem.title} - LeetCode Practice`,
      description: `${problem.difficulty} ${problem.category} problem`,
    },
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problems = await getProblems();

  // Find problem by slug (support both title-based and id-based slugs)
  const problem = problems.find(
    (p) =>
      p.title.toLowerCase().replace(/\s+/g, "-") === slug ||
      `${p.id.toString().padStart(3, "0")}-${p.title
        .toLowerCase()
        .replace(/\s+/g, "-")}` === slug
  );

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedProblemView problem={problem} />
    </div>
  );
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const problems = await getProblems();

  return problems.map((problem) => ({
    slug: `${problem.id.toString().padStart(3, "0")}-${problem.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
  }));
}
