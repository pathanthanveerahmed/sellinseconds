// File: dynamic/generate-buygallery.js
const fs = require("fs");
const path = require("path");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";
const imageDir = "dynamic/images";

// Load and parse data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  console.log("✅ Loaded data.json");
} catch (err) {
  console.error("❌ Failed to read data.json:", err.message);
  process.exit(1);
}

const images = data.images || [];
const active = data.active || 1;

// Read HTML template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
  console.log("✅ Loaded buygallery-template.html");
} catch (err) {
  console.error("❌ Failed to read template:", err.message);
  process.exit(1);
}

// Generate HTML cards only for valid image entries
const cardsHTML = images
  .filter(item => item.id && item.filename && fs.existsSync(path.join(imageDir, item.filename)))
  .map(item => {
    const id = item.id;
    const title = item.name || "Untitled";
    const desc = item.description || "";
    const filename = item.filename;

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

console.log(`🧩 Cards Generated: ${cardsHTML ? images.length : 0}`);

// Inject cards + active scroll
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active);

// Write to output HTML
try {
  fs.writeFileSync(outputPath, output, "utf8");
  console.log("✅ buygallery.html written successfully");
} catch (err) {
  console.error("❌ Failed to write buygallery.html:", err.message);
  process.exit(1);
}