const fs = require('fs');

// Load JSON data
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Loop through IDs 1 to 30
for (let id = 1; id <= 30; id++) {
  const product = data.images.find(img => img.id === id);
  if (!product || (!product.name && !product.description)) continue;

  const htmlPath = `dynamic/wacust/${id}.html`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <meta property="og:title" content="${product.name}">
    <meta property="og:description" content="${product.description}">
    <meta property="og:image" content="https://www.sellinseconds.in/dynamic/images/${id}.webp">
    <meta property="og:image:secure_url" content="https://www.sellinseconds.in/dynamic/images/${id}.webp">
    <meta property="og:url" content="https://www.sellinseconds.in/dynamic/wacust/${id}.html">
    <meta property="og:type" content="product">
    <meta property="fb:app_id" content="112233445566778"> <!-- Replace with your real fb:app_id -->

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
  console.log(`✅ Generated dynamic/wacust/${id}.html`);
}