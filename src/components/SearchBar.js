import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            fetch(`https://golfparadjuster.onrender.com/api/golf-course-suggestions?q=${value}`)
                .then(response => response.json())
                .then(data => setSuggestions(data.suggestions))
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        onSearch(suggestion);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for a golf course..."
                />
                <button type="submit">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSelect(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;