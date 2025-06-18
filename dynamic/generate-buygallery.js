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
const cardsHTML = images.map((item, idx) => {
  if (!item.name || !item.filename) return ''; // skip incomplete entries
  const id = item.id;
  const name = item.name;
  const desc = item.description;
  const imgSrc = `https://www.sellinseconds.in/dynamic/images/${item.filename}`;

  const isActive = id === active;
  const isLast = idx === images.length - 1;

  const badge = isActive
    ? `<span class="badge">Newly Added</span>`
    : "";

  const centerText = isLast
    ? ""
    : (isActive ? "More Devices Below ⬇️" : "⬆️ More Devices ⬇️");

  return `
    <div class="card" data-id="${id}">
      <div class="img-wrapper">
        ${badge}
        <img src="${imgSrc}" alt="${name}" loading="lazy" />
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons-row">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Interested?
        </a>
        ${centerText ? `<span class="arrow-text">${centerText}</span>` : ""}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">
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