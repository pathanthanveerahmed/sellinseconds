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
  const id = item.id;
  const name = item.name;
  const desc = item.description;
  const imgSrc = `dynamic/images/${item.filename}`;

  const badge = (id === active)
    ? `<span style="background:#ff4081;color:white;padding:2px 8px;border-radius:4px;font-size:12px;margin-left:10px;">Newly Added</span>`
    : "";

  return `
    <div class="card" data-id="${id}">
      <img src="${imgSrc}" alt="${name}" loading="lazy" />
      <h3>${name}${badge}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons-row" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank" style="display:flex;align-items:center;gap:5px;background:#25D366;padding:5px 10px;border-radius:5px;color:white;text-decoration:none;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Interested?
        </a>
        <span style="font-weight:bold;">⬆️⬇️ More Devices Below ⬇️⬆️</span>
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank" style="display:flex;align-items:center;gap:5px;background:#25D366;padding:5px 10px;border-radius:5px;color:white;text-decoration:none;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Inject cards + active ID
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active);

fs.writeFileSync(outputPath, output, "utf8");
console.log("✅ buygallery.html regenerated with", images.length, "cards.");