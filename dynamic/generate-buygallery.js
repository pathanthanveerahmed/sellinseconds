// File: dynamic/generate-buygallery.js
const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";

// Read data
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}
const images = (data.images || []).slice().sort((a, b) => b.id - a.id);
const active = data.active || 1;

// Read template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Top card for OG
const top = images.find(img => img.id === active && img.name && img.filename) || images.find(img => img.name && img.filename);
const topTitle = top?.name || "Buy Certified Device";
const topDesc = top?.description || "Trusted Pre-owned Devices at Best Prices";
const topFilename = top?.filename || "og.png";
const priceMatch = topTitle.match(/Rs\.?\s*(\d+)/i);
const price = priceMatch ? priceMatch[1] : "0";

// Generate cards (in sequence as per JSON, not sort)
const cardsHTML = images.map(item => {
  if (!item.name || !item.filename) return '';
  const id = item.id;
  const name = item.name;
  const desc = item.description;
  const imgSrc = `/dynamic/images/${item.filename}`;
  const badge = (id === active) ? `<span class="badge">Newly Added</span>` : "";
  const arrowText = (id === active)
    ? `<span class="arrow-text">More ⬇️</span>`
    : (id !== 30 ? `<span class="arrow-text">⬇️ More ⬆️</span>` : "");

  return `
    <div class="card" data-id="${id}">
      <div class="img-wrapper">
        ${badge}
        <img src="${imgSrc}" alt="Buy ${name} on SellInSeconds" loading="lazy" />
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons-row">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Interested?
        </a>
        ${arrowText}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Inject data
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace("{{TOP_TITLE}}", topTitle)
  .replace("{{TOP_DESC}}", topDesc)
  .replace("{{TOP_FILENAME}}", topFilename)
  .replace("{{PRICE}}", price);

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", images.length, "cards.");