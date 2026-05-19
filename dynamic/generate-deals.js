const fs = require("fs");

const dataPath = "dynamic/data.json";
const templatePath = "dynamic/deals-template.html";
const outputPath = "deals/index.html";

// Ensure deals folder exists
if (!fs.existsSync("deals")) {
  fs.mkdirSync("deals", { recursive: true });
}

// Step 1: Load data.json
let data;

try {

  data =
    JSON.parse(
      fs.readFileSync(dataPath, "utf8")
    );

} catch (err) {

  console.error(
    "❌ Failed to read data.json:",
    err
  );

  process.exit(1);
}

const active =
  data.active || 1;

const sequence =
  Array.isArray(data.sequences?.[active - 1])
    ? data.sequences[active - 1]
    : [];

// Step 2: Build image map
const imageMap = {};

(data.images || []).forEach(img => {

  if (img.name && img.filename) {

    imageMap[parseInt(img.id)] = img;

  }

});

// Step 3: Filter valid cards
const validCards =
  sequence
    .map(id => imageMap[id])
    .filter(Boolean);

// Step 4: OG Metadata
const top =
  validCards[0] ||
  Object.values(imageMap)[0] ||
  {};

const topTitle =
  top.name ||
  "Buy Certified Device";

const topDesc =
  top.description ||
  "Trusted Pre-owned Devices at Best Prices";

const topFilename =
  top.filename ||
  "og.png";

const priceMatch =
  topTitle.match(/Rs\.?\s*(\d+)/i);

const price =
  priceMatch
    ? priceMatch[1]
    : "0";

// Step 5: Generate cards HTML
const cardsHTML = validCards.map(item => {

  const badge =
    item.isNew
      ? `<span class="badge">NEW</span>`
      : '';

  const arrowText =
    (
      item.id === top.id &&
      validCards.length > 1
    )
      ? '<span class="arrow-text">⬇️</span>'
      : '';

  return `
    <div class="card" id="card-${item.id}" data-id="${item.id}">

      <div class="img-wrapper">

        ${badge}

        <img
          src="/dynamic/images/${item.filename}"
          alt="Buy ${item.name} on SellInSeconds"
        />

      </div>

      <h3>

        ${item.name
          .replace(/,\s*(₹)/, ' ₹')
          .replace(/(\d+)\s+%/g, '$1%')}

      </h3>

      <p>${item.description}</p>

    <div class="whatsapp-buttons-row">

  <a
    class="single-wa-btn"
    href="https://wa.me/919886566379?text=Hi%2C%20I%27m%20interested%20in%20this%20item%3A%20https%3A%2F%2Fwww.sellinseconds.in%2Fdynamic%2Fwacust%2F${item.id}.html"
    target="_blank"
  >

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    />

    Interested?

  </a>

</div>

    </div>`;

}).join("\n");

// Step 6: Read template
let template;

try {

  template =
    fs.readFileSync(
      templatePath,
      "utf8"
    );

} catch (err) {

  console.error(
    "❌ Failed to read deals-template.html:",
    err
  );

  process.exit(1);
}

// Step 7: Inject values
const output = template
  .replace("{{CARDS}}", cardsHTML)
  .replace("{{ACTIVE_ID}}", active)
  .replace(/{{TOP_TITLE}}/g, topTitle)
  .replace(/{{TOP_DESC}}/g, topDesc)
  .replace(/{{TOP_FILENAME}}/g, topFilename)
  .replace(/{{PRICE}}/g, price);

// Step 8: Write file
try {

  fs.writeFileSync(
    outputPath,
    output
  );

  console.log(
    `✅ deals generated successfully at ${outputPath}`
  );

} catch (err) {

  console.error(
    "❌ Failed to write deals/index.html:",
    err
  );

  process.exit(1);

}