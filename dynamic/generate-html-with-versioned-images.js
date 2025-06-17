const fs = require('fs');

// Load data.json
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Find active sequence
const sequence = data.sequences.find(seq => seq[0] === data.active);
const topId = sequence?.[0] || data.images[0].id;

// Find top item
const topItem = data.images.find(img => img.id === topId) || {
  name: 'Newly Added Device',
  description: 'Latest certified pre-owned devices at SellInSeconds!',
};

// Extract price from name
const match = topItem.name?.match(/Rs\.?\s?(\d+)/i);
const priceValue = match ? match[1] : "0";
const filename = topItem.filename || `${topId}.webp`;

// Build cards
let cardsHTML = '';
sequence.forEach(id => {
  const img = data.images.find(image => image.id === id) || {};
  const nameText = img.name || '';
  const descriptionText = img.description || '';
  const file = img.filename || `${id}.webp`;

  cardsHTML += `
    <div class="card" id="product-${id}">
      <picture>
        <source srcset="/dynamic/images/${file}" type="image/webp">
        <img src="/dynamic/images/${file}" alt="${nameText}" loading="lazy">
      </picture>
      <div class="card-description">
        <div class="card-title">${nameText}</div>
        <div class="card-detail">${descriptionText}</div>
      </div>
    </div>`;
});

// Inject into template
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');
template = template
  .replace(/{{TITLE}}/g, topItem.name)
  .replace(/{{DESCRIPTION}}/g, topItem.description)
  .replace(/{{FILENAME}}/g, filename)
  .replace(/{{PRICE}}/g, priceValue)
  .replace(/{{CARDS}}/g, cardsHTML);

fs.writeFileSync('dynamic/buygallery.html', template, 'utf8');
console.log(`â buygallery.html generated with versioned image: ${filename}`);