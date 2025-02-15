CREATE TABLE GolfCourses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE Holes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    hole_number INTEGER,
    hcp INTEGER,
    par INTEGER,
    FOREIGN KEY (course_id) REFERENCES GolfCourses(id)
);