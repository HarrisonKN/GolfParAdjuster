import React, { useState } from 'react';
import { Container, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ScorecardTable from './components/ScorecardTable';
import Options from './components/Options';
import ManualCourseForm from './components/ManualCourseForm';

import all5Button from './components/all5Button';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#43a047' },
        background: { default: '#f5f7fa' },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
    },
});

const App = () => {
    const [holes, setHoles] = useState([]);
    const [adjustmentType, setAdjustmentType] = useState(null);
    const [manualEntry, setManualEntry] = useState(false);

    const handleSearch = (courseName) => {
        fetch(`https://golfparadjuster-testing.onrender.com/api/golf-course?name=${courseName}`)
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
                    setAdjParApplied(false); // Reset the Par 99 state on new search
                    setManualEntry(false);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleManualCourseSubmit = (courseData) => {
        console.log('Submitting course data:', courseData); // Log the course data being submitted
        fetch('https://golfparadjuster-testing.onrender.com/api/add-golf-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        })
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Change to response.json() to parse the response as JSON
            })
            .then(data => {
                console.log('Response data:', data); // Log the response data
                setManualEntry(false); // Set manualEntry to false to go back to the scorecard table page
                handleSearch(courseData.courseName); // Fetch the newly added course
            })
            .catch(error => console.error('Error adding course:', error));
        };

    const handleParAdjustment = (type) => {
        setAdjustmentType(adjustmentType === type ? null : type);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={4} sx={{ borderRadius: 4, p: { xs: 2, sm: 4 }, background: '#fff' }}>
                    <Box sx={{ mb: 3 }}>
                        <Header />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <SearchBar onSearch={handleSearch} />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <ScorecardTable holes={holes} adjustmentType={adjustmentType} />
                    </Box>
                    <Options onParAdjustment={handleParAdjustment} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default App;