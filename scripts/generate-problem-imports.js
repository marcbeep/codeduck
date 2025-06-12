const fs = require("fs");
const path = require("path");

// Path to the problems directory
const problemsDir = path.join(process.cwd(), "src/problems/json");
// Path to the output file
const outputFile = path.join(
  process.cwd(),
  "src/lib/generated-problem-imports.ts"
);

// Read all JSON files in the directory
const problemFiles = fs
  .readdirSync(problemsDir)
  .filter((file) => file.endsWith(".json"))
  .sort((a, b) => {
    // Extract numbers from filenames for proper sorting
    const numA = parseInt(a.split("-")[0]);
    const numB = parseInt(b.split("-")[0]);
    return numA - numB;
  });

// Generate import statements
const imports = problemFiles
  .map((file, index) => {
    const problemName = `problem${index + 1}`;
    return `import ${problemName} from "@/problems/json/${file}";`;
  })
  .join("\n");

// Generate the problems array
const problemsArray = `const allProblems = [${problemFiles
  .map((_, index) => `problem${index + 1}`)
  .join(", ")}] as LeetCodeProblem[];`;

// Generate the complete file content
const fileContent = `// This file is auto-generated. DO NOT EDIT DIRECTLY.
// Run 'npm run generate-problem-imports' to update.

import type { LeetCodeProblem } from "@/lib/types";

${imports}

${problemsArray}

export { allProblems };
`;

// Write the file
fs.writeFileSync(outputFile, fileContent);

console.log("✅ Generated problem imports successfully!");
