const fs = require("fs");
const path = require("path");

// Valid categories from the user's list
const validCategories = [
  "Arrays & Hashing",
  "Two Pointers",
  "Stack",
  "Binary Search",
  "Sliding Window",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Intervals",
  "Greedy",
  "Advanced Graphs",
  "Graphs",
  "1-D DP",
  "2-D DP",
  "Bit Manipulation",
  "Math & Geometry",
];

// Path to the JSON files
const jsonDir = path.join(__dirname, "..", "src", "problems", "json");

function checkCategories() {
  console.log("Checking categories in JSON files...\n");

  // Read all JSON files
  const files = fs
    .readdirSync(jsonDir)
    .filter((file) => file.endsWith(".json"));

  const nonConformingFiles = [];
  const missingCategoryFiles = [];
  const allCategories = new Set();

  for (const file of files) {
    const filePath = path.join(jsonDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    try {
      const data = JSON.parse(content);

      if (!data.category) {
        missingCategoryFiles.push(file);
        continue;
      }

      allCategories.add(data.category);

      if (!validCategories.includes(data.category)) {
        nonConformingFiles.push({
          file,
          category: data.category,
          title: data.title || "No title",
        });
      }
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
    }
  }

  // Report results
  console.log(`Total files checked: ${files.length}\n`);

  if (missingCategoryFiles.length > 0) {
    console.log("Files missing category field:");
    missingCategoryFiles.forEach((file) => console.log(`  - ${file}`));
    console.log();
  }

  if (nonConformingFiles.length > 0) {
    console.log("Files with non-conforming categories:");
    nonConformingFiles.forEach(({ file, category, title }) => {
      console.log(`  - ${file}: "${category}" (${title})`);
    });
    console.log();
  } else {
    console.log("✅ All files have valid categories!");
  }

  // Show all unique categories found
  console.log("All unique categories found in files:");
  const sortedCategories = Array.from(allCategories).sort();
  sortedCategories.forEach((category) => {
    const isValid = validCategories.includes(category);
    const status = isValid ? "✅" : "❌";
    console.log(`  ${status} "${category}"`);
  });

  console.log("\nValid categories (for reference):");
  validCategories.forEach((category) => {
    console.log(`  - "${category}"`);
  });

  return {
    totalFiles: files.length,
    missingCategory: missingCategoryFiles.length,
    nonConforming: nonConformingFiles.length,
    nonConformingFiles,
  };
}

// Run the check
if (require.main === module) {
  checkCategories();
}

module.exports = { checkCategories, validCategories };
