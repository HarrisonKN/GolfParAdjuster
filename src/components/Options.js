import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

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
        label: "All 5's",
        description: 'Makes each par score 5'
    }
];

const Options = ({ onParAdjustment }) => (
    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" mt={2}>
        {parOptions.map(option => (
            <Paper key={option.id} elevation={3} sx={{ p: 2, minWidth: 220, textAlign: 'center', borderRadius: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SportsGolfIcon />}
                    onClick={() => onParAdjustment(option.id)}
                    sx={{ mb: 1, borderRadius: 2, fontWeight: 'bold', width: '100%' }}
                >
                    {option.label}
                </Button>
                <Typography variant="body2" color="text.secondary">
                    {option.description}
                </Typography>
            </Paper>
        ))}
    </Box>
);

export default Options;