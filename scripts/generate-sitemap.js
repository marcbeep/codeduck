const fs = require("fs");
const path = require("path");

// Read all problem JSON files
const problemsDir = path.join(__dirname, "../src/problems/json");
const problemFiles = fs
  .readdirSync(problemsDir)
  .filter((file) => file.endsWith(".json"));

const problems = problemFiles.map((filename) => {
  const filePath = path.join(problemsDir, filename);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
});

// Sort problems by ID
const sortedProblems = problems.sort((a, b) => a.id - b.id);

function generateSitemap() {
  const baseUrl = "https://code.marc.tt";
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  sortedProblems.forEach((problem) => {
    const slug = `${problem.id.toString().padStart(3, "0")}-${problem.title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    sitemap += `
  <url>
    <loc>${baseUrl}/problem/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write to public directory
  const publicDir = path.join(__dirname, "../public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(
    `✅ Sitemap generated successfully at public/sitemap.xml with ${sortedProblems.length} problem pages`
  );
}

generateSitemap();
