const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";

// Load and parse data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}
const images = data.images || [];
const active = data.active || 1;

// Read template ✅ THIS WAS MISSING
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}