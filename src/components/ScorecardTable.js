import React from 'react';
import '../styles/ScorecardTable.css';

const ScorecardTable = ({ holes = [], par99Applied }) => {
    const rowTitles = ["Hole", "HCP", "Par", "Adj Par"];

    // Generate an array of hole numbers from 1 to 18
    const holeNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

    // Calculate the sum of holes 1-9 and 10-18
    const sumHoles1to9 = holes.slice(0, 9).reduce((sum, hole) => sum + hole.par, 0);
    const sumHoles10to18 = holes.slice(9, 18).reduce((sum, hole) => sum + hole.par, 0);
    const totalPar = sumHoles1to9 + sumHoles10to18;

    // Calculate the adjusted par values
    const adjustedParValues = holes.map(hole => {
        return par99Applied
            ? (hole.hcp >= 10 ? hole.par + 1 : hole.par + 2)
            : '';
    });

    const sumAdjustedHoles1to9 = adjustedParValues.slice(0, 9).reduce((sum, adjPar) => sum + (adjPar || 0), 0);
    const sumAdjustedHoles10to18 = adjustedParValues.slice(9, 18).reduce((sum, adjPar) => sum + (adjPar || 0), 0);
    const totalAdjustedPar = sumAdjustedHoles1to9 + sumAdjustedHoles10to18;

    return (
        <table>
            <thead>
                <tr>
                    <th>{rowTitles[0]}</th>
                    {holeNumbers.map((holeNumber, index) => (
                        <React.Fragment key={holeNumber}>
                            <th>{holeNumber}</th>
                            {index === 8 && <th>Out</th>}
                        </React.Fragment>
                    ))}
                    <th>In</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{rowTitles[1]}</td>
                    {holeNumbers.map((holeNumber, index) => (
                        <React.Fragment key={`hcp-${holeNumber}`}>
                            <td>{holes[index] ? holes[index].hcp : ''}</td>
                            {index === 8 && <td>{''}</td>}
                        </React.Fragment>
                    ))}
                    <td>{''}</td>
                    <td>{''}</td>
                </tr>
                <tr>
                    <td>{rowTitles[2]}</td>
                    {holeNumbers.map((holeNumber, index) => (
                        <React.Fragment key={`par-${holeNumber}`}>
                            <td>{holes[index] ? holes[index].par : ''}</td>
                            {index === 8 && <td>{holes.length > 0 ? sumHoles1to9 : ''}</td>}
                        </React.Fragment>
                    ))}
                    <td>{holes.length > 9 ? sumHoles10to18 : ''}</td>
                    <td>{holes.length > 0 ? totalPar : ''}</td>
                </tr>
                <tr>
                    <td>{rowTitles[3]}</td>
                    {holeNumbers.map((holeNumber, index) => {
                        const adjPar = holes[index] && par99Applied
                            ? (holes[index].hcp >= 10 ? holes[index].par + 1 : holes[index].par + 2)
                            : '';
                        return (
                            <React.Fragment key={`adjpar-${holeNumber}`}>
                                <td>{adjPar}</td>
                                {index === 8 && <td>{par99Applied && holes.length > 0 ? sumAdjustedHoles1to9 : ''}</td>}
                            </React.Fragment>
                        );
                    })}
                    <td>{par99Applied && holes.length > 9 ? sumAdjustedHoles10to18 : ''}</td>
                    <td>{par99Applied && holes.length > 0 ? totalAdjustedPar : ''}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default ScorecardTable;