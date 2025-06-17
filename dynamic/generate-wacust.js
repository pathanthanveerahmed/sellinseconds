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

  const title = img.name || "Device on SellInSeconds";
  const desc = img.description || "Certified device available";
  let filenameWebp = img.filename || "og.png";
  let filenameJpg = filenameWebp + ".jpg";

  const jpgPath = path.join(imgDir, filenameJpg);
  const usedThumbnail = fs.existsSync(jpgPath) ? filenameJpg : "og.png";

  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, usedThumbnail)
    .replace(/{{PAGE}}/g, id);

  fs.writeFileSync(path.join(tempDir, `${id}.html`), html, "utf8");
  console.log(`✅ Wrote ${id}.html with ${usedThumbnail}`);
});

if (fs.existsSync(finalDir)) fs.rmSync(finalDir, { recursive: true });
fs.renameSync(tempDir, finalDir);
console.log("✅ WACUST pages regenerated successfully.");