import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import logo from '../assets/logo.jpg'; // Adjust the path as per your file structure

const Sidebar = () => (
    <Box
        sx={{
            width: '100%', // Take full width if visible
            height: '100vh',
            backgroundColor: 'background.paper',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
        }}
    >
        <img
            src={logo}
            alt="Logo"
            style={{
                width: '100px',
                marginBottom: '20px',
                borderRadius: '8px',
            }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Sidebar
        </Typography>
        <List sx={{ width: '100%' }}>
            <ListItem button>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Tools" />
            </ListItem>
        </List>
    </Box>
);

export default Sidebar;
