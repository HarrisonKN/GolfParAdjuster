const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001; // Ensure the port is set to 3001

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database/golf_courses.db');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/golf-course', (req, res) => {
    const courseName = req.query.name;
    db.all(
        `SELECT Holes.hole_number, Holes.hcp, Holes.par 
         FROM GolfCourses 
         JOIN Holes ON GolfCourses.id = Holes.course_id 
         WHERE GolfCourses.name LIKE ?`,
        [`%${courseName}%`],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ holes: rows });
        }
    );
});

// Endpoint to get golf course suggestions
app.get('/api/golf-course-suggestions', (req, res) => {
    const query = req.query.q;
    db.all(
        `SELECT name FROM GolfCourses WHERE name LIKE ?`,
        [`%${query}%`],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ suggestions: rows.map(row => row.name) });
        }
    );
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});