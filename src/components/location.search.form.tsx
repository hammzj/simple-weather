import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Stack, TextField} from '@mui/material';
import PATHS from '../routes/paths';

export default function LocationSearchForm(): React.ReactElement {
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
        <Box
            component="form"
            id='location-search-form'
            onSubmit={handleSubmit}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding='0.5em'
        >
            <Stack direction='row' spacing='1.5em'>
                <TextField id="location-input"
                           helperText="Search for a city/postal code"
                           variant="outlined"
                           size="small"
                           onChange={handleChange}
                />
                <Button
                    type="submit"
                    size='small'
                    sx={{

                        backgroundColor: 'white',
                        color: 'black',
                        border: 1,
                    }}>
                    <span>Submit</span>
                </Button>
            </Stack>
        </Box>
    )
}
