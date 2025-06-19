// File: dynamic/generate-one-wacust.js
const fs = require("fs");

const templatePath = "dynamic/1to30-template.html";
const dataPath = "dynamic/data.json";
const outputDir = "dynamic/wacust-temp";

// Ensure output directory exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}

const images = data.images || [];
const sequences = data.sequences || [];

let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read 1to30-template.html:", err);
  process.exit(1);
}

sequences.forEach((sequence, i) => {
  const targetId = i + 1;
  const cards = sequence.map(id => {
    const item = images.find(x => x.id === id);
    if (!item || !item.name || !item.filename) return '';
    return `
      <div class="card" id="product-${item.id}">
        <picture>
          <img src="/dynamic/images/${item.filename}" alt="Buy ${item.name} on SellInSeconds" />
        </picture>
        <div class="card-description">
          <div class="card-title">${item.name}</div>
          <div class="card-detail">${item.description}</div>
        </div>
      </div>`;
  }).join("\n");

  const first = images.find(x => x.id === targetId);
  const html = template
    .replace(/{{TITLE}}/g, first?.name || "SellInSeconds")
    .replace(/{{DESCRIPTION}}/g, first?.description || "Best Used Phones, Tablets, Laptops")
    .replace(/{{FILENAME}}/g, first?.filename || "og.png")
    .replace(/{{PRICE}}/g, (first?.name.match(/Rs\.?\s*(\d+)/i)?.[1] || "0"))
    .replace("{{CARDS}}", cards);

  fs.writeFileSync(`${outputDir}/${targetId}.html`, html, "utf8");
  console.log(`✅ Generated wacust/${targetId}.html`);
});

// Final atomic move
const finalDir = "dynamic/wacust";
fs.rmSync(finalDir, { recursive: true, force: true });
fs.renameSync(outputDir, finalDir);
console.log("🚀 All WACUST files updated via atomic rename.");