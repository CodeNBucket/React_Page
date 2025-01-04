import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    // Defining small screen
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
                flexDirection: isSmallScreen ? 'column' : 'row',
                overflowX: 'hidden',
            }}
        >
            {/* Sidebar */}
            {!isSmallScreen && (
                <Box
                    sx={{
                        width: '250px',
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Sidebar />
                </Box>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flex: 1,
                    padding: 2,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    overflowX: 'auto',
                    width: '100%',
                    minWidth: 0,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
