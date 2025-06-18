const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const imgDir = "dynamic/images";
const tempDir = "dynamic/wacust-temp";
const finalDir = "dynamic/wacust";

if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

(data.images || []).forEach(img => {
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
console.log("✅ WACUST pages regenerated successfully");
