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
    title: `${problem.title} - ${problem.difficulty} ${problem.category} Problem | LeetCode Practice`,
    description: `Solve ${problem.title}, a ${problem.difficulty} ${
      problem.category
    } problem. ${problem.description.slice(0, 140)}...`,
    keywords: [
      problem.title.toLowerCase(),
      problem.difficulty.toLowerCase(),
      problem.category.toLowerCase(),
      "leetcode",
      "coding interview",
      "programming",
      "algorithms",
      "data structures",
      ...problem.topics.map((topic) => topic.toLowerCase()),
      ...problem.list.map((list) => list.toLowerCase()),
    ].join(", "),
    authors: [
      { name: "Marc Beepath", url: "https://marc.tt" },
      { name: "Daniel Diaz", url: "https://github.com/Daniel-04" },
      { name: "Haowen Rong", url: "https://github.com/HaowenRong" },
    ],
    openGraph: {
      title: `${problem.title} - ${problem.difficulty} Problem`,
      description: `Master ${problem.title}, a ${problem.difficulty} ${problem.category} problem with detailed solution and explanation.`,
      type: "article",
      siteName: "LeetCode Practice",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(problem.title)}&difficulty=${
            problem.difficulty
          }&category=${problem.category}`,
          width: 1200,
          height: 630,
          alt: `${problem.title} - ${problem.difficulty} Problem Solution`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@your_twitter_handle", // Replace with your actual Twitter handle
      title: `${problem.title} - ${problem.difficulty} Problem`,
      description: `Practice ${problem.title}, a ${problem.difficulty} ${problem.category} problem with complete solution.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: problem.title,
    description: problem.description.slice(0, 200),
    author: [
      {
        "@type": "Person",
        name: "Marc Beepath",
        url: "https://marc.tt",
      },
      {
        "@type": "Person",
        name: "Daniel Diaz",
        url: "https://github.com/Daniel-04",
      },
      {
        "@type": "Person",
        name: "Haowen Rong",
        url: "https://github.com/HaowenRong",
      },
    ],
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "LeetCode Practice",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://your-domain.com/problem/${slug}`,
    },
    articleSection: problem.category,
    keywords: [
      problem.difficulty,
      problem.category,
      ...problem.topics,
      ...problem.list,
    ].join(", "),
    about: {
      "@type": "Thing",
      name: "Coding Interview Preparation",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
