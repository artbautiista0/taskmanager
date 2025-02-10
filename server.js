import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';

if (!db) {
    console.error('Failed to import db module');
    process.exit(1);
}

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get('/getTasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add task
app.post('/addTask', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    db.run(`INSERT INTO tasks (name) VALUES (?)`, [name], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task added successfully' });
    });
});

// Delete task
app.delete('/deleteTask/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

// Update task
app.put('/editTask/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    db.run(`UPDATE tasks SET name = ? WHERE id = ?`, [name, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Update task status
app.put('/updateStatus/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (status === undefined) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    db.run(`UPDATE tasks SET status = ? WHERE id = ?`, [status, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
