import React from 'react';
import '../styles/Options.css';

const Options = ({ onPar99 }) => {
    return (
        <div className="options">
            <button onClick={onPar99}>Par 99</button>
            <p>Adds +1 to HCP Holes 10-18, and Adds +2 to HCP Holes 1-9</p>
        </div>
    );
};

export default Options;