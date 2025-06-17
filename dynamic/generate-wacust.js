const fs = require("fs");
const path = require("path");

// Load data
const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;
// Read HTML template
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

// Temp and final directories
const tempDir = "dynamic/wacust-temp";
const finalDir = "dynamic/wacust";

// 1. Clean and recreate temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// 2. Generate HTML files into temp
for (let i = 1; i <= 30; i++) {
  const item = images.find(img => parseInt(img.id, 10) === i);
  if (!item) continue;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  const filename = item.filename || "og.png";

  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, filename)
    .replace(/{{PAGE}}/g, i);

  fs.writeFileSync(path.join(tempDir, `${i}.html`), html, "utf8");
  console.log(`✅ Generated ${tempDir}/${i}.html`);
}

// 3. Remove old final directory
if (fs.existsSync(finalDir)) {
  fs.rmSync(finalDir, { recursive: true, force: true });
}

// 4. Move temp to final
fs.renameSync(tempDir, finalDir);
console.log("✅ Swapped temp → wacust directory");
