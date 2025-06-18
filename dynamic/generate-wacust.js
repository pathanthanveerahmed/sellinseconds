// File: dynamic/generate-wacust.js
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");
const templatePath = path.join(__dirname, "1to30-template.html");
const imgDir = path.join(__dirname, "images");
const tempDir = path.join(__dirname, "wacust-temp");
const finalDir = path.join(__dirname, "wacust");

let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}

let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read 1to30-template.html:", err);
  process.exit(1);
}

if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

data.images.forEach(img => {
  const id = parseInt(img.id, 10);
  if (!id || id < 1 || id > 30) return;

  const name = img.name || "Device on SellInSeconds";
  const desc = img.description || "Certified device available";
  let filename = img.filename || "og.png";

  if (!fs.existsSync(path.join(imgDir, filename))) filename = "og.png";

  const html = template
    .replace(/{{TITLE}}/g, name)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, filename)
    .replace(/{{PAGE}}/g, id);

  fs.writeFileSync(path.join(tempDir, `${id}.html`), html, "utf8");
  console.log(`✅ Wrote ${id}.html`);
});

if (fs.existsSync(finalDir)) fs.rmSync(finalDir, { recursive: true });
fs.renameSync(tempDir, finalDir);
console.log("✅ WACUST pages regenerated successfully.");