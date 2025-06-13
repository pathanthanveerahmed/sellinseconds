const fs = require('fs');

// Load data.json
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Get active sequence
const sequence = data.sequences.find(seq => seq[0] === data.active);
const topId = sequence?.[0] || data.images[0].id;

// Get top image data
const topItem = data.images.find(img => img.id === topId) || {
  name: 'Newly Added Device',
  description: 'Latest certified pre-owned devices at SellInSeconds!',
};

// Generate image cards HTML (gold standard layout preserved)
let cardsHTML = '';
sequence.forEach((id, index) => {
  const img = data.images.find(i => i.id === id) || {};
  const nameText = img.name || '';
  const descriptionText = img.description || '';

  const badge = index === 0 ? `<div class="new-badge">NEWLY ADDED</div>` : '';
  const borderClass = index === 0 ? 'highlight-top-card' : '';
  const animateClass = index === 0 ? 'scroll-animate' : '';

  cardsHTML += `
    <div class="card ${borderClass} ${animateClass}">
      <figure>
        <picture>
          <source srcset="/dynamic/images/${id}.webp" type="image/webp">
          <img src="/dynamic/images/${id}.jpg" alt="${nameText}" loading="lazy">
        </picture>
        ${badge}
        <figcaption>
          <div class="card-title">${nameText}</div>
          <div class="card-description"><strong>${descriptionText}</strong></div>
          <div class="card-buttons">
            <a href="tel:+917305800091" class="call-now">📞 Call Now</a>
            <a href="https://wa.me/917305800091?text=I want to buy ${encodeURIComponent(nameText)}" class="whatsapp-button">💬 WhatsApp</a>
          </div>
        </figcaption>
      </figure>
    </div>
  `;
});

// Load HTML template
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');

// Replace placeholders
template = template
  .replace(/{{TITLE}}/g, topItem.name)
  .replace(/{{DESCRIPTION}}/g, topItem.description)
  .replace(/{{IMAGE}}/g, `${topId}.webp`)
  .replace(/{{CARDS}}/g, cardsHTML);

// Write to final file
fs.writeFileSync('dynamic/buygallery.html', template);

console.log(`✅ buygallery.html generated with top ID ${topId}`);