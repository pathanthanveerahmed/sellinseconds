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
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Find top card with valid name + filename
const topCard = images.find(item => item.name && item.filename) || {
  name: "SellInSeconds – Best Used Phones",
  description: "Certified Devices with Warranty – Apple, Samsung, Dell and more.",
  filename: "og.png"
};

// Build cards HTML
const cardsHTML = images.map(item => {
  if (!item.name || !item.filename) return '';
  return `
    <div class="card" data-id="${item.id}">
      <img src="dynamic/images/${item.filename}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">📱 Share this Device</a>
        <a href="https://wa.me/?text=Check more deals 👇👇 https://www.sellinseconds.in/dynamic/buygallery.html" target="_blank">📦 Browse More Devices</a>
      </div>
    </div>`;
}).join("\n");

// Inject dynamic content
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topCard.name)
  .replace(/{{TOP_DESC}}/g, topCard.description)
  .replace(/{{TOP_FILENAME}}/g, topCard.filename);

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", images.length, "cards. OG image =", topCard.filename);