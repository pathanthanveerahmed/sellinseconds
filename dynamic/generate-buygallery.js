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

// Top card for OG preview
const top = images.find(item => item.id === active && item.filename);

// Generate each card
const cardsHTML = images.map(item => {
  if (!item.name || !item.filename) return ''; // skip incomplete

  const isActive = item.id === active;
  const badge = isActive
    ? `<span style="background: red; color: white; font-size: 12px; padding: 2px 6px; border-radius: 6px; margin-left: 10px;">Newly Added</span>`
    : '';

  return `
    <div class="card" data-id="${item.id}">
      <img src="dynamic/images/${item.filename}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}${badge}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons" style="display: flex; gap: 1rem;">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Reply
        </a>
        <a href="https://wa.me/?text=Check more deals 👇👇 https://www.sellinseconds.in/dynamic/buygallery.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Inject cards + meta
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, top?.name || "SellInSeconds Deals")
  .replace(/{{TOP_DESC}}/g, top?.description || "Buy and sell smartphones, laptops and more")
  .replace(/{{TOP_FILENAME}}/g, top?.filename || "og.png");

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", images.length, "cards.");