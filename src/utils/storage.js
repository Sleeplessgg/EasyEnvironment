const path = require('path');
const fs = require('fs');

const FILE = path.join(__dirname, '../data/saved_schedules.json');

function loadData() {
  if (!fs.existsSync(FILE)) return { guilds: {} };
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { loadData, saveData };