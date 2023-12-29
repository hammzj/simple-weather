import React from 'react';
import {AppBar, Box, Stack} from '@mui/material';
import LocationSearchForm from "./location.search.form";

export default function TopNavBar(): React.ReactElement {
    return (
        <Box
            id='top-nav-bar'
            marginBottom='1em'
        >
            <AppBar position='static'>
                <Stack justifyContent='center'>
                    <LocationSearchForm/>
                </Stack>
            </AppBar>
        </Box>
    )
}
