const fs = require("fs");
const path = require("path");

const id = parseInt(process.argv[2]); // read ID from command line
if (!id || isNaN(id)) {
  console.error("❌ Please provide a valid product ID as argument.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const item = images.find(img => parseInt(img.id) === id);
if (!item) {
  console.error(`❌ No product found with ID ${id}`);
  process.exit(1);
}

const title = item.name || "Device on SellInSeconds";
const desc = item.description || "Certified device available";
const filename = item.filename || "og.png";

const html = template
  .replace(/{{TITLE}}/g, title)
  .replace(/{{DESCRIPTION}}/g, desc)
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PAGE}}/g, id);

fs.writeFileSync(`dynamic/wacust/${id}.html`, html, "utf8");
console.log(`✅ Generated dynamic/wacust/${id}.html`);