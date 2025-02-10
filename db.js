import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status INTEGER NOT NULL DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error('Error creating table ' + err.message);
            } else {
                console.log('Table created or already exists.');
            }
        });
    }
});

export default db;
