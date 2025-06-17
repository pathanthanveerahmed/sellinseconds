const fs = require("fs");
const https = require("https");
const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const images = data.images;
const template = fs.readFileSync("dynamic/1to30-template.html", "utf8");

function checkImageExists(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

(async () => {
  for (let i = 1; i <= 30; i++) {
    const item = images.find(img => parseInt(img.id) === i);
    if (!item) continue;

    const title = item.name || "Device on SellInSeconds";
    const desc = item.description || "Certified device available";
    const fallback = "og.png";
    const filename = item.filename || fallback;
    const remoteURL = `https://www.sellinseconds.in/dynamic/images/${filename}`;
    const isAvailable = await checkImageExists(remoteURL);
    const finalFile = isAvailable ? filename : fallback;

    const html = template
      .replace(/{{TITLE}}/g, title)
      .replace(/{{DESCRIPTION}}/g, desc)
      .replace(/{{FILENAME}}/g, finalFile)
      .replace(/{{PAGE}}/g, i);

    fs.writeFileSync(`dynamic/wacust/${i}.html`, html, "utf8");
    console.log(`✅ Generated wacust/${i}.html with ${isAvailable ? "actual image" : "fallback"}`);
  }
})();
