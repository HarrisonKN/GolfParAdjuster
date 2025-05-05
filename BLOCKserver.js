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
             WHERE GolfCourses.name ILIKE $1`,
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
    console.log(`Received query: ${query}`); // Log the received query
    try {
        const result = await pool.query(
            `SELECT name FROM GolfCourses WHERE name ILIKE $1`, // Use ILIKE for case-insensitive search
            [`%${query}%`]
        );
        console.log(`Query result: ${JSON.stringify(result.rows)}`); // Log the query result
        res.json({ suggestions: result.rows.map(row => row.name) });
    } catch (err) {
        console.error(`Error executing query: ${err.message}`); // Log the error
        console.error(`Stack trace: ${err.stack}`); // Log the stack trace
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/add-golf-course', async (req, res) => {
    const { courseName, holes } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO GolfCourses (name) VALUES ($1) RETURNING id`,
            [courseName]
        );
        const courseId = result.rows[0].id;
        const holeInserts = holes.map((hole, index) => {
            return pool.query(
                `INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES ($1, $2, $3, $4)`,
                [courseId, index + 1, hole.hcp, hole.par]
            );
        });
        await Promise.all(holeInserts);
        res.status(200).json({ message: 'Course added successfully' });
    } catch (err) {
        console.error(`Error adding course: ${err.message}`);
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