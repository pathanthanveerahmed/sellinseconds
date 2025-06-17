const fs = require("fs");

const tempPath = "dynamic/temp.json";
const dataPath = "dynamic/data.json";

function cleanUTF(str) {
  return new TextDecoder("utf-8").decode(new TextEncoder().encode(str || '')).normalize("NFC");
}

function cleanEntry(entry) {
  return {
    id: entry.id,
    name: cleanUTF(entry.name),
    description: cleanUTF(entry.description),
    filename: entry.filename
  };
}

const temp = JSON.parse(fs.readFileSync(tempPath, "utf8"));
console.log("➡️ Temp Entry:", temp);

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
console.log("📦 Current Entries:", data.images.length);

const newEntry = cleanEntry(temp);
const index = data.images.findIndex(p => p.id === newEntry.id);

if (index >= 0) {
  console.log(`✏️ Updating existing entry ID ${newEntry.id}`);
  data.images[index] = newEntry;
} else {
  console.log(`➕ Adding new entry ID ${newEntry.id}`);
  data.images.push(newEntry);
}

data.active = newEntry.id;
data.updated = Date.now();
data.images = data.images.map(cleanEntry);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
console.log("✅ Merged successfully into data.json");