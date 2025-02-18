import React, { useState } from 'react';
import '../styles/ManualCourseForm.css';

const ManualCourseForm = ({ onSubmit }) => {
    const [courseName, setCourseName] = useState('');
    const [holes, setHoles] = useState(Array(18).fill({ hcp: '', par: '' }));

    const handleHoleChange = (index, field, value) => {
        const newHoles = [...holes];
        newHoles[index] = { ...newHoles[index], [field]: value };
        setHoles(newHoles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ courseName, holes });
    };

    return (
        <form className="manual-course-form" onSubmit={handleSubmit}>
            <div>
                <label>Course Name:</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />
            </div>
            {holes.map((hole, index) => (
                <div key={index} className="hole-input">
                    <label>Hole {index + 1}:</label>
                    <input
                        type="number"
                        placeholder="HCP"
                        value={hole.hcp}
                        onChange={(e) => handleHoleChange(index, 'hcp', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Par"
                        value={hole.par}
                        onChange={(e) => handleHoleChange(index, 'par', e.target.value)}
                        required
                    />
                </div>
            ))}
            <button type="submit">Add Course</button>
        </form>
    );
};

export default ManualCourseForm;