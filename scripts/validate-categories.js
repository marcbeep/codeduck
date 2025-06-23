const fs = require("fs");
const path = require("path");

// Valid categories from our types
const VALID_CATEGORIES = [
  "Array / String",
  "Two Pointers",
  "Sliding Window",
  "Matrix",
  "Hashmap",
  "Intervals",
  "Stack",
  "Linked List",
  "Binary Tree General",
  "Binary Tree BFS",
  "Binary Search Tree",
  "Graph General",
  "Graph BFS",
  "Trie",
  "Backtracking",
  "Divide & Conquer",
  "Kadane Algorithm",
  "Binary Search",
  "Heap",
  "Bit Manipulation",
  "Math",
  "1D DP",
  "Multidimensional DP",
];

function validateCategories() {
  const problemsDir = path.join(__dirname, "../src/problems/json");
  const files = fs
    .readdirSync(problemsDir)
    .filter((file) => file.endsWith(".json"));

  let hasErrors = false;
  const errors = [];

  for (const file of files) {
    const filePath = path.join(problemsDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const problem = JSON.parse(content);

    if (!problem.category) {
      errors.push(`${file}: Missing category`);
      hasErrors = true;
    } else if (!VALID_CATEGORIES.includes(problem.category)) {
      errors.push(`${file}: Invalid category "${problem.category}"`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("❌ Category validation failed:");
    errors.forEach((error) => console.error(`  ${error}`));
    console.error("\nValid categories are:");
    VALID_CATEGORIES.forEach((cat) => console.error(`  - "${cat}"`));
    process.exit(1);
  } else {
    console.log("✅ All problem files have valid categories!");
  }
}

validateCategories();
