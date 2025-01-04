import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Chip, TableContainer, Paper } from '@mui/material';

const ToolsTableContent = ({ tools }) => (
    <TableContainer
        component={Paper}
        sx={{
            overflowX: 'auto', // Enables horizontal scrolling
            width: '100%', // Ensures it takes up the full width
        }}
    >
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Severity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* I've analyzed tool.scores and conclude this pattern defines the severities */}
                {tools.map((tool) => {
                    let severity = '';
                    let color = '';

                    if (tool.score > 9) {
                        severity = 'Critical';
                        color = 'secondary';
                    } else if (tool.score >= 7) {
                        severity = 'High';
                        color = 'error';
                    } else if (tool.score >= 4) {
                        severity = 'Medium';
                        color = 'warning';
                    } else if (tool.score > 1) {
                        severity = 'Low';
                        color = 'info';
                    } else {
                        severity = 'Informational';
                        color = 'primary';
                    }

                    return (
                        <TableRow key={tool.slug}>
                            <TableCell>{tool.name}</TableCell>
                            <TableCell>{tool.mini_desc}</TableCell>
                            <TableCell>
                                <Chip
                                    label={severity}
                                    color={color}
                                    sx={{
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>
);

export default ToolsTableContent;
