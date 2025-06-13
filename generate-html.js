const fs = require('fs');

// Load data.json
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Get active sequence (default fallback to images[0])
const sequence = data.sequences.find(seq => seq[0] === data.active);
const topId = sequence && sequence.length ? sequence[0] : data.images[0].id;

// Get top image details for OG/meta
const topItem = data.images.find(img => img.id === topId) || {
  name: 'Newly Added Device',
  description: 'Latest certified pre-owned devices at SellInSeconds!',
};

// Build the image card layout (preserves spacing and class structure)
let cardsHTML = '';
sequence.forEach((id, index) => {
  const img = data.images.find(image => image.id === id) || {};
  const nameText = img.name || '';
  const descriptionText = img.description || '';
  const isTop = index === 0;

  cardsHTML += `
    <div class="image-card ${isTop ? 'top-card' : ''}">
      ${isTop ? '<div class="new-badge">NEWLY ADDED</div>' : ''}
      <picture>
        <source srcset="/dynamic/images/${id}.webp" type="image/webp">
        <img src="/dynamic/images/${id}.jpg" alt="${nameText}" loading="lazy">
      </picture>
      <div class="card-description">
        <div class="card-title">${nameText}</div>
        <div class="card-detail">${descriptionText}</div>
        <button class="cta-button">Get Quote</button>
      </div>
    </div>
  `;
});

// Load template HTML
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');

// Replace meta tags and {{CARDS}}
template = template
  .replace(/{{TITLE}}/g, topItem.name)
  .replace(/{{DESCRIPTION}}/g, topItem.description)
  .replace(/{{IMAGE}}/g, `${topId}.webp`)
  .replace(/{{CARDS}}/g, cardsHTML);

// Write to final file
fs.writeFileSync('dynamic/buygallery.html', template);

console.log(`✅ buygallery.html generated with active ID ${topId}`);