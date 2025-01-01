const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'words.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Drop the old table if you want a clean slate (optional):
// db.run(`DROP TABLE IF EXISTS words;`);

db.run(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY,
    wordFirstLang TEXT,
    sentenceFirstLang TEXT,
    wordSecondLang TEXT,
    sentenceSecondLang TEXT
  )
`);

module.exports = db;