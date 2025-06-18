// File: dynamic/generate-one-wacust.js
const fs = require("fs");
const path = require("path");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/1to30-template.html";
const tempDir = "dynamic/wacust-temp";
const finalDir = "dynamic/wacust";

// Read data and template
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");

const activeId = data.active;
const sequence = data.sequences[activeId - 1] || [];

const htmlCards = sequence.map(pid => {
  const item = data.images.find(i => i.id === pid);
  if (!item || !item.name || !item.filename) return "";

  const badge = pid === activeId
    ? `<span class="badge">Newly Added</span>` : "";

  const arrowText =
    pid === activeId
      ? `<span class="arrow-text">More Devices Below ⬇️</span>`
      : (pid !== 30 ? `<span class="arrow-text">⬇️ More Devices ⬆️</span>` : "");

  return `
    <div class="card" data-id="${pid}">
      <div class="img-wrapper">
        ${badge}
        <img src="https://www.sellinseconds.in/dynamic/images/${item.filename}" alt="Buy ${item.name} on SellInSeconds" loading="lazy" />
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="whatsapp-buttons-row">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${pid}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Interested?
        </a>
        ${arrowText}
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${pid}.html" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" /> Edit & Share
        </a>
      </div>
    </div>`;
}).join("\n");

// Get top card info for OG
const top = data.images.find(i => i.id === activeId && i.name && i.filename) || data.images.find(i => i.name && i.filename);
const title = top?.name || "Buy Certified Device";
const description = top?.description || "Trusted Pre-owned Devices at Best Prices";
const filename = top?.filename || "og.png";
const priceMatch = title.match(/Rs\.?\s*(\d+)/i);
const price = priceMatch ? priceMatch[1] : "0";

// Inject into HTML
const finalHTML = template
  .replace(/{{CARDS}}/g, htmlCards)
  .replace(/{{TITLE}}/g, title)
  .replace(/{{DESCRIPTION}}/g, description)
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PRICE}}/g, price)
  .replace("</body>", `
    <script>
      window.onload = () => {
        const el = document.querySelector('[data-id="${activeId}"]');
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => window.scrollBy(0, -60), 300);
        }
      };
    </script>
  </body>`);

// Write to temp then rename
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const tempFile = path.join(tempDir, `${activeId}.html`);
const finalFile = path.join(finalDir, `${activeId}.html`);

fs.writeFileSync(tempFile, finalHTML, "utf8");

if (fs.existsSync(finalFile)) fs.unlinkSync(finalFile);
fs.renameSync(tempFile, finalFile);

console.log(`✅ wacust/${activeId}.html generated successfully.`);