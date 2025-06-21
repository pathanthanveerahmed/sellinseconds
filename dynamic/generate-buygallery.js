const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/buygallery-template.html";
const outputPath = "dynamic/buygallery.html";

// Step 1: Load data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (err) {
  console.error("❌ Failed to read data.json:", err);
  process.exit(1);
}

const active = data.active || 1;
const sequence = Array.isArray(data.sequences?.[active - 1]) ? data.sequences[active - 1] : [];

// Step 2: Build image map
const imageMap = {};
(data.images || []).forEach(img => {
  if (img.name && img.description && img.filename) {
    imageMap[parseInt(img.id)] = img;
  }
});

// Step 3: Filter valid cards from the active sequence
const validCards = sequence.map(id => imageMap[id]).filter(Boolean);

// Step 4: OG Metadata (top card)
const top = validCards[0] || Object.values(imageMap)[0] || {};
const topTitle = top.name || "Buy Certified Device";
const topDesc = top.description || "Trusted Pre-owned Devices at Best Prices";
const topFilename = top.filename || "og.png";
const priceMatch = topTitle.match(/Rs\.?\s*(\d+)/i);
const price = priceMatch ? priceMatch[1] : "0";


// Step 5: Generate HTML cards
const cardsHTML = validCards.map(item => {
  const badge = item.isNew ? `<span class="badge">NEW</span>` : '';
  const arrowText = (item.id === top.id && validCards.length > 1) ? '<span class="arrow-text">⬆️</span>' : '';

  return `
    <div class="card" data-id="${item.id}">
      <div class="img-wrapper">
        ${badge}
        <img src="/dynamic/images/${item.filename}" alt="Buy ${item.name} on SellInSeconds" />
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons-row">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" /> Interested?
        </a>
        ${arrowText}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Step 6: Read the HTML template
let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read buygallery-template.html:", err);
  process.exit(1);
}

// Step 7: Inject values into template
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topTitle)
  .replace(/{{TOP_DESC}}/g, topDesc)
  .replace(/{{TOP_FILENAME}}/g, topFilename)
  .replace(/{{PRICE}}/g, price); // Replace all occurrences

// Step 8: Write the output HTML file
try {
  fs.writeFileSync(outputPath, output);
  console.log(`✅ buygallery.html generated successfully at ${outputPath}`);
} catch (err) {
  console.error("❌ Failed to write buygallery.html:", err);
  process.exit(1);
}
