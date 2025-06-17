const fs = require("fs");
const path = require("path");

// This script is located in sellinseconds/dynamic/
// __dirname equals path/to/sellinseconds/dynamic

// Files in the same folder:
const dataPath = path.join(__dirname, "data.json");
const templatePath = path.join(__dirname, "1to30-template.html");

// Subdirectories under dynamic/
const imgDir = path.join(__dirname, "images");
const tempDir = path.join(__dirname, "wacust-temp");
const finalDir = path.join(__dirname, "wacust");

// Read the JSON data
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (e) {
  console.error(`Failed to read data.json at ${dataPath}:`, e);
  process.exit(1);
}
const images = Array.isArray(data.images) ? data.images : [];

// Read the HTML template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (e) {
  console.error(`Failed to read template at ${templatePath}:`, e);
  process.exit(1);
}

// Timestamp for cache-busting
const version = Date.now();

// 1. Clean/create temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// 2. Generate each HTML page
images.forEach(item => {
  const idx = parseInt(item.id, 10);
  if (!idx || idx < 1 || idx > 30) return;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  let filename = item.filename || "og.png";
  const imagePath = path.join(imgDir, filename);

  // Fallback to og.png if missing
  if (!fs.existsSync(imagePath)) {
    console.warn(`Image not found: ${imagePath}, using og.png`);
    filename = "og.png";
  }

  // Add version query
  const filenameWithVer = `${filename}?v=${version}`;

  // Populate template
  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, filenameWithVer)
    .replace(/{{PAGE}}/g, idx);

  const outFile = path.join(tempDir, `${idx}.html`);
  fs.writeFileSync(outFile, html, "utf8");
  console.log(`✅ ${outFile}`);
});

// 3. Atomically swap wacust directory
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.renameSync(tempDir, finalDir);
console.log("✅ wacust updated");
