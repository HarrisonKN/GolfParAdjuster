import React from 'react';
import '../styles/Options.css';

const Options = ({ onParAdjustment }) => {
    const parOptions = [
        {
            id: 'beginner',
            label: 'Beginner Par',
            description: 'Adds +1 to HCP Holes 10-18, and Adds +2 to HCP Holes 1-9'
        },
        {
            id: 'advanced',
            label: 'Advanced Par',
            description: 'Reduces -1 from HCP Holes 10-18, and Reduces -2 from HCP Holes 1-9'
        },
        {
            id: 'all5',
            label: 'All 5\'s',
            description: 'Makes each par score 5'
        }
    ];

    return (
        <div className="options">
            {parOptions.map(option => (
                <div key={option.id} className="option-item">
                    <button onClick={() => onParAdjustment(option.id)}>
                        {option.label}
                    </button>
                    <p>{option.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Options;