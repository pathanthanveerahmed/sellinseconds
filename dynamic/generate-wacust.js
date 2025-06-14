const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync("dynamic/data.json", "utf8"));
const outDir = path.join("dynamic", "wacust");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

data.images.forEach(img => {
  const { id, name = "SellInSeconds Product", description = "" } = img;
  if (!id || id < 1 || id > 30) return;

  const safeTitle = name.replace(/"/g, "&quot;");
  const safeDesc = description.replace(/"/g, "&quot;");
  const imageUrl = `https://www.sellinseconds.in/dynamic/images/${id}.webp`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />

  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">

  <!-- Open Graph -->
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:type" content="product" />
  <meta property="og:url" content="https://www.sellinseconds.in/dynamic/wacust/${id}.html" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="canonical" href="https://www.sellinseconds.in/dynamic/buygallery.html" />

  <!-- Redirect logic -->
  <meta http-equiv="refresh" content="2; URL=/dynamic/buygallery.html" />
  <script>
    localStorage.setItem("scrollToProduct", "${id}");
    setTimeout(() => {
      window.location.href = "/dynamic/buygallery.html";
    }, 2000);
  </script>
</head>
<body>
  <p>Redirecting to product #${id}... Please wait.</p>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${id}.html`), html, "utf8");
});

console.log("✅ All wacust redirect pages generated successfully.");