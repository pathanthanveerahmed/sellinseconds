const fs = require("fs");
const path = require("path");

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

// Read template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Generate HTML for all cards
const cardsHTML = images.map((item, index) => {
  const id = item.id;
  const title = item.name || "Untitled";
  const desc = item.description || "";
  const filename = item.filename || "og.png";

  return `
    <div class="card" data-id="${id}">
      <img src="dynamic/images/${filename}" alt="${title}" loading="lazy" />
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">Share 🔽 More Devices Below</a>
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">🔼 More Devices 🔽</a>
      </div>
    </div>
  `;
}).join("\n");

// Inject into template
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active);

// Write output HTML
fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated successfully");
