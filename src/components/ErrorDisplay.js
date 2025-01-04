import React from 'react';
import { Typography } from '@mui/material';

const ErrorDisplay = ({ error }) => (
    error ? (
        <Typography
            color="error"
            variant="h6"
            align="center"
            sx={{ marginBottom: 2 }}
        >
            {error}
        </Typography>
    ) : null
);

export default ErrorDisplay;
