// Regenerate ONE wacust/X.html from data.json

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");
const templatePath = path.join(__dirname, "1to30-template.html");
const outputDir = path.join(__dirname, "wacust");
const imagesDir = path.join(__dirname, "images");

const id = parseInt(process.argv[2], 10);

if (!id || id < 1 || id > 30) {
  console.error("❌ Please provide a valid product ID (1–30)");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const item = data.images.find(img => parseInt(img.id, 10) === id);

if (!item) {
  console.error(`❌ No product found with ID ${id}`);
  process.exit(1);
}

let filename = item.filename || "og.png";
if (!fs.existsSync(path.join(imagesDir, filename))) {
  console.warn(`⚠️ Image not found: ${filename}. Using og.png`);
  filename = "og.png";
}

const template = fs.readFileSync(templatePath, "utf8");

const html = template
  .replace(/{{TITLE}}/g, item.name || "Device on SellInSeconds")
  .replace(/{{DESCRIPTION}}/g, item.description || "Certified device available")
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PAGE}}/g, id);

const outPath = path.join(outputDir, `${id}.html`);
fs.writeFileSync(outPath, html, "utf8");

console.log(`✅ Successfully generated wacust/${id}.html`);