const fs = require("fs");
const path = require("path");

// Load data
const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;
// Read HTML template
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

// Directories
const imgDir = path.join(__dirname, "dynamic/images");
const tempDir = path.join(__dirname, "dynamic/wacust-temp");
const finalDir = path.join(__dirname, "dynamic/wacust");

// Generate a version string to bust cache
const version = Date.now();

// Ensure temp directory is clean
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Generate HTML into temp
images.forEach(item => {
  const i = parseInt(item.id, 10);
  if (isNaN(i) || i < 1 || i > 30) return;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  let filename = item.filename || "og.png";
  const fullImgPath = path.join(imgDir, filename);

  // Fallback if image missing
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

// Replace final directory
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.renameSync(tempDir, finalDir);
console.log("✅ wacust directory updated");
