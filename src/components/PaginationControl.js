import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationControl = ({ totalPages, page, setPage }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
        />
    </Box>
);

export default PaginationControl;
