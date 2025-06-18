// File: dynamic/merge-temp-to-data.js
const fs = require("fs");
const path = require("path");

const tempPath = path.join(__dirname, "temp.json");
const dataPath = path.join(__dirname, "data.json");

function cleanUTF(str) {
  return (str || "").normalize("NFC");
}

function cleanEntry(entry) {
  return {
    id: parseInt(entry.id),
    name: cleanUTF(entry.name).trim(),
    description: cleanUTF(entry.description).trim(),
    filename: cleanUTF(entry.filename).trim()
  };
}

let temp, data;

try {
  temp = JSON.parse(fs.readFileSync(tempPath, "utf8"));
  console.log("📥 temp.json loaded:", temp);
} catch (err) {
  console.error("❌ Failed to read temp.json:", err.message);
  process.exit(1);
}

try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  console.log("📦 data.json loaded (entries:", data.images?.length || 0, ")");
} catch (err) {
  console.error("❌ Failed to read data.json:", err.message);
  process.exit(1);
}

if (!data.images || !Array.isArray(data.images)) data.images = [];

const newEntry = cleanEntry(temp);
const index = data.images.findIndex(item => item.id === newEntry.id);

if (index >= 0) {
  console.log(`✏️ Updating entry ID ${newEntry.id}`);
  data.images[index] = newEntry;
} else {
  console.log(`➕ Adding new entry ID ${newEntry.id}`);
  data.images.push(newEntry);
}

data.images.sort((a, b) => a.id - b.id);
data.active = newEntry.id;
data.updated = Date.now();
data.images = data.images.map(cleanEntry);

try {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
  console.log("✅ data.json updated cleanly and safely with entry ID:", newEntry.id);
} catch (err) {
  console.error("❌ Failed to write data.json:", err.message);
  process.exit(1);
}
