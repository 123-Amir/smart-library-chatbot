const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

// 🔁 Read JSON from file
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[File Read Error]', err.message);
    return { books: [], faqs: [], tutorials: [] };
  }
}

// 💾 Write JSON to file
async function writeData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('[File Write Error]', err.message);
    throw err;
  }
}

// 🔍 Find by ID
function findById(list, id) {
  return list.find(item => item.id === id);
}

// 🆔 Generate Unique ID (Simple UUID fallback)
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = {
  readData,
  writeData,
  findById,
  generateId
};
