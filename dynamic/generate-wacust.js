// dynamic/generate-wacust.js

const fs = require('fs');

// Load JSON data
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Loop through IDs 1 to 30
for (let id = 1; id <= 30; id++) {
  const product = data.images.find(img => img.id === id);
  if (!product || (!product.name && !product.description)) continue;

  const htmlPath = `dynamic/wacust/${id}.html`;

  const timestamp = Date.now();
  let html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <meta property="og:title" content="${product.name}">
    <meta property="og:description" content="${product.description}">
    <meta property="og:image" content="https://www.sellinseconds.in/dynamic/images/${id}.webp?v=${timestamp}">
    <meta property="og:image:secure_url" content="https://www.sellinseconds.in/dynamic/images/${id}.webp?v=${timestamp}">
    <meta http-equiv="refresh" content="0; URL=/dynamic/buygallery.html">
    <script>
      localStorage.setItem("scrollToProduct", "${id}");
      location.href = "/dynamic/buygallery.html";
    </script>
  </head>
  <body>
    Redirecting to Product ${id}...
    <!-- Updated at ${new Date().toISOString()} -->
  </body>
</html>`;

  fs.writeFileSync(htmlPath, html);
  console.log(`✅ Updated wacust/${id}.html`);
}