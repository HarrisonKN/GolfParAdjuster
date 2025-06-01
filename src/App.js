import React, { useState } from 'react';
import { Container, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ScorecardTable from './components/ScorecardTable';
import Options from './components/Options';
import ManualCourseForm from './components/ManualCourseForm';
import all5Button from './components/all5Button';

import { supabase } from './supabaseClient';

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

    const handleSearch = async (courseName) => {
        // Get the course by name
        const { data: courseData, error: courseError } = await supabase
            .from('GolfCourses')
            .select('id')
            .eq('name', courseName)
            .single();
    
        if (courseError || !courseData) {
            console.error('Error fetching course:', courseError);
            setManualEntry(true);
            return;
        }
    
        // Get holes for the course
        const { data: holesData, error: holesError } = await supabase
            .from('Holes')
            .select('hole_number, hcp, par')
            .eq('course_id', courseData.id)
            .order('hole_number', { ascending: true });
    
        if (holesError || !holesData || holesData.length === 0) {
            setManualEntry(true);
        } else {
            setHoles(holesData);
            setManualEntry(false);
        }
    };

    const handleManualCourseSubmit = async (courseData) => {
        const { data, error } = await supabase
            .from('courses')
            .insert([courseData]);

        if (error) {
            console.error('Error adding course:', error);
            return;
        }

        setManualEntry(false);
        handleSearch(courseData.courseName);
    };

    const handleParAdjustment = (type) => {
        setAdjustmentType(adjustmentType === type ? null : type);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container
                maxWidth={false}
                disableGutters
                sx={{
                    width: '90vw',
                    px: 0,
                    py: 0,
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'stretch',
                    background: theme.palette.background.default,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 0,
                        width: '100vw',
                        p: { xs: 2, sm: 4 },
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <Header />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <SearchBar onSearch={handleSearch} />
                    </Box>
                    <Box sx={{ mb: 3, flex: 1 }}>
                        {manualEntry ? (
                            <ManualCourseForm onSubmit={handleManualCourseSubmit} />
                        ) : (
                            <ScorecardTable holes={holes} adjustmentType={adjustmentType} />
                        )}
                    </Box>
                    <Options onParAdjustment={handleParAdjustment} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default App;