const fs = require("fs");
const path = require("path");

// Path to the JSON files directory
const jsonDir = path.join(__dirname, "../src/problems/json");
const outputFile = path.join(__dirname, "categories.txt");

// Function to extract categories from JSON files
function extractCategories() {
  try {
    // Read all files in the JSON directory
    const files = fs.readdirSync(jsonDir);

    // Filter for JSON files
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const results = [];

    // Process each JSON file
    jsonFiles.forEach((file) => {
      const filePath = path.join(jsonDir, file);

      try {
        // Read and parse the JSON file
        const content = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(content);

        // Extract the category
        const category = data.category || "No category";

        // Format: [filename] - [category]
        const result = `${file} - ${category}`;
        results.push(result);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        results.push(`${file} - Error reading file`);
      }
    });

    // Sort results alphabetically by filename
    results.sort();

    // Write results to output file
    const output = results.join("\n");
    fs.writeFileSync(outputFile, output, "utf8");

    console.log(`Categories extracted successfully!`);
    console.log(`Found ${results.length} files`);
    console.log(`Results saved to: ${outputFile}`);

    // Also print to console
    console.log("\nCategories:");
    console.log("=".repeat(50));
    results.forEach((result) => console.log(result));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the script
extractCategories();
