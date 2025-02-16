import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ScorecardTable from './components/ScorecardTable';
import Options from './components/Options';
import './styles/App.css';

const App = () => {
    const [holes, setHoles] = useState([]);
    const [par99Applied, setPar99Applied] = useState(false);

    const handleSearch = (courseName) => {
        fetch(`https://golfparadjuster.onrender.com/api/golf-course?name=${courseName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setHoles(data.holes);
                setPar99Applied(false); // Reset the Par 99 state on new search
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handlePar99 = () => {
        setPar99Applied(true);
    };

    return (
        <div className="App">
            <Header />
            <SearchBar onSearch={handleSearch} />
            <ScorecardTable holes={holes} par99Applied={par99Applied} />
            <Options onPar99={handlePar99} />
        </div>
    );
};

export default App;