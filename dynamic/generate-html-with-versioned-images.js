const fs = require("fs");
const path = require("path");

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

let template;
try {
  template = fs.readFileSync(templatePath, "utf8");
} catch (err) {
  console.error("❌ Failed to read template:", err);
  process.exit(1);
}

const active = data.active || 1;
const cards = (data.images || []).map(item => {
  const id = item.id;
  const title = item.name || "Untitled";
  const desc = item.description || "";
  const file = item.filename || "og.png";

  return `
    <div class="card" data-id="${id}">
      <img src="dynamic/images/${file}" alt="${title}" loading="lazy" />
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="whatsapp-buttons">
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">Share 🔽 More Devices Below</a>
        <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${id}.html" target="_blank">🔼 More Devices 🔽</a>
      </div>
    </div>`;
}).join("\n");

const result = template.replace("{{CARDS}}", cards).replace("{{ACTIVE_ID}}", active);
fs.writeFileSync(outputPath, result, "utf8");
console.log("✅ buygallery.html regenerated");
