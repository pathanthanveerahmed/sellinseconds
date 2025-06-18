// File: dynamic/generate-one-wacust.js
const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const imgDir = path.join(__dirname, "images");
const finalDir = path.join(__dirname, "wacust");

const id = parseInt(process.argv[2], 10);
if (!id || id < 1 || id > 30) {
  console.error("❌ Please provide a valid product ID as argument.");
  process.exit(1);
}

const item = data.images.find(img => parseInt(img.id) === id);
if (!item) {
  console.error("❌ No entry found for ID", id);
  process.exit(1);
}

let filename = item.filename || "og.png";
// ✅ Use only webp (we are not handling .jpg/.png fallback here anymore)
if (!filename.endsWith(".webp") || !fs.existsSync(path.join(imgDir, filename))) {
  filename = "og.png";
}

const html = template
  .replace(/{{TITLE}}/g, item.name || "Device on SellInSeconds")
  .replace(/{{DESCRIPTION}}/g, item.description || "Certified device available")
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PAGE}}/g, id);

fs.writeFileSync(path.join(finalDir, `${id}.html`), html, "utf8");
console.log(`✅ Regenerated wacust/${id}.html`);