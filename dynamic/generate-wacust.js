const fs = require("fs");
const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;

const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

for (let i = 1; i <= 30; i++) {
  const item = images.find(img => parseInt(img.id) === i);
  if (!item) continue;

  const title = item.name || "Device on SellInSeconds";
  const desc = item.description || "Certified device available";
  const filename = item.filename || `${i}.webp`;
  const html = template
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{FILENAME}}/g, filename)
    .replace(/{{PAGE}}/g, i);

  fs.writeFileSync(`dynamic/wacust/${i}.html`, html, "utf8");
  console.log(`✅ Generated wacust/${i}.html`);
}