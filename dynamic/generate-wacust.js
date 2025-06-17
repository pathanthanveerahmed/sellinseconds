const fs = require("fs");
const path = require("path");

// This script is located in dynamic/, so __dirname points to .../dynamic
// Paths relative to dynamic/
const dataPath = path.join(__dirname, "data.json");
const templatePath = path.join(__dirname, "1to30-template.html");
const imgDir = path.join(__dirname, "images");
const tempDir = path.join(__dirname, "wacust-temp");
const finalDir = path.join(__dirname, "wacust");

// Load data.json
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const images = data.images;

// Load HTML template
const template = fs.readFileSync(templatePath, "utf8");

// Version string for cache-busting
const version = Date.now();

// Clean temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Generate HTML files into temp
images.forEach(item => {
  const idx = parseInt(item.id, 10);
  if (!idx || idx < 1 || idx > 30) return;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  let filename = item.filename || "og.png";
  const imgPath = path.join(imgDir, filename);

  // Fallback if image missing
  if (!fs.existsSync(imgPath)) filename = "og.png";

  // Append version for caching
  const fileWithVer = `${filename}?v=${version}`;

  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, fileWithVer)
    .replace(/{{PAGE}}/g, idx);

  const outFile = path.join(tempDir, `${idx}.html`);
  fs.writeFileSync(outFile, html, "utf8");
  console.log(`✅ Generated ${outFile}`);
});

// Replace final wacust with temp atomically
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.renameSync(tempDir, finalDir);
console.log("✅ wacust directory updated");
