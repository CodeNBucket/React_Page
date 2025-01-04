import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './themes';
import MainLayout from './layouts/MainLayout';
import MainPage from './pages/MainPage';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme'); // Gets theme from localStorage
        return savedTheme === 'dark'; // If the savedTheme is dark it returns true
    });

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Save theme to localStorage
            return newMode;
        });
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {/* Ensures consistent theme styles */}
            <CssBaseline />
            <MainLayout>
                <MainPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            </MainLayout>
        </ThemeProvider>
    );
};

export default App;
