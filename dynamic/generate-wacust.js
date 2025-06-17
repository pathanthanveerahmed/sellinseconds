const fs = require("fs");
const path = require("path");

// Scripts resides in dynamic/, so use __dirname
// Load data from dynamic/data.json
const dataPath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const images = data.images;

// Read HTML template from dynamic/
const templatePath = path.join(__dirname, "1to30-template.html");
const template = fs.readFileSync(templatePath, "utf8");

// Directories under dynamic/
const imgDir = path.join(__dirname, "images");
const tempDir = path.join(__dirname, "wacust-temp");
const finalDir = path.join(__dirname, "wacust");

// Version string to bust cache
const version = Date.now();

// 1. Clean and recreate temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// 2. Generate HTML pages into temp
images.forEach(item => {
  const i = parseInt(item.id, 10);
  if (isNaN(i) || i < 1 || i > 30) return;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  let filename = item.filename || "og.png";
  const fullImgPath = path.join(imgDir, filename);

  // Use fallback if image missing
  if (!fs.existsSync(fullImgPath)) {
    filename = "og.png";
  }
  // Append version to bust cache
  const filenameWithVersion = `${filename}?v=${version}`;

  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, filenameWithVersion)
    .replace(/{{PAGE}}/g, i);

  const outPath = path.join(tempDir, `${i}.html`);
  fs.writeFileSync(outPath, html, "utf8");
  console.log(`✅ Generated ${outPath}`);
});

// 3. Swap directories atomically
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.renameSync(tempDir, finalDir);
console.log("✅ wacust directory updated");
