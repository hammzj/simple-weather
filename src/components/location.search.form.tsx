import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PATHS from '../routes/paths';


export default function LocationSearchForm() {
    const navigate = useNavigate();
    const [locationName, setLocationName] = useState('');

    async function handleSubmit(event: React.ChangeEvent<HTMLDivElement>) {
        event.preventDefault();
        const params = new URLSearchParams({name: locationName}).toString();
        navigate({pathname: PATHS.RESULTS, search: params})
    }

    function handleChange(event) {
        setLocationName(event.target.value);
    }

    //@ts-ignore: TS2339
    return (
        <Box component="form" id='location-search-form' onSubmit={handleSubmit}>
            <Stack direction='row' spacing='1.5em'>
                <TextField id="location-input"
                           label="Search for a location"
                           variant="outlined"
                           size="small"
                           onChange={handleChange}
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
