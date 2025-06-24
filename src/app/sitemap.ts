import { MetadataRoute } from "next";
import { getProblems } from "@/lib/actions";

// Required for static export
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const problems = await getProblems();
  const baseUrl = "https://code.marc.tt";

  // Homepage
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // Problem pages
  const problemRoutes = problems.map((problem) => {
    const slug = `${problem.id.toString().padStart(3, "0")}-${problem.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    return {
      url: `${baseUrl}/problem/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...routes, ...problemRoutes];
}
