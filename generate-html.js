const fs = require('fs');

// Load data.json
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Find the matching sequence using "active"
const sequence = data.sequences.find(seq => seq[0] === data.active);

// Fallback if no matching sequence found
const topId = sequence && sequence.length ? sequence[0] : data.images[0].id;

// Find the matching image from images[]
const topItem = data.images.find(img => img.id === topId) || {
  name: 'Newly Added Device',
  description: 'Latest certified pre-owned devices at SellInSeconds!',
};

// Load HTML template
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');

// Replace placeholders
template = template
  .replace(/{{TITLE}}/g, topItem.name || 'Newly Added Device')
  .replace(/{{DESCRIPTION}}/g, topItem.description || 'Latest certified pre-owned devices at SellInSeconds!')
  .replace(/{{IMAGE}}/g, `${topId}.webp`);

// Write final HTML
fs.writeFileSync('dynamic/buygallery.html', template);

console.log(`✅ buygallery.html generated with top image ID ${topId}`);