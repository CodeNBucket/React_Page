import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBar from '../components/SearchBar';
import ToolsTableContent from '../components/ToolsTableContent';
import PaginationControl from '../components/PaginationControl';
import ErrorDisplay from '../components/ErrorDisplay';
import { fetchTools } from '../api';

const MainPage = ({ toggleTheme, isDarkMode }) => {
    // Here are the necessary useStates
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(() => parseInt(localStorage.getItem('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(() => localStorage.getItem('category') || '');
    const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Used Debounce to wait before fetching the data again
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // Persist filters and search term to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('page', page);
    }, [page]);

    useEffect(() => {
        localStorage.setItem('category', category);
    }, [category]);

    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm);
    }, [searchTerm]);

    // Fetches tools by calling loadTools function which takes the current page, per_page which is maximum pages,
    // Category_id and query which is for searching
    useEffect(() => {
        const loadTools = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchTools({
                    page,
                    per_page: 10,
                    scan_category_id: category || null,
                    query: debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : '', // Starts to filter the search when at least 3 character is typed
                });
                setTools(data?.data || []);
                setTotalPages(Math.ceil((data?.total_count || 0) / 10));
            } catch (err) {
                setError(err.message || 'An error occurred while fetching tools.');
            } finally {
                setLoading(false);
            }
        };

        loadTools();
    }, [page, category, debouncedSearchTerm]); // Calls UseEffect if one of these change

    // Clears the filters
    const clearFilters = () => {
        setSearchTerm('');
        setCategory('');
        setPage(1);
        localStorage.removeItem('searchTerm');
        localStorage.removeItem('category');
        localStorage.removeItem('page');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >


            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                }}
            >
                {/* Header with Theme Toggle */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="h4">Tools List</Typography>
                    <IconButton onClick={toggleTheme} color="inherit">   {/* For changing the light/night mode */}
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>

                {/* Search Bar */}
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    category={category}
                    setCategory={setCategory}
                    setPage={setPage}
                />

                {/* Clear Filters Button */}
                <Box sx={{ textAlign: 'right', marginBottom: 2 }}>
                    <Button
                        variant="contained"
                        onClick={clearFilters}
                        sx={{
                            backgroundColor: '#da5252',
                            '&:hover': {
                                backgroundColor: '#9c0000',
                            },
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>

                {/* Error Message */}
                <ErrorDisplay error={error} />

                {/* Tools Table or Loader */}
                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '50vh' }}
                    >
                        <CircularProgress />
                    </Box>
                ) : tools.length > 0 ? (
                    <>
                        <ToolsTableContent tools={tools} />
                        <PaginationControl
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                        />
                    </>
                ) : (
                    <Typography
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        sx={{ marginTop: 2 }}
                    >
                        No data found.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default MainPage;
