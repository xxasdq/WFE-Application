const sqlite3 = require('sqlite3');
const path = './db.db';

const db = new sqlite3.Database(path, (err) => {
  err
    ? console.log('Error:', err.message)
    : console.log('Established connection.');
});

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vid INTEGER NOT NULL,
            password TEXT NOT NULL
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position TEXT NOT NULL,
            vid INTEGER,
            date DATE,
            start TIME,
            end TIME,
            FOREIGN KEY (vid) REFERENCES users(vid)
        )
    `);
});

// The following lines of code only insert test values.
const USERS = [
  [123456, 'pass1'],
  [987654, 'pass2'],
];

const SCHEDULE = [
  ['LEPA_S_TWR', 987654, '2024-03-19', '15:30', '16:30'],
  ['LEIB_TWR', 123456, '2024-03-22', '15:30', '16:30'],
];

const user_table = db.prepare('INSERT INTO users (vid, password) VALUES (?,?)');

USERS.forEach((value) => {
  user_table.run(value, (err) => {
    err ? console.log('Error:', err.message) : console.log('Inserted value.');
  });
});

const schedule_table = db.prepare(
  'INSERT INTO schedule (position, vid, date, start, end) VALUES (?,?,?,?,?)'
);

SCHEDULE.forEach((value) => {
  schedule_table.run(value, (err) => {
    err ? console.log('Error:', err.message) : console.log('Inserted value.');
  });
});

module.exports = db;
