-- Drop existing tables if they exist
DROP TABLE IF EXISTS Holes;
DROP TABLE IF EXISTS GolfCourses;

-- Create tables
CREATE TABLE GolfCourses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Holes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    hole_number INTEGER,
    hcp INTEGER,
    par INTEGER,
    FOREIGN KEY (course_id) REFERENCES GolfCourses(id)
);

-- Insert data into GolfCourses
INSERT INTO GolfCourses (name) VALUES ('Augusta National');
INSERT INTO GolfCourses (name) VALUES ('Pebble Beach');
INSERT INTO GolfCourses (name) VALUES ('Gisborne Golf Club');
INSERT INTO GolfCourses (name) VALUES ('St. Andrews');
INSERT INTO GolfCourses (name) VALUES ('Keilor Golf Club');

-- Data for Augusta National
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 1, 11, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 2, 9, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 3, 13, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 4, 15, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 5, 5, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 6, 7, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 7, 17, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 8, 3, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 9, 1, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 10, 10, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 11, 2, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 12, 16, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 13, 12, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 14, 8, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 15, 14, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 16, 6, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 17, 18, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (1, 18, 4, 4);

-- Data for Pebble Beach
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 1, 4, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 2, 12, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 3, 16, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 4, 10, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 5, 2, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 6, 18, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 7, 6, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 8, 8, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 9, 14, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 10, 1, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 11, 11, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 12, 3, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 13, 15, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 14, 7, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 15, 9, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 16, 5, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 17, 13, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (2, 18, 17, 5);

-- Data for Gisborne Golf Club
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 1, 16, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 2, 10, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 3, 8, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 4, 14, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 5, 2, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 6, 18, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 7, 6, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 8, 4, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 9, 12, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 10, 1, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 11, 5, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 12, 11, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 13, 17, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 14, 3, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 15, 9, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 16, 15, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 17, 7, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (3, 18, 13, 4);

-- Data for St. Andrews
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 1, 10, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 2, 14, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 3, 12, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 4, 4, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 5, 6, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 6, 16, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 7, 8, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 8, 18, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 9, 2, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 10, 9, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 11, 1, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 12, 17, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 13, 13, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 14, 7, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 15, 15, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 16, 11, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 17, 5, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (4, 18, 3, 4);

-- Data for Keilor Golf Club
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 1, 11, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 2, 18, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 3, 9, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 4, 5, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 5, 13, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 6, 15, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 7, 1, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 8, 3, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 9, 7, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 10, 2, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 11, 8, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 12, 4, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 13, 10, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 14, 12, 3);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 15, 14, 5);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 16, 16, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 17, 17, 4);
INSERT INTO Holes (course_id, hole_number, hcp, par) VALUES (5, 18, 6, 4);