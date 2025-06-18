const fs = require("fs");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/buygallery-template.html", "utf8");

const cards = data.images
  .filter(item => item.name && item.filename)
  .map(item => {
    return `
      <div class="card" data-id="${item.id}">
        <img src="dynamic/images/${item.filename}" alt="${item.name}" loading="lazy" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="whatsapp-buttons">
          <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">Share 🔽 More Devices Below</a>
          <a href="https://wa.me/?text=https://www.sellinseconds.in/dynamic/wacust/${item.id}.html" target="_blank">🔼 More Devices 🔽</a>
        </div>
      </div>
    `;
  }).join("\n");

const html = template
  .replace("{{CARDS}}", cards)
  .replace("{{ACTIVE_ID}}", data.active || 1);

fs.writeFileSync("dynamic/buygallery.html", html, "utf8");
console.log("✅ buygallery.html generated");
