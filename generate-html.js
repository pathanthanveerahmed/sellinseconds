const fs = require('fs');

// Load the current data.json
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Get the active sequence
const sequence = data.sequences.find(seq => seq[0] === data.active);
const topId = sequence && sequence.length ? sequence[0] : data.images[0].id;

// Get the top product info for meta tags
const topItem = data.images.find(img => img.id === topId) || {
  name: 'Newly Added Device',
  description: 'Latest certified pre-owned devices at SellInSeconds!',
};

// Generate the product cards
let cardsHTML = '';
sequence.forEach(id => {
  const img = data.images.find(image => image.id === id) || {};
  const nameText = img.name || '';
  const descriptionText = img.description || '';

  cardsHTML += `
    <div class="card" id="product-${id}">
      <picture>
        <source srcset="/dynamic/images/${id}.webp" type="image/webp">
        <img src="/dynamic/images/${id}.jpg" alt="${nameText}" loading="lazy">
      </picture>
      <div class="card-description">
        <div class="card-title">${nameText}</div>
        <div class="card-detail">${descriptionText}</div>
      </div>
    </div>
  `;
});

// Load the HTML template
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');

// Replace placeholders with actual content
template = template
  .replace(/{{TITLE}}/g, topItem.name)
  .replace(/{{DESCRIPTION}}/g, topItem.description)
  .replace(/{{IMAGE}}/g, `${topId}.webp`)
  .replace(/{{CARDS}}/g, cardsHTML);

// Write the final output to buygallery.html
fs.writeFileSync('dynamic/buygallery.html', template);

console.log(`✅ buygallery.html generated with top image ID ${topId}`);