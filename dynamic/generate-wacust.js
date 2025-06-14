const fs = require('fs');
const path = require('path');

// Load data
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));
const galleryPath = 'dynamic/wacust';

if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });

data.images.forEach(img => {
  const id = img.id;
  if (!id || !img.name || !img.description) return;

  const timestamp = new Date().toISOString();
  const title = img.name;
  const description = img.description;
  const image = `https://www.sellinseconds.in/dynamic/images/${id}.webp`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="https://www.sellinseconds.in/dynamic/wacust/${id}.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="robots" content="noindex, nofollow" />
    <script>
      localStorage.setItem("scrollToProduct", "${id}");
      location.href = "/dynamic/buygallery.html";
    </script>
  </head>
  <body>
    Redirecting...
    <!-- Updated at ${timestamp} -->
  </body>
</html>`;

  fs.writeFileSync(path.join(galleryPath, `${id}.html`), html);
});

console.log('✅ Wacust redirector HTMLs generated.');