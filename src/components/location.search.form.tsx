import React, {useState} from 'react';
import {redirect} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PATHS from '../routes/paths';

export default function LocationSearchForm(props) {
    const [location, setLocation] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        //TODO: code to submit form with text field value
        redirect(PATHS.WEATHER);
    }

    return (
        <Box component="form" id='location-search-form' onSubmit={handleSubmit}>
            <Stack direction='row' spacing='1.5em'>
                <TextField id="location-input"
                           label="Search for a location"
                           variant="outlined"
                           size="small"
                           onInput={e => setLocation(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="outlined">
                    <span>Submit</span>
                </Button>
            </Stack>
        </Box>
    )
}
