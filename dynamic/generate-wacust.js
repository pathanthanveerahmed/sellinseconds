const fs = require("fs");
const path = require("path");

// Script resides in dynamic/ folder
// __dirname points to .../sellinseconds/dynamic

// File paths relative to dynamic/
const dataPath = path.join(__dirname, "data.json");
const templatePath = path.join(__dirname, "1to30-template.html");

// Subdirectories under dynamic/
const imgDir = path.join(__dirname, "images");
const tempDir = path.join(__dirname, "wacust-temp");
const finalDir = path.join(__dirname, "wacust");

// Load and parse data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error(`Error loading JSON at ${dataPath}:`, err);
  process.exit(1);
}
const images = Array.isArray(data.images) ? data.images : [];

// Read the HTML template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error(`Error loading template at ${templatePath}:`, err);
  process.exit(1);
}

// Version timestamp for cache busting
const version = Date.now();

// Step 1: Clean/Create temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Step 2: Generate WACUST HTMLs
images.forEach(item => {
  const idx = parseInt(item.id, 10);
  if (!idx || idx < 1 || idx > 30) return;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  let filename = item.filename || "og.png";

  // Verify image exists, fallback if needed
  const imagePath = path.join(imgDir, filename);
  if (!fs.existsSync(imagePath)) {
    console.warn(`Missing file: ${filename}, falling back to og.png`);
    filename = "og.png";
  }

  // Append version query to bust caches
  const versioned = `${filename}?v=${version}`;

  // Populate template placeholders
  const htmlContent = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, versioned)
    .replace(/{{PAGE}}/g, idx);

  // Write to temp directory
  const outFile = path.join(tempDir, `${idx}.html`);
  fs.writeFileSync(outFile, htmlContent, "utf8");
  console.log(`Generated ${outFile}`);
});

// Step 3: Atomic replace of final directory
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.renameSync(tempDir, finalDir);
console.log("WACUST directory updated successfully.");
