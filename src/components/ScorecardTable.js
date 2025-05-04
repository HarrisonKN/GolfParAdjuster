import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

const getAdjustedPar = (hole, adjustmentType) => {
    if (!hole) return '';
    switch (adjustmentType) {
        case 'beginner':
            return hole.hcp >= 10 ? hole.par + 1 : hole.par + 2;
        case 'advanced':
            return hole.hcp >= 10 ? hole.par - 1 : hole.par - 2;
        case 'all5':
            return 5;
        default:
            return '';
    }
};

const ScorecardTable = ({ holes = [], adjustmentType }) => {
    const rowTitles = ["Hole", "HCP", "Par", "Adj Par"];
    const holeNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

    const sumHoles1to9 = holes.slice(0, 9).reduce((sum, hole) => sum + (hole?.par || 0), 0);
    const sumHoles10to18 = holes.slice(9, 18).reduce((sum, hole) => sum + (hole?.par || 0), 0);
    const totalPar = sumHoles1to9 + sumHoles10to18;

    const adjustedParValues = holes.map(hole => getAdjustedPar(hole, adjustmentType));
    const sumAdjustedHoles1to9 = adjustedParValues.slice(0, 9).reduce((sum, adjPar) => sum + (adjPar || 0), 0);
    const sumAdjustedHoles10to18 = adjustedParValues.slice(9, 18).reduce((sum, adjPar) => sum + (adjPar || 0), 0);
    const totalAdjustedPar = sumAdjustedHoles1to9 + sumAdjustedHoles10to18;

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', color: 'primary.main' }}>
                Scorecard
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>{rowTitles[0]}</TableCell>
                        {holeNumbers.map((holeNumber, index) => (
                            <React.Fragment key={holeNumber}>
                                <TableCell align="center">{holeNumber}</TableCell>
                                {index === 8 && <TableCell align="center">Out</TableCell>}
                            </React.Fragment>
                        ))}
                        <TableCell align="center">In</TableCell>
                        <TableCell align="center">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{rowTitles[1]}</TableCell>
                        {holeNumbers.map((holeNumber, index) => (
                            <React.Fragment key={`hcp-${holeNumber}`}>
                                <TableCell align="center">{holes[index]?.hcp ?? ''}</TableCell>
                                {index === 8 && <TableCell align="center"></TableCell>}
                            </React.Fragment>
                        ))}
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{rowTitles[2]}</TableCell>
                        {holeNumbers.map((holeNumber, index) => (
                            <React.Fragment key={`par-${holeNumber}`}>
                                <TableCell align="center">{holes[index]?.par ?? ''}</TableCell>
                                {index === 8 && <TableCell align="center">{holes.length > 0 ? sumHoles1to9 : ''}</TableCell>}
                            </React.Fragment>
                        ))}
                        <TableCell align="center">{holes.length > 9 ? sumHoles10to18 : ''}</TableCell>
                        <TableCell align="center">{holes.length > 0 ? totalPar : ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{rowTitles[3]}</TableCell>
                        {holeNumbers.map((holeNumber, index) => {
                            const adjPar = adjustedParValues[index] !== '' ? adjustedParValues[index] : '';
                            return (
                                <React.Fragment key={`adjpar-${holeNumber}`}>
                                    <TableCell align="center">{adjPar}</TableCell>
                                    {index === 8 && <TableCell align="center">{adjustmentType && holes.length > 0 ? sumAdjustedHoles1to9 : ''}</TableCell>}
                                </React.Fragment>
                            );
                        })}
                        <TableCell align="center">{adjustmentType && holes.length > 9 ? sumAdjustedHoles10to18 : ''}</TableCell>
                        <TableCell align="center">{adjustmentType && holes.length > 0 ? totalAdjustedPar : ''}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ScorecardTable;