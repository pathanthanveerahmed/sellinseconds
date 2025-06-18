// File: dynamic/generate-buygallery.js
const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";

let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}
const images = data.images || [];
const active = data.active || 1;

// Read template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read template:", err);
  process.exit(1);
}

const cardsHTML = images.map(item => {
  if (!item.name || !item.filename) return '';

  const badge = item.id === active ? `<div class="badge">Newly Added</div>` : "";

  return `
    <div class="card" data-id="${item.id}">
      ${badge}
      <img src="dynamic/images/${item.filename}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" />
          Share on WhatsApp
        </a>
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/buygallery.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" />
          Browse More Devices
        </a>
      </div>
    </div>`;
}).join("\n");

const topItem = images.find(item => item.id === active && item.name && item.filename);
const topTitle = topItem?.name || "SellInSeconds";
const topDesc = topItem?.description || "Buy and Sell Smartphones, Laptops, Tablets";
const topFilename = topItem?.filename || "og.png";

const finalHTML = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topTitle)
  .replace(/{{TOP_DESC}}/g, topDesc)
  .replace(/{{TOP_FILENAME}}/g, topFilename);

fs.writeFileSync(outputPath, finalHTML, "utf8");
console.log("✅ buygallery.html regenerated");