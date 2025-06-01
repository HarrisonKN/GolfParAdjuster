import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
    
        if (value.length > 1) {
            const { data, error } = await supabase
                .from('GolfCourses')
                .select('name')
                .ilike('name', `%${value}%`);
    
            if (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } else {
                setSuggestions(data.map(course => course.name));
            }
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
            {suggestions?.length > 0 && (
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