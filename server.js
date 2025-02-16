const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001; // Use environment variable for port

app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use environment variable for database URL
    ssl: {
        rejectUnauthorized: false
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/golf-course', async (req, res) => {
    const courseName = req.query.name;
    try {
        const result = await pool.query(
            `SELECT Holes.hole_number, Holes.hcp, Holes.par 
             FROM GolfCourses 
             JOIN Holes ON GolfCourses.id = Holes.course_id 
             WHERE GolfCourses.name LIKE $1`,
            [`%${courseName}%`]
        );
        res.json({ holes: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get golf course suggestions
app.get('/api/golf-course-suggestions', async (req, res) => {
    const query = req.query.q;
    try {
        const result = await pool.query(
            `SELECT name FROM GolfCourses WHERE name LIKE $1`,
            [`%${query}%`]
        );
        res.json({ suggestions: result.rows.map(row => row.name) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});