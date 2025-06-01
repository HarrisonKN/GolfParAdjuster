import React from 'react';
import '../styles/Options.css';

const all5Button = ({ onAll5}) => {
    return (
        <div className="options">
            <button onClick={onAll5}>All 5's</button>
            <p>Makes each par score 5</p>
        </div>
    );
};

export default all5Button;