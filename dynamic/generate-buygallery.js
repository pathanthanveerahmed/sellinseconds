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

// Generate each card
const cardsHTML = images.map(item => {
  if (!item.name || !item.filename) return ''; // skip incomplete entries
  return `
    <div class="card" data-id="${item.id}">
      <img src="dynamic/images/${item.filename}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">Share 🔽 More Devices Below</a>
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">🔼 More Devices 🔽</a>
      </div>
    </div>`;
}).join("\n");

// Pick top card for OG image (first complete card)
const topCard = images.find(item => item.name && item.filename) || {
  name: "SellInSeconds",
  description: "Buy & Sell Certified Devices",
  filename: "og.png"
};

// Inject SEO + cards into template
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topCard.name)
  .replace(/{{TOP_DESC}}/g, topCard.description)
  .replace(/{{TOP_FILENAME}}/g, topCard.filename);

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", images.length, "cards.");