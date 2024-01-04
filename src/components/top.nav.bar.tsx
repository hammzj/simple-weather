import React from 'react';
import {AppBar, Box, Stack} from '@mui/material';
import LocationSearchForm from "./location.search.form";

export default function TopNavBar(): React.ReactElement {
    return (
        <Box
            id='top-nav-bar'
            sx={{marginBottom: 1, border: 1}}>
            <AppBar position='static'
                    color='transparent'
                    sx={{boxShadow: 0}}>
                <Stack justifyContent='center'>
                    <LocationSearchForm/>
                </Stack>
            </AppBar>
        </Box>
    )
}
