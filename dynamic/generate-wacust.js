const fs = require('fs');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));
const htmlDir = 'dynamic/wacust';

if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });

for (let id = 1; id <= 30; id++) {
  const item = data.images.find(i => i.id === id);
  if (!item || !item.name || !item.description) continue;

  const content = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="0; URL=/dynamic/buygallery.html" />
    <script>
      localStorage.setItem("scrollToProduct", "${id}");
      location.href = "/dynamic/buygallery.html";
    </script>
  </head>
  <body>
    <!-- Updated at ${new Date().toISOString()} -->
    Redirecting to product ${id}...
  </body>
</html>`.trim();

  fs.writeFileSync(path.join(htmlDir, `${id}.html`), content, 'utf8');
}

console.log("✅ WACUST HTML files updated.");
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));
const galleryUrl = "https://www.sellinseconds.in/dynamic/buygallery.html";

for (let i = 1; i <= 30; i++) {
  const item = data.images.find(img => img.id === i);

  // Only generate if item exists and has name
  if (item && item.name && item.description) {
    const title = item.name;
    const description = item.description;
    const image = `https://www.sellinseconds.in/dynamic/images/${i}.webp`;
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:type" content="product">
    <meta property="og:url" content="${galleryUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${galleryUrl}" />
    <script>
      localStorage.setItem("scrollToProduct", "${i}");
      location.href = "${galleryUrl}";
    </script>
  </head>
  <body>
    Redirecting to SellInSeconds product #${i}...
    <!-- Updated at ${new Date().toISOString()} -->
  </body>
</html>`;

    fs.writeFileSync(`dynamic/wacust/${i}.html`, html);
  }
}
console.log("✅ All wacust/*.html files regenerated");