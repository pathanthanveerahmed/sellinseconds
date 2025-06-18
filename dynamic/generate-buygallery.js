// File: dynamic/generate-buygallery.js
const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";

// Load and parse data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}
const images = data.images || [];
const active = data.active || 1;

// Read the HTML template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Get the top (active) card's data for OG meta
const topCard = images.find(item => item.id === active && item.filename);
const TOP_TITLE = topCard?.name || "SellInSeconds";
const TOP_DESC = topCard?.description || "Certified devices, instant deals.";
const TOP_FILENAME = topCard?.filename || "og.png";

// Generate each card
const cardsHTML = images.map((item, index) => {
  if (!item.name || !item.filename) return '';

  const id = item.id;
  const name = item.name;
  const desc = item.description;
  const isTop = id === active;
  const isBottom = index === images.length - 1;

  const badge = isTop
    ? '<span class="badge">Newly Added</span>'
    : '';

  const arrowText = isTop
    ? 'More ⬇️'
    : isBottom
      ? ''
      : '⬇️ More ⬆️';

  return `
    <div class="card" data-id="${id}">
      <div class="img-wrapper">
        ${badge}
        <img src="https://www.sellinseconds.in/dynamic/images/${item.filename}" alt="${name}" loading="lazy" />
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons-row" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" height="20" /> Interested?
        </a>
        ${arrowText ? `<span class="arrow-text">${arrowText}</span>` : ''}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" height="20" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Inject cards + top meta data + active scroll ID
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace("{{TOP_TITLE}}", TOP_TITLE)
  .replace("{{TOP_DESC}}", TOP_DESC)
  .replace("{{TOP_FILENAME}}", TOP_FILENAME);

fs.writeFileSync(outputPath, output, "utf8");
console.log(`✅ buygallery.html regenerated with ${images.length} cards. Active: ${active}`);