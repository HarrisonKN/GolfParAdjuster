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
        const { data, error } = await supabase
            .from('courses')
            .select('holes')
            .eq('courseName', courseName)
            .single();

        if (error) {
            console.error('Error fetching course:', error);
            setManualEntry(true);
            return;
        }

        if (!data || !data.holes || data.holes.length === 0) {
            setManualEntry(true);
        } else {
            setHoles(data.holes);
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
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper elevation={4} sx={{ borderRadius: 4, p: { xs: 2, sm: 4 }, background: '#fff' }}>
                    <Box sx={{ mb: 3 }}>
                        <Header />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <SearchBar onSearch={handleSearch} />
                    </Box>
                    <Box sx={{ mb: 3 }}>
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