import { createTheme } from '@mui/material/styles';

// Light Theme Colors
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },

        background: {
            default: '#f9f9f9',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
    },
});

// Dark Theme Colors
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
        },
    },
});
