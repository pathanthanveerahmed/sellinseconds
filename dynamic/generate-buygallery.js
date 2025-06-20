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
const active = data.active || 1;
const sequence = data.sequences?.[active - 1] || [];

// Create image map for lookup
const imageMap = {};
data.images.forEach(img => {
  imageMap[img.id] = img;
});

// Read template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Get valid cards in sequence order
const validCards = sequence.map(id => {
  const item = imageMap[id];
  return item && item.name && item.filename ? item : null;
}).filter(Boolean);

// Top card for OG
const top = validCards[0] || data.images.find(img => img.name && img.filename);
const topTitle = top?.name || "Buy Certified Device";
const topDesc = top?.description || "Trusted Pre-owned Devices at Best Prices";
const topFilename = top?.filename || "og.png";
const priceMatch = topTitle.match(/Rs\.?\s*(\d+)/i);
const price = priceMatch ? priceMatch[1] : "0";

// Generate cards in sequence order
const cardsHTML = sequence.map(id => {
  const item = imageMap[id];
  if (!item || !item.name || !item.filename) return '';
  
  const badge = (item.id === active) ? `<span class="badge">Newly Added</span>` : "";
  const arrowText = (item.id === active)
    ? `<span class="arrow-text">More ⬇️</span>`
    : (item.id !== 30 ? `<span class="arrow-text">⬇️ More ⬆️</span>` : "");

  return `
    <div class="card" data-id="${item.id}">
      <div class="img-wrapper">
        ${badge}
        <img src="/dynamic/images/${item.filename}" alt="Buy ${item.name} on SellInSeconds" loading="lazy" />
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons-row">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Interested?
        </a>
        ${arrowText}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Inject data
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topTitle)
  .replace(/{{TOP_DESC}}/g, topDesc)
  .replace(/{{TOP_FILENAME}}/g, topFilename)
  .replace(/{{PRICE}}/g, price);

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", validCards.length, "cards.");