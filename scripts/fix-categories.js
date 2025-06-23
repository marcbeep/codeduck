const fs = require("fs");
const path = require("path");

// Valid categories from the template
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

// Category mapping for fixing inconsistencies
const CATEGORY_MAPPING = {
  Tree: "Binary Tree General",
  Graph: "Graph General",
  String: "Array / String",
  "Array/String": "Array / String",
  Array: "Array / String",
  "Dynamic Programming": "1D DP", // Default to 1D DP, may need manual review
  Design: "Trie", // Default mapping, may need manual review
  Greedy: "Math", // Default mapping, may need manual review
};

// More specific mappings based on problem content
const SPECIFIC_MAPPINGS = {
  "146-lru-cache.json": "Hashmap", // LRU Cache is typically implemented with HashMap + Doubly Linked List
  "208-implement-trie-prefix-tree.json": "Trie", // This is actually a Trie implementation
  "295-find-median-from-data-stream.json": "Heap", // Uses min/max heaps
  "981-time-based-key-value-store.json": "Hashmap", // Time-based key-value store
  "621-task-scheduler.json": "Heap", // Task scheduler with greedy approach using heap
  "416-partition-equal-subset-sum.json": "Multidimensional DP", // 0/1 Knapsack variant
  "1235-maximum-profit-in-job-scheduling.json": "Multidimensional DP", // Job scheduling with DP
  "139-word-break.json": "1D DP", // 1D DP problem
  "322-coin-change.json": "1D DP", // 1D DP problem
  "102-binary-tree-level-order-traversal.json": "Binary Tree BFS", // BFS traversal
  "199-binary-tree-right-side-view.json": "Binary Tree BFS", // BFS traversal
  "200-number-of-islands.json": "Graph BFS", // BFS for graph traversal
  "733-flood-fill.json": "Graph BFS", // BFS for flood fill
  "127-word-ladder.json": "Graph BFS", // BFS for shortest path
  "133-clone-graph.json": "Graph BFS", // BFS for graph cloning
  "207-course-schedule.json": "Graph BFS", // BFS for topological sort
  "721-accounts-merge.json": "Graph BFS", // BFS for connected components
  "310-minimum-height-trees.json": "Graph BFS", // BFS for finding center nodes
  "994-rotting-oranges.json": "Graph BFS", // BFS for rotting process
  "235-lowest-common-ancestor-of-a-binary-search-tree.json":
    "Binary Search Tree", // BST specific
  "230-kth-smallest-element-in-a-bst.json": "Binary Search Tree", // BST specific
  "704-binary-search.json": "Binary Search", // Pure binary search
  "033-search-in-rotated-sorted-array.json": "Binary Search", // Binary search variant
  "278-first-bad-version.json": "Binary Search", // Binary search variant
};

const JSON_DIR = path.join(__dirname, "../src/problems/json");

function fixCategories() {
  const files = fs
    .readdirSync(JSON_DIR)
    .filter((file) => file.endsWith(".json"));
  const issues = [];
  const fixed = [];

  console.log("🔍 Checking categories in JSON files...\n");

  for (const file of files) {
    const filePath = path.join(JSON_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);

    const currentCategory = data.category;

    if (!VALID_CATEGORIES.includes(currentCategory)) {
      // Check for specific mapping first
      const specificMapping = SPECIFIC_MAPPINGS[file];
      const generalMapping = CATEGORY_MAPPING[currentCategory];
      const suggestedCategory =
        specificMapping || generalMapping || "NEEDS_MANUAL_REVIEW";

      issues.push({
        file,
        currentCategory,
        suggestedCategory,
      });
    }
  }

  // Report issues
  if (issues.length > 0) {
    console.log("❌ Found category inconsistencies:");
    console.log("=".repeat(80));

    for (const issue of issues) {
      console.log(`📁 ${issue.file}`);
      console.log(`   Current: "${issue.currentCategory}"`);
      console.log(`   Suggested: "${issue.suggestedCategory}"`);
      console.log("");
    }

    console.log(`Total issues found: ${issues.length}\n`);

    // Show what would be fixed
    console.log("📋 Categories that would be automatically fixed:");
    console.log("=".repeat(50));

    for (const issue of issues) {
      if (issue.suggestedCategory !== "NEEDS_MANUAL_REVIEW") {
        console.log(
          `${issue.file}: "${issue.currentCategory}" → "${issue.suggestedCategory}"`
        );
        fixed.push(issue);
      } else {
        console.log(
          `${issue.file}: "${issue.currentCategory}" → NEEDS MANUAL REVIEW`
        );
      }
    }

    console.log(`\n✅ ${fixed.length} files can be automatically fixed`);
    console.log(`⚠️  ${issues.length - fixed.length} files need manual review`);
  } else {
    console.log("✅ All categories are valid!");
  }
}

function applyFixes() {
  const files = fs
    .readdirSync(JSON_DIR)
    .filter((file) => file.endsWith(".json"));
  let fixedCount = 0;

  console.log("🔧 Applying category fixes...\n");

  for (const file of files) {
    const filePath = path.join(JSON_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);

    const currentCategory = data.category;

    // Check for specific mapping first, then general mapping
    const specificMapping = SPECIFIC_MAPPINGS[file];
    const generalMapping = CATEGORY_MAPPING[currentCategory];
    const newCategory = specificMapping || generalMapping;

    if (newCategory) {
      data.category = newCategory;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
      console.log(
        `✅ Fixed ${file}: "${currentCategory}" → "${data.category}"`
      );
      fixedCount++;
    }
  }

  console.log(`\n🎉 Fixed ${fixedCount} files!`);
}

// Run the script
if (process.argv.includes("--fix")) {
  applyFixes();
} else {
  fixCategories();
}
