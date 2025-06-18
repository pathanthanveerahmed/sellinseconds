const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

const finalDir = "dynamic/wacust-temp";
const outputDir = "dynamic/wacust";

if (fs.existsSync(finalDir)) fs.rmSync(finalDir, { recursive: true });
fs.mkdirSync(finalDir);

data.images.forEach(item => {
  const id = parseInt(item.id, 10);
  if (!id || !item.filename || !item.name) return;

  const html = template
    .replace(/{{TITLE}}/g, item.name)
    .replace(/{{DESCRIPTION}}/g, item.description)
    .replace(/{{FILENAME}}/g, item.filename)
    .replace(/{{PAGE}}/g, id);

  fs.writeFileSync(path.join(finalDir, `${id}.html`), html);
  console.log(`✅ Wrote ${id}.html`);
});

if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true });
fs.renameSync(finalDir, outputDir);
console.log("✅ All WACUST HTMLs regenerated");
