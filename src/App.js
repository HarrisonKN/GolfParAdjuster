import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ScorecardTable from './components/ScorecardTable';
import Options from './components/Options';
import ManualCourseForm from './components/ManualCourseForm';
import './styles/App.css';

const App = () => {
    const [holes, setHoles] = useState([]);
    const [par99Applied, setPar99Applied] = useState(false);
    const [manualEntry, setManualEntry] = useState(false);

    const handleSearch = (courseName) => {
        fetch(`https://golfparadjuster.onrender.com/api/golf-course?name=${courseName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.holes.length === 0) {
                    setManualEntry(true);
                } else {
                    setHoles(data.holes);
                    setPar99Applied(false); // Reset the Par 99 state on new search
                    setManualEntry(false);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handlePar99 = () => {
        setPar99Applied(true);
    };

    const handleManualCourseSubmit = (courseData) => {
        fetch('https://golfparadjuster.onrender.com/api/add-golf-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setManualEntry(false);
                handleSearch(courseData.courseName); // Fetch the newly added course
            })
            .catch(error => console.error('Error adding course:', error));
    };

    return (
        <div className="App">
            <Header />
            <SearchBar onSearch={handleSearch} />
            {manualEntry ? (
                <ManualCourseForm onSubmit={handleManualCourseSubmit} />
            ) : (
                <>
                    <ScorecardTable holes={holes} par99Applied={par99Applied} />
                    <Options onPar99={handlePar99} />
                </>
            )}
        </div>
    );
};

export default App;