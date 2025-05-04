import React from 'react';
import { Typography, Box } from '@mui/material';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

const Header = () => (
    <Box display="flex" alignItems="center" gap={2}>
        <GolfCourseIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight="bold" color="primary">
            Golf Par Adjuster
        </Typography>
    </Box>
);

export default Header;