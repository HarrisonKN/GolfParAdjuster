import React from 'react';
import '../styles/Options.css';

const Options = ({ onPar99 , onAll5, onAdvancedPar}) => {
    return (
        <div className="options">
            <button onClick={onPar99}>Beginner Par</button>
            <p>Adds +1 to HCP Holes 10-18, and Adds +2 to HCP Holes 1-9</p>

            <button onClick={onAll5}>All 5's</button>
            <p>Makes each par score 5</p>

            <button onClick={onAdvancedPar}>Advanced Par</button>
            <p>Reduces -1 from HCP Holes 10-18, and Reduces -2 from HCP Holes 1-9</p>
        </div>
    );
};

export default Options;