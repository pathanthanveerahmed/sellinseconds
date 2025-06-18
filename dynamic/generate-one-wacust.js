const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const imgDir = "dynamic/images";
const finalDir = "dynamic/wacust";

const id = parseInt(data.active, 10); // we always regenerate active ID

if (!id || id < 1 || id > 30) {
  console.error("❌ Invalid ID in data.json");
  process.exit(1);
}

const item = data.images.find(img => parseInt(img.id) === id);
if (!item) {
  console.error("❌ No entry found for ID", id);
  process.exit(1);
}

let filename = item.filename || "og.png";
if (!fs.existsSync(path.join(imgDir, filename))) filename = "og.png";

const html = template
  .replace(/{{TITLE}}/g, item.name || "Device on SellInSeconds")
  .replace(/{{DESCRIPTION}}/g, item.description || "Certified device available")
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PAGE}}/g, id);

const tempPath = `dynamic/wacust-temp/${id}.html`;
fs.mkdirSync("dynamic/wacust-temp", { recursive: true });
fs.writeFileSync(tempPath, html, "utf8");

const finalPath = `dynamic/wacust/${id}.html`;
if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
fs.renameSync(tempPath, finalPath);
console.log(`✅ Wrote fresh HTML: wacust/${id}.html`);
