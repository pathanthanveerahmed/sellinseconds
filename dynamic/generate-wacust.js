const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

// Helper to delay execution
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  for (let i = 1; i <= 30; i++) {
    const item = images.find(img => parseInt(img.id) === i);
    if (!item) continue;

    const title = item.name || "Device on SellInSeconds";
    const desc = item.description || "Certified device available";

    // Versioned filename logic with retry check
    let filename = "og.png";
    if (item.filename) {
      const fullPath = path.join("dynamic/images", item.filename);
      for (let attempt = 0; attempt < 5; attempt++) {
        if (fs.existsSync(fullPath)) {
          filename = item.filename;
          break;
        }
        await sleep(1000); // wait 1s between retries
      }
    }

    const html = template
      .replace(/{{TITLE}}/g, title)
      .replace(/{{DESCRIPTION}}/g, desc)
      .replace(/{{FILENAME}}/g, filename)
      .replace(/{{PAGE}}/g, i);

    fs.writeFileSync(`dynamic/wacust/${i}.html`, html, "utf8");
    console.log(`✅ Generated wacust/${i}.html using image: ${filename}`);
  }
})();
