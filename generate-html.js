const fs = require('fs');

// Read your data.json file
const data = JSON.parse(fs.readFileSync('dynamic/data.json', 'utf8'));

// Sort by ID descending and pick the top product
const topItem = data.sort((a, b) => b.id - a.id)[0];

// Load the HTML template
let template = fs.readFileSync('dynamic/buygallery-template.html', 'utf8');

// Replace placeholders
template = template
  .replace(/{{TITLE}}/g, topItem.name)
  .replace(/{{DESCRIPTION}}/g, topItem.description)
  .replace(/{{IMAGE}}/g, `${topItem.id}.webp`);

// Write the new buygallery.html
fs.writeFileSync('dynamic/buygallery.html', template);
