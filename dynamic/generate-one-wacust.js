// File: dynamic/generate-one-wacust.js
const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const imgDir = "dynamic/images";
const finalDir = "dynamic/wacust";

const id = parseInt(data.active, 10);
const item = data.images.find(img => parseInt(img.id) === id);

if (!item) {
  console.error("❌ No product found for ID:", id);
  process.exit(1);
}

let filename = item.filename || "og.png";
if (!filename.endsWith(".webp") || !fs.existsSync(`${imgDir}/${filename}`)) {
  filename = "og.png";
}

const html = template
  .replace(/{{TITLE}}/g, item.name || "Device on SellInSeconds")
  .replace(/{{DESCRIPTION}}/g, item.description || "Certified device available")
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PAGE}}/g, id);

fs.writeFileSync(`${finalDir}/${id}.html`, html, "utf8");
console.log(`✅ Regenerated wacust/${id}.html`);
