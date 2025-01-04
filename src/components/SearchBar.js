import React from 'react';
import { Grid, TextField, FormControl, Select, MenuItem } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm, category, setCategory, setPage }) => (
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        {/* Search Bar */}
        <Grid item xs={12} md={8}>
            <TextField
                label="Search Tools"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
            />
        </Grid>

        {/* Category Filter */}
        <Grid item xs={12} md={4}>
            <FormControl fullWidth>
                <Select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value); // Update category
                        setPage(1); // Reset to page 1
                    }}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value={1}>DNS Controls</MenuItem>
                    <MenuItem value={2}>SSL Controls</MenuItem>
                    <MenuItem value={3}>Misconfiguration</MenuItem>
                    <MenuItem value={4}>Network Vulnerabilities</MenuItem>
                    <MenuItem value={5}>Web Vulnerabilities</MenuItem>
                    <MenuItem value={6}>Information Scans</MenuItem>
                    <MenuItem value={7}>Product Based Web Vulnerabilities</MenuItem>
                    <MenuItem value={8}>Product Based Network Vulnerabilities</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    </Grid>
);

export default SearchBar;
